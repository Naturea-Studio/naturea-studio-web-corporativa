<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { materials, priceLabel } from '../data'
import { downloadText, useLocalRecord } from './storage'
type Batch = {
  id: string
  reference: string
  material: string
  units: number
  unitCost: number
  stage: 'Planificado' | 'En fabricación' | 'Finalizado'
}
const stages = ['Planificado', 'En fabricación', 'Finalizado'] as const
function isBatch(value: unknown): value is Batch {
  if (!value || typeof value !== 'object') return false
  const row = value as Batch
  return (
    typeof row.id === 'string' &&
    typeof row.reference === 'string' &&
    typeof row.material === 'string' &&
    Number.isSafeInteger(row.units) &&
    row.units > 0 &&
    Number.isSafeInteger(row.unitCost) &&
    row.unitCost >= 0 &&
    stages.includes(row.stage)
  )
}
const { data: batches, writable } = useLocalRecord(
  'naturea-workshop-batches',
  [] as Batch[],
  (value): value is Batch[] => Array.isArray(value) && value.every(isBatch),
)
const draft = reactive({
  id: '',
  reference: '',
  material: 'roble',
  units: 1,
  cost: 0,
  stage: 'Planificado' as Batch['stage'],
})
const filter = ref('')
const status = ref('')
const rows = computed(() =>
  batches.value.filter((item) => !filter.value || item.stage === filter.value),
)
const total = computed(() =>
  batches.value.reduce((sum, item) => sum + item.units * item.unitCost, 0),
)
function reset() {
  Object.assign(draft, {
    id: '',
    reference: '',
    material: 'roble',
    units: 1,
    cost: 0,
    stage: 'Planificado',
  })
  status.value = ''
}
function save() {
  const reference = draft.reference.trim()
  if (!reference) {
    status.value = 'Introduce una referencia.'
    return
  }
  if (
    batches.value.some(
      (item) => item.id !== draft.id && item.reference.toLowerCase() === reference.toLowerCase(),
    )
  ) {
    status.value = 'Esa referencia ya está registrada.'
    return
  }
  const row = {
    id: draft.id || crypto.randomUUID(),
    reference,
    material: draft.material,
    units: draft.units,
    unitCost: Math.round(draft.cost * 100),
    stage: draft.stage,
  }
  batches.value = [row, ...batches.value.filter((item) => item.id !== row.id)]
  reset()
  status.value = writable.value
    ? 'Lote guardado en este navegador.'
    : 'Lote disponible durante esta visita.'
}
function edit(batch: Batch) {
  Object.assign(draft, { ...batch, cost: batch.unitCost / 100 })
  status.value = 'Editando ' + batch.reference
}
function csv() {
  const cell = (value: string | number) => {
    const text = String(value)
    return (
      '"' + (/^[=+@\-\t\r\n]/.test(text.trimStart()) ? "'" : '') + text.replaceAll('"', '""') + '"'
    )
  }
  const content = [
    ['Referencia', 'Material', 'Unidades', 'Coste unitario en céntimos', 'Estado'],
    ...rows.value.map((item) => [
      item.reference,
      item.material,
      item.units,
      item.unitCost,
      item.stage,
    ]),
  ]
    .map((row) => row.map(cell).join(','))
    .join('\r\n')
  downloadText('naturea-lotes.csv', '\uFEFF' + content, 'text/csv')
}
</script>
<template>
  <div class="wrap inner-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Entorno local de desarrollo</p>
        <h1>Operaciones de taller</h1>
      </div>
      <p>
        Registra lotes de prueba, controla el coste previsto y sigue el avance de fabricación desde
        este navegador.
      </p>
    </header>
    <div class="feature-columns">
      <form class="feature-panel" @submit.prevent="save">
        <h2>{{ draft.id ? 'Editar lote' : 'Nuevo lote' }}</h2>
        <div class="feature-fields">
          <label>Referencia<input v-model="draft.reference" required maxlength="80" /></label
          ><label
            >Material<select v-model="draft.material">
              <option v-for="item in materials" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select></label
          ><label
            >Unidades<input
              v-model.number="draft.units"
              type="number"
              min="1"
              max="10000"
              required /></label
          ><label
            >Coste unitario (€)<input
              v-model.number="draft.cost"
              type="number"
              min="0"
              max="100000"
              step=".01"
              required /></label
          ><label
            >Estado<select v-model="draft.stage">
              <option v-for="stage in stages" :key="stage">{{ stage }}</option>
            </select></label
          >
        </div>
        <div class="page-links">
          <button class="button" type="submit">Guardar lote</button
          ><button v-if="draft.id" type="button" class="text-link" @click="reset">
            Cancelar edición
          </button>
        </div>
        <p role="status">{{ status }}</p>
      </form>
      <section class="feature-panel">
        <h2>Lotes de prueba</h2>
        <p>{{ batches.length }} lotes · {{ priceLabel(total, 'EUR') }} de coste previsto</p>
        <div class="feature-fields">
          <label
            >Filtrar por estado<select v-model="filter">
              <option value="">Todos</option>
              <option v-for="stage in stages" :key="stage">{{ stage }}</option>
            </select></label
          >
        </div>
        <p v-if="!rows.length">No hay lotes para este estado.</p>
        <article v-for="item in rows" :key="item.id" class="demo-line">
          <strong>{{ item.reference }}</strong
          ><span
            >{{ item.units }} ud. · {{ item.stage }} ·
            {{ priceLabel(item.units * item.unitCost, 'EUR') }}</span
          ><button type="button" class="text-link" @click="edit(item)">Editar</button>
        </article>
        <button v-if="rows.length" type="button" class="text-link" @click="csv">
          Exportar CSV
        </button>
      </section>
    </div>
  </div>
</template>
