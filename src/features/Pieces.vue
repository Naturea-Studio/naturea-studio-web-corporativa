<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { pieces } from './pieces'
import { useLocalRecord } from './storage'
import EditorialImage from '../components/EditorialImage.vue'
import StoryCard from '../components/StoryCard.vue'
const route = useRoute()
const slug = computed(() => route.params.slug)
const piece = computed(() => pieces.find((item) => item.slug === slug.value))
const archive = ref(false)
const { data: interest, writable } = useLocalRecord(
  'naturea-piece-interest',
  [] as string[],
  (value): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === 'string'),
)
const list = computed(() =>
  pieces.filter((item) => (archive.value ? item.state === 'archivo' : item.state === 'estudio')),
)
function toggle(id: string) {
  interest.value = interest.value.includes(id)
    ? interest.value.filter((item) => item !== id)
    : [...interest.value, id]
}
</script>
<template>
  <div class="wrap inner-page feature-page">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <RouterLink to="/">Inicio</RouterLink><span>/</span
      ><RouterLink to="/piezas-unicas">Piezas únicas</RouterLink
      ><template v-if="piece"
        ><span>/</span><span aria-current="page">{{ piece.name }}</span></template
      >
    </nav>
    <template v-if="piece">
      <div class="feature-columns">
        <EditorialImage class="feature-image" :image="piece.image" priority caption />
        <div class="detail-copy">
          <p class="eyebrow">
            {{ piece.state === 'archivo' ? 'Archivo conceptual' : 'Estudio conceptual' }}
          </p>
          <h1>{{ piece.name }}</h1>
          <p>{{ piece.description }}</p>
          <dl>
            <div>
              <dt>Material estudiado</dt>
              <dd>{{ piece.material }}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>Concepto visual</dd>
            </div>
          </dl>
          <p>
            Esta referencia ilustra una posible pieza única. Las reservas se abrirán cuando exista
            una pieza física validada.
          </p>
          <div v-if="piece.state === 'estudio'" class="hero-links">
            <button
              class="button"
              type="button"
              :aria-pressed="interest.includes(piece.slug)"
              @click="toggle(piece.slug)"
            >
              {{
                interest.includes(piece.slug) ? 'Quitar de mi selección' : 'Guardar en mi selección'
              }}</button
            ><span v-if="!writable" role="status">Selección disponible durante esta visita.</span>
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="slug" class="page-intro">
      <h1>Pieza no encontrada</h1>
      <RouterLink class="text-link" to="/piezas-unicas">Volver a la galería</RouterLink>
    </div>
    <template v-else>
      <header class="catalog-intro">
        <div>
          <p class="eyebrow">Galería conceptual</p>
          <h1>Piezas únicas</h1>
        </div>
        <p>
          Una selección de vetas y contornos que podrían dar lugar a piezas irrepetibles. Las
          imágenes son estudios de diseño.
        </p>
      </header>
      <div class="page-links catalog-summary" aria-label="Etapa de los estudios">
        <button class="text-link" type="button" :aria-pressed="!archive" @click="archive = false">
          Estudios actuales</button
        ><button class="text-link" type="button" :aria-pressed="archive" @click="archive = true">
          Archivo conceptual
        </button>
      </div>
      <div class="grid three">
        <StoryCard
          v-for="item in list"
          :key="item.slug"
          :title="item.name"
          :text="item.description"
          :to="'/piezas-unicas/' + item.slug"
          :image="item.image"
        />
      </div>
    </template>
  </div>
</template>
