create table public.piece_reservations (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references public.inventory_pieces(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  piece_name text not null,
  status text not null default 'held' check (status in ('held', 'cancelled', 'expired')),
  created_at timestamptz not null,
  expires_at timestamptz not null,
  check (expires_at > created_at)
);

create unique index reservations_one_hold_per_piece
  on public.piece_reservations (piece_id) where status = 'held';
create index reservations_user_date on public.piece_reservations (user_id, created_at desc);

alter table public.piece_reservations enable row level security;
revoke all on public.piece_reservations from public, anon, authenticated;
grant select on public.piece_reservations to authenticated;
create policy reservations_owner_read on public.piece_reservations
  for select to authenticated using ((select auth.uid()) = user_id);

create function public.list_reservable_pieces()
returns table (id uuid, slug text, name text)
language sql stable security definer set search_path = ''
as $$
  select p.id, p.slug, p.name
  from public.inventory_pieces p
  where p.status = 'available' and not exists (
    select 1 from public.piece_reservations r
    where r.piece_id = p.id and r.status = 'held' and r.expires_at > now()
  )
  order by p.name, p.id
  limit 100;
$$;

create function public.reserve_piece(p_piece_id uuid)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  owner_id uuid := auth.uid();
  piece public.inventory_pieces%rowtype;
  reservation public.piece_reservations%rowtype;
  moment timestamptz;
begin
  if owner_id is null then raise exception using errcode = '42501', message = 'authentication_required'; end if;
  -- Serialize attempts by the same user for the account limit.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(owner_id::text, 0));

  select * into piece from public.inventory_pieces where id = p_piece_id for update;
  if not found or piece.status <> 'available' then
    raise exception using errcode = 'P0001', message = 'piece_unavailable';
  end if;

  moment := clock_timestamp();
  -- Serialize reservation and cancellation for this piece.
  select * into reservation from public.piece_reservations
    where piece_id = p_piece_id and status = 'held' for update;
  if found then
    if reservation.expires_at > moment then
      if reservation.user_id = owner_id then return reservation.id; end if;
      raise exception using errcode = 'P0001', message = 'piece_unavailable';
    end if;
    update public.piece_reservations set status = 'expired' where id = reservation.id;
  end if;

  if (select count(*) from public.piece_reservations
      where user_id = owner_id and status = 'held' and expires_at > moment) >= 3 then
    raise exception using errcode = 'P0001', message = 'reservation_limit';
  end if;

  insert into public.piece_reservations (piece_id, user_id, piece_name, created_at, expires_at)
    values (piece.id, owner_id, piece.name, moment, moment + interval '15 minutes')
    returning id into reservation.id;
  return reservation.id;
end;
$$;

create function public.cancel_piece_reservation(p_reservation_id uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null then raise exception using errcode = '42501', message = 'authentication_required'; end if;
  update public.piece_reservations
    set status = 'cancelled'
    where id = p_reservation_id and user_id = auth.uid()
      and status = 'held' and expires_at > clock_timestamp();
  return found;
end;
$$;

revoke all on function public.list_reservable_pieces() from public, anon, authenticated;
revoke all on function public.reserve_piece(uuid) from public, anon, authenticated;
revoke all on function public.cancel_piece_reservation(uuid) from public, anon, authenticated;
grant execute on function public.list_reservable_pieces() to anon, authenticated;
grant execute on function public.reserve_piece(uuid) to authenticated;
grant execute on function public.cancel_piece_reservation(uuid) to authenticated;

