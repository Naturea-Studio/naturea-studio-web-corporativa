<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { supabase } from '../services/supabase'
import { accountReady, session } from '../services/account'

type Piece = { id: string; slug: string; name: string }
type Reservation = { id: string; piece_name: string; status: string; expires_at: string }
const pieces = ref<Piece[]>([])
const reservations = ref<Reservation[]>([])
const loading = ref(false)
const busy = ref(false)
const feedback = ref('')
const failed = ref(false)
const formatDate = new Intl.DateTimeFormat('es-ES', { dateStyle: 'short', timeStyle: 'short' })
let request = 0
let active = true

const clock = ref(Date.now())
const timer = window.setInterval(() => {
  clock.value = Date.now()
}, 1000)
onUnmounted(() => {
  active = false
  window.clearInterval(timer)
})

async function refresh() {
  if (!supabase) return
  const current = ++request
  const owner = session.value?.user.id
  loading.value = true
  try {
    const [inventory, history] = await Promise.all([
      supabase.rpc('list_reservable_pieces'),
      owner
        ? supabase
            .from('piece_reservations')
            .select('id,piece_name,status,expires_at')
            .eq('user_id', owner)
            .order('created_at', { ascending: false })
            .limit(50)
        : Promise.resolve({ data: [], error: null }),
    ])
    if (!active || current !== request) return
    if (inventory.error || history.error) throw new Error('No se pudieron cargar las reservas.')
    pieces.value = inventory.data ?? []
    reservations.value = history.data ?? []
  } catch {
    if (active && current === request) {
      failed.value = true
      feedback.value = 'No se pudieron cargar las reservas. Intenta actualizar la lista.'
    }
  } finally {
    if (active && current === request) loading.value = false
  }
}

watch(
  [accountReady, () => session.value?.user.id],
  ([ready]) => {
    reservations.value = []
    feedback.value = ''
    failed.value = false
    if (ready) void refresh()
  },
  { immediate: true },
)

async function mutate(id: string, cancel = false) {
  if (!supabase || busy.value || !session.value) return
  busy.value = true
  failed.value = false
  try {
    const { data, error } = cancel
      ? await supabase.rpc('cancel_piece_reservation', { p_reservation_id: id })
      : await supabase.rpc('reserve_piece', { p_piece_id: id })
    if (error) throw error
    feedback.value = cancel
      ? data
        ? 'Reserva cancelada.'
        : 'La reserva ya no está activa.'
      : 'Pieza reservada temporalmente durante 15 minutos desde la primera solicitud.'
  } catch (error) {
    failed.value = true
    const code = (error as { message?: string } | null)?.message
    feedback.value =
      code === 'piece_unavailable'
        ? 'La pieza ya no está disponible.'
        : code === 'reservation_limit'
          ? 'Ya tienes tres reservas activas. Cancela una antes de reservar otra pieza.'
          : 'No se pudo completar la operación. Vuelve a intentarlo.'
  } finally {
    await refresh()
    busy.value = false
  }
}

function isHeld(item: Reservation) {
  return item.status === 'held' && Date.parse(item.expires_at) > clock.value
}
</script>

<template>
  <div class="wrap inner-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Piezas únicas</p>
        <h1>Reservas</h1>
      </div>
      <p>Retén una pieza física durante 15 minutos. La reserva no genera un pedido ni un cargo.</p>
    </header>
    <section v-if="!supabase" class="catalog-empty">
      <h2>Reservas pendientes de conexión</h2>
      <p>La galería conceptual sigue disponible.</p>
      <RouterLink class="text-link" to="/piezas-unicas">Volver a piezas únicas</RouterLink>
    </section>
    <template v-else>
      <div class="hero-links">
        <RouterLink v-if="accountReady && !session" class="button" to="/cuenta"
          >Acceder a mi cuenta</RouterLink
        >
        <button
          type="button"
          class="text-link"
          :disabled="loading || busy || !accountReady"
          @click="refresh"
        >
          Actualizar lista
        </button>
      </div>
      <p v-if="feedback" :role="failed ? 'alert' : 'status'">{{ feedback }}</p>
      <div class="feature-columns" :aria-busy="loading || !accountReady">
        <section class="feature-panel">
          <h2>Piezas disponibles</h2>
          <p v-if="!pieces.length && !loading && accountReady && !failed">
            Ahora mismo no hay piezas físicas disponibles para reservar.
          </p>
          <article v-for="item in pieces" :key="item.id" class="demo-line">
            <strong>{{ item.name }}</strong><button
              v-if="session"
              type="button"
              class="text-link"
              :disabled="busy || loading"
              @click="mutate(item.id)"
            >
              Reservar
            </button>
          </article>
        </section>
        <section v-if="session" class="feature-panel">
          <h2>Mis reservas</h2>
          <p v-if="!reservations.length && !loading && !failed">Aún no tienes reservas.</p>
          <article v-for="item in reservations" :key="item.id" class="demo-line">
            <strong>{{ item.piece_name }}</strong><span>{{
              isHeld(item)
                ? 'Hasta ' + formatDate.format(new Date(item.expires_at))
                : item.status === 'cancelled'
                  ? 'Cancelada'
                  : 'Caducada'
            }}</span>
            <button
              v-if="isHeld(item)"
              type="button"
              class="text-link"
              :disabled="busy || loading"
              @click="mutate(item.id, true)"
            >
              Cancelar reserva
            </button>
          </article>
        </section>
      </div>
    </template>
  </div>
</template>
