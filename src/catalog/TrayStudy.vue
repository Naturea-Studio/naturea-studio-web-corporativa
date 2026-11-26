<script setup lang="ts">
import { computed, ref } from 'vue'
import { conceptProducts, images, priceLabel } from '../data'
import { downloadText } from '../features/storage'
import EditorialImage from '../components/EditorialImage.vue'

const trayPrice = conceptProducts.find((product) => product.slug === 'bandeja-decorativa')?.price
const estimatedPrice = trayPrice ? priceLabel(trayPrice.subtotalCents, trayPrice.currency) : ''

const measurements = ref({ surfaceLength: '', surfaceDepth: '', trayLength: '', trayDepth: '' })
const rotated = ref(false)
const stage = ref(false)
const finish = ref(0)
const interest = ref(false)
const finishes = [
  {
    name: 'Mate',
    image: images.walnut,
    note: 'Referencia de veta de nogal. El estudio mate busca reflejos discretos bajo luz lateral.',
  },
  {
    name: 'Aceite natural',
    image: images.finish,
    note: 'Referencia de aplicación de aceite sobre roble. Sirve para observar el proceso, con otro tipo de madera.',
  },
]
const fields = [
  ['surfaceLength', 'Largo de tu superficie'],
  ['surfaceDepth', 'Fondo de tu superficie'],
  ['trayLength', 'Largo que quieres probar'],
  ['trayDepth', 'Fondo que quieres probar'],
] as const
const number = (value: string) => Number(String(value).replace(',', '.'))
const dimensions = computed(() => {
  const surfaceLength = number(measurements.value.surfaceLength)
  const surfaceDepth = number(measurements.value.surfaceDepth)
  const length = number(measurements.value.trayLength)
  const depth = number(measurements.value.trayDepth)
  return {
    surfaceLength,
    surfaceDepth,
    length: rotated.value ? depth : length,
    depth: rotated.value ? length : depth,
  }
})
const ready = computed(() =>
  Object.values(dimensions.value).every((n) => Number.isFinite(n) && n > 0 && n <= 1000),
)
const report = computed(() => {
  if (!ready.value) return ''
  const { surfaceLength, surfaceDepth, length, depth } = dimensions.value
  const x = surfaceLength - length
  const y = surfaceDepth - depth
  const format = (n: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(Math.abs(n))
  return x >= 0 && y >= 0
    ? 'Cabe en planta. Sobran ' +
        format(x) +
        ' cm de largo y ' +
        format(y) +
        ' cm de fondo en total.'
    : 'No cabe en esta orientación. ' +
        (x < 0 ? 'Faltan ' + format(x) + ' cm de largo. ' : '') +
        (y < 0 ? 'Faltan ' + format(y) + ' cm de fondo.' : '')
})
const plan = computed(() => {
  const { surfaceLength, surfaceDepth, length, depth } = dimensions.value
  const widest = Math.max(surfaceLength, length)
  return {
    ratio: widest / Math.max(surfaceDepth, depth),
    surfaceWidth: (100 * surfaceLength) / widest,
    trayWidth: (100 * length) / widest,
    surfaceHeight: (100 * surfaceDepth) / Math.max(surfaceDepth, depth),
    trayHeight: (100 * depth) / Math.max(surfaceDepth, depth),
  }
})
function saveStudy() {
  if (!ready.value) return
  const { surfaceLength, surfaceDepth, length, depth } = dimensions.value
  stage.value = false
  downloadText(
    'naturea-estudio-bandeja.txt',
    [
      'Naturea Studio · Estudio personal de la bandeja de nogal',
      'Medidas introducidas para comparar, sin medidas comerciales definitivas.',
      'Superficie: ' + surfaceLength + ' × ' + surfaceDepth + ' cm',
      'Huella probada: ' + length + ' × ' + depth + ' cm',
      'Referencia de acabado: ' + finishes[finish.value].name,
      report.value,
      ...(interest.value && estimatedPrice
        ? [`Interés declarado: me plantearía probar un prototipo a ${estimatedPrice}.`]
        : []),
    ].join('\n'),
  )
  stage.value = true
}
</script>

<template>
  <section id="bandeja-en-tu-espacio" class="tray-studio">
    <header class="tray-heading">
      <p class="eyebrow">Estudio de la bandeja</p>
      <h2>Pruébala en tu espacio.</h2>
      <p>
        Mide la superficie que tienes libre y el espacio que te gustaría dedicar a la bandeja. La
        huella del dibujo sale de tus medidas.
      </p>
    </header>
    <div class="feature-columns">
      <div>
        <div class="feature-fields">
          <label v-for="[key, label] in fields" :key="key"
            >{{ label }} (cm)<input
              v-model="measurements[key]"
              inputmode="decimal"
              maxlength="8"
              placeholder="cm"
          /></label>
        </div>
        <p class="feature-muted">
          Introduce cuatro medidas mayores que cero y de hasta 1.000 cm. Aún estamos definiendo las
          dimensiones de la pieza.
        </p>
        <div class="page-links">
          <button
            class="text-link"
            type="button"
            :aria-pressed="rotated"
            :disabled="!ready"
            @click="rotated = !rotated"
          >
            Girar 90°
          </button>
        </div>
        <p class="tray-result" role="status">{{ report }}</p>
      </div>
      <figure class="tray-plan">
        <figcaption>
          <span>Vista superior</span><span>Contorno disponible · Huella de prueba</span>
        </figcaption>
        <div class="tray-drawing">
          <div
            v-if="ready"
            class="tray-drawing-plane"
            :style="{ aspectRatio: plan.ratio, width: 'min(100%, ' + 175 * plan.ratio + 'px)' }"
            aria-hidden="true"
          >
            <div
              class="tray-surface"
              :style="{ width: plan.surfaceWidth + '%', height: plan.surfaceHeight + '%' }"
            ></div>
            <div
              class="tray-outline"
              :style="{ width: plan.trayWidth + '%', height: plan.trayHeight + '%' }"
            ></div>
          </div>
          <p v-else>El dibujo aparecerá cuando introduzcas las medidas.</p>
        </div>
      </figure>
    </div>
    <div class="tray-finishes feature-columns">
      <EditorialImage
        :key="finishes[finish].name"
        class="feature-image"
        :image="finishes[finish].image"
        caption
      />
      <div>
        <h3>El acabado bajo la luz.</h3>
        <fieldset class="tray-samples">
          <legend>Referencias de acabado</legend>
          <label v-for="(item, index) in finishes" :key="item.name"
            ><input v-model="finish" type="radio" name="tray-finish" :value="index" />{{
              item.name
            }}</label
          >
        </fieldset>
        <p aria-live="polite">{{ finishes[finish].note }}</p>
        <label v-if="estimatedPrice" class="tray-interest"
          ><input v-model="interest" type="checkbox" /> Incluir en mi comparación que me plantearía
          probar un prototipo a {{ estimatedPrice }}.</label
        >
        <button class="button" type="button" :disabled="!ready" @click="saveStudy">
          Descargar mi comparación
        </button>
        <p v-if="stage" class="feature-muted" role="status">
          Has iniciado la descarga de tu comparación.
        </p>
        <p class="feature-muted">La comparación se genera en tu dispositivo.</p>
      </div>
    </div>
  </section>
</template>
