<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { priceLabel } from '../data'
import { useCommerce, type TestOrder } from './commerce'
import { downloadText } from './storage'
const route = useRoute()
const shop = useCommerce()
const mode = computed(() => route.path)
const delivery = ref<TestOrder['delivery']>('recogida')
const result = ref<string>()
const shipping = computed(() => (delivery.value === 'recogida' ? 0 : 1290))
const money = (value: number) => priceLabel(value, 'EUR')
function complete() {
  if (!result.value) result.value = shop.place(delivery.value)
}
function documentFor(order: TestOrder) {
  const body = [
    'Naturea Studio · Justificante de simulación',
    'Sin validez fiscal',
    order.id,
    ...order.lines.map(
      (line) => line.quantity + ' × ' + line.name + ' — ' + money(line.unit * line.quantity),
    ),
    'Envío simulado ' + money(order.shipping),
    'Total simulado ' + money(order.total),
  ]
  downloadText('naturea-prueba-' + order.id.slice(0, 8) + '.txt', body.join('\n'))
}
</script>
<template>
  <div class="wrap inner-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Entorno de prueba</p>
        <h1>{{ route.meta.title }}</h1>
      </div>
      <p>
        Prueba el recorrido del pedido con conceptos. El ejercicio queda en tu navegador y no genera
        un cargo ni un envío.
      </p>
    </header>
    <nav class="catalog-tabs" aria-label="Recorrido de prueba">
      <RouterLink to="/carrito">Carrito</RouterLink
      ><RouterLink to="/checkout">Simulación de pedido</RouterLink
      ><RouterLink to="/cuenta/pedidos">Historial local</RouterLink>
    </nav>
    <template v-if="mode === '/carrito'">
      <div v-if="shop.lines.length" class="feature-panel">
        <h2>Tu selección de prueba</h2>
        <div v-for="line in shop.lines" :key="line.id" class="demo-line">
          <RouterLink :to="'/productos/' + line.id">{{ line.name }}</RouterLink><span>{{
            money(line.unit * line.quantity)
          }}</span
          ><label
            >Cantidad de {{ line.name
            }}<input
              type="number"
              min="1"
              max="9"
              :value="line.quantity"
              @change="
                shop.set(line.id, Number(($event.target as HTMLInputElement).value))
              " /></label
          ><button class="text-link" type="button" @click="shop.set(line.id, 0)">Quitar</button>
        </div>
        <p>
          <strong>Subtotal orientativo {{ money(shop.subtotal) }}</strong>
        </p>
        <RouterLink class="button" to="/checkout">Simular pedido</RouterLink>
      </div>
      <div v-else class="catalog-empty">
        <h2>Tu selección está vacía</h2>
        <p>Añade desde una ficha los conceptos que tienen precio orientativo.</p>
        <RouterLink class="button" to="/productos">Explorar el catálogo</RouterLink>
      </div>
    </template>
    <template v-else-if="mode === '/checkout'">
      <div v-if="result" class="feature-panel" role="status">
        <h2>Simulación completada</h2>
        <p>Referencia local {{ result.slice(0, 8) }}.</p>
        <RouterLink class="text-link" to="/cuenta/pedidos">Ver historial de prueba</RouterLink>
      </div>
      <form v-else-if="shop.lines.length" class="feature-panel" @submit.prevent="complete">
        <h2>Entrega de prueba</h2>
        <div class="feature-fields">
          <label
            >Modalidad<select v-model="delivery">
              <option value="recogida">Recogida simulada</option>
              <option value="estandar">Envío estándar simulado</option>
            </select></label
          >
        </div>
        <p>Subtotal {{ money(shop.subtotal) }} · Envío {{ money(shipping) }}</p>
        <p>
          <strong>Total simulado {{ money(shop.subtotal + shipping) }}</strong>
        </p>
        <button class="button" type="submit">Registrar simulación</button>
      </form>
      <RouterLink v-else class="text-link" to="/carrito">Volver al carrito</RouterLink>
    </template>
    <template v-else-if="mode === '/cuenta'"
      ><div class="page-links">
        <RouterLink class="text-link" to="/cuenta/pedidos">Ver pedidos simulados</RouterLink
        ><RouterLink class="text-link" to="/cuenta/facturas">Ver justificantes de prueba</RouterLink
        ><RouterLink class="text-link" to="/favoritos">Ver favoritos</RouterLink
        ><RouterLink class="text-link" to="/cuenta/proyectos">Ver proyectos guardados</RouterLink>
      </div></template
    >
    <template v-else>
      <p v-if="!shop.orders.length">Todavía no hay simulaciones en este dispositivo.</p>
      <article v-for="order in shop.orders" :key="order.id" class="feature-panel">
        <h2>Simulación {{ order.id.slice(0, 8) }}</h2>
        <p>
          {{
            new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(order.date))
          }}
          · {{ money(order.total) }}
        </p>
        <ul>
          <li v-for="line in order.lines" :key="line.id">{{ line.quantity }} × {{ line.name }}</li>
        </ul>
        <button class="text-link" type="button" @click="documentFor(order)">
          Descargar justificante de prueba
        </button>
      </article>
    </template>
    <p v-if="!shop.cartWritable || !shop.ordersWritable" role="status">
      El almacenamiento está desactivado. Los cambios solo estarán disponibles durante esta visita.
    </p>
  </div>
</template>
