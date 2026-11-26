-- Real inventory is maintained separately from the editorial concept catalogue.
create table public.inventory_pieces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  status text not null default 'draft' check (status in ('draft', 'available', 'sold', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.inventory_pieces enable row level security;
revoke all on public.inventory_pieces from public, anon, authenticated;
grant select (id, slug, name) on public.inventory_pieces to anon, authenticated;

create policy inventory_public_available on public.inventory_pieces
  for select to anon, authenticated using (status = 'available');

