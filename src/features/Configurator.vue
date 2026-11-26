<script setup lang="ts">
import { computed, reactive } from 'vue'
import { images, priceLabel } from '../data'
import EditorialImage from '../components/EditorialImage.vue'
import TablePlan from './TablePlan.vue'
import { defaults, estimateStudy, models, validateStudy } from './configuration'
const study = reactive({ ...defaults })
const model = computed(() => models[study.model])
const issues = computed(() => validateStudy(study))
const visual = computed(() =>
  study.resin !== 'sin-resina'
    ? images.river
    : study.model === 'centro'
      ? images.coffee
      : images.hero,
)
const summary = computed(() =>
  [
    model.value.name,
    study.shape,
    study.length + ' × ' + study.width + ' × ' + study.height + ' cm',
    'espesor ' + study.thickness + ' cm',
    study.wood,
    study.resin,
    study.legs,
    study.finish,
    study.extra,
  ].join(' · '),
)
const options = [
  { key: 'shape', name: 'Forma', items: ['ovalada', 'rectangular'] },
  { key: 'wood', name: 'Madera', items: ['roble', 'nogal', 'olivo'] },
  { key: 'resin', name: 'Resina', items: ['sin-resina', 'negra mate', 'ahumada', 'transparente'] },
  { key: 'legs', name: 'Patas', items: ['madera', 'acero negro'] },
  { key: 'finish', name: 'Acabado', items: ['mate', 'satinado', 'aceite natural'] },
  { key: 'extra', name: 'Opciones adicionales', items: ['sin extras', 'pasacables'] },
] as const
function changeModel() {
  const small = study.model === 'centro'
  Object.assign(study, {
    length: small ? 100 : 180,
    width: small ? 60 : 90,
    height: small ? 40 : 75,
    extra: 'sin extras',
  })
}
</script>
<template>
  <div class="wrap inner-page feature-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Proyectos a medida</p>
        <h1>Configura tu mesa</h1>
      </div>
      <p>
        Explora proporciones y materiales para preparar una solicitud. Las combinaciones y el precio
        son hipótesis de diseño.
      </p>
    </header>
    <div class="feature-columns">
      <div>
        <EditorialImage class="feature-image" :image="visual" priority caption />
        <p class="feature-muted">
          Referencia visual de la familia de diseño. La imagen ilustra materiales y ambiente.
        </p>
        <TablePlan v-if="!issues.length" :study="study" />
      </div>
      <div>
        <div class="feature-fields">
          <label
            >Modelo<select v-model="study.model" @change="changeModel">
              <option value="comedor">Mesa de comedor</option>
              <option value="centro">Mesa de centro</option>
            </select></label
          >
          <label v-for="option in options" :key="option.key"
            >{{ option.name
            }}<select v-model="study[option.key]">
              <option v-for="item in option.items" :key="item">{{ item }}</option>
            </select></label
          >
          <label
            >Largo (cm)<input
              v-model.number="study.length"
              type="number"
              :min="model.length[0]"
              :max="model.length[1]"
          /></label>
          <label
            >Ancho (cm)<input
              v-model.number="study.width"
              type="number"
              :min="model.width[0]"
              :max="model.width[1]"
          /></label>
          <label
            >Altura (cm)<input
              v-model.number="study.height"
              type="number"
              :min="model.height[0]"
              :max="model.height[1]"
          /></label>
          <label
            >Espesor (cm)<input v-model.number="study.thickness" type="number" min="3" max="6"
          /></label>
        </div>
        <section class="feature-panel" aria-live="polite">
          <h2>Resumen del concepto</h2>
          <p>{{ summary }}</p>
          <ul v-if="issues.length">
            <li v-for="issue in issues" :key="issue">{{ issue }}</li>
          </ul>
          <template v-else
            ><p>
              <strong>{{ priceLabel(estimateStudy(study), 'EUR') }}</strong> · Estimación de prueba,
              pendiente de presupuesto.
            </p>
            <RouterLink
              class="button"
              :to="{ path: '/solicitar-presupuesto', query: { configuracion: summary } }"
              >Preparar una solicitud</RouterLink
            ></template
          >
        </section>
      </div>
    </div>
  </div>
</template>
