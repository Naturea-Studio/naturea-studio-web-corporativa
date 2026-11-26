<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { materials, images } from '../data'
import { stories } from '../editorial'
import EditorialImage from '../components/EditorialImage.vue'
import { downloadText, useLocalRecord } from './storage'
type Board = {
  id: string
  name: string
  scope: string
  materials: string[]
  units: number
  notes: string
}
function isBoard(value: unknown): value is Board {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<Board>
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.scope === 'string' &&
    typeof item.notes === 'string' &&
    Number.isSafeInteger(item.units) &&
    Array.isArray(item.materials) &&
    item.materials.every((id) => typeof id === 'string')
  )
}
const route = useRoute()
const story = computed(() => stories[route.path.slice(1)])
const { data: boards, writable } = useLocalRecord(
  'naturea-pro-boards',
  [] as Board[],
  (value): value is Board[] => Array.isArray(value) && value.every(isBoard),
)
const draft = reactive<Board>({
  id: '',
  name: '',
  scope: 'Interiorismo',
  materials: [],
  units: 1,
  notes: '',
})
const status = ref('')
const samples = materials.filter(
  (item) => item.kind === 'madera' || item.kind === 'metal' || item.kind === 'resina',
)
const panel = computed(
  () =>
    route.path === '/profesionales/mesa-de-trabajo' ||
    route.path === '/cuenta/proyectos' ||
    route.path === '/cuenta/presupuestos',
)
function save() {
  const name = draft.name.trim()
  if (!name) {
    status.value = 'Escribe un nombre para el proyecto.'
    return
  }
  const record = {
    ...draft,
    name,
    id: draft.id || crypto.randomUUID(),
    materials: [...draft.materials],
  }
  boards.value = [record, ...boards.value.filter((item) => item.id !== record.id)]
  draft.id = record.id
  status.value = writable.value
    ? 'Proyecto guardado en este navegador.'
    : 'Proyecto disponible durante esta visita.'
}
function load(item: Board) {
  Object.assign(draft, { ...item, materials: [...item.materials] })
  status.value = 'Proyecto abierto para edición.'
}
function reset() {
  Object.assign(draft, {
    id: '',
    name: '',
    scope: 'Interiorismo',
    materials: [],
    units: 1,
    notes: '',
  })
  status.value = ''
}
function exportBoard(item: Board) {
  const names = materials
    .filter((material) => item.materials.includes(material.id))
    .map((material) => material.name)
    .join(', ')
  downloadText(
    'naturea-proyecto-profesional.txt',
    [
      'Naturea Studio · Preparación profesional sin presupuesto emitido',
      item.name,
      item.scope,
      'Unidades estimadas: ' + item.units,
      'Materiales: ' + (names || 'Por decidir'),
      item.notes,
    ].join('\n'),
  )
}
</script>
<template>
  <div class="wrap inner-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Naturea para profesionales</p>
        <h1>{{ route.meta.title }}</h1>
      </div>
      <p>
        {{
          story?.text ||
          'Prepara una selección de materiales y un borrador para tu proyecto. Puedes retomarlo desde este dispositivo.'
        }}
      </p>
    </header>
    <nav class="catalog-tabs" aria-label="Área profesional">
      <RouterLink to="/profesionales/interioristas">Interiorismo</RouterLink
      ><RouterLink to="/profesionales/arquitectos">Arquitectura</RouterLink
      ><RouterLink to="/profesionales/hosteleria">Hostelería</RouterLink
      ><RouterLink to="/profesionales/mesa-de-trabajo">Mesa de trabajo</RouterLink>
    </nav>
    <div v-if="!panel" class="feature-columns">
      <EditorialImage class="feature-image" :image="story?.image || images.dining" caption />
      <div class="feature-panel">
        <h2>Planifica tu proyecto</h2>
        <p>
          Reúne las muestras que te interesan, indica las unidades estimadas y descarga una ficha
          para preparar el encargo.
        </p>
        <RouterLink class="button" to="/profesionales/mesa-de-trabajo"
          >Abrir mesa de trabajo</RouterLink
        >
      </div>
    </div>
    <div v-else class="feature-columns">
      <form @submit.prevent="save">
        <div class="feature-fields">
          <label>Nombre del proyecto<input v-model="draft.name" required maxlength="100" /></label
          ><label
            >Actividad<select v-model="draft.scope">
              <option>Interiorismo</option>
              <option>Arquitectura</option>
              <option>Hostelería</option>
              <option>Otro</option>
            </select></label
          ><label
            >Unidades estimadas<input
              v-model.number="draft.units"
              type="number"
              min="1"
              max="10000"
              required
          /></label>
        </div>
        <fieldset class="feature-panel">
          <legend>Materiales de referencia</legend>
          <div class="sample-picker">
            <label v-for="item in samples" :key="item.id"
              ><input v-model="draft.materials" type="checkbox" :value="item.id" /><span
                :style="{ backgroundColor: item.color }"
              ></span
              >{{ item.name }}</label
            >
          </div>
        </fieldset>
        <label class="feature-notes"
          >Notas<textarea v-model="draft.notes" rows="4" maxlength="2000" />
        </label>
        <div class="hero-links">
          <button class="button" type="submit">Guardar proyecto</button
          ><button class="text-link" type="button" @click="reset">Empezar otro</button>
        </div>
        <p role="status">{{ status }}</p>
      </form>
      <section class="feature-panel">
        <h2>Proyectos guardados</h2>
        <p v-if="!boards.length">Todavía no hay proyectos en este dispositivo.</p>
        <article v-for="item in boards" :key="item.id" class="demo-line">
          <strong>{{ item.name }}</strong><button
            class="text-link"
            type="button"
            @click="load(item)"
          >
            Editar</button
          ><button class="text-link" type="button" @click="exportBoard(item)">
            Descargar ficha
          </button>
        </article>
      </section>
    </div>
  </div>
</template>
