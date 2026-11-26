<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { journal, materials, spaces } from '../data'
import { stories } from '../editorial'
import EditorialImage from '../components/EditorialImage.vue'
import StoryCard from '../components/StoryCard.vue'
import ProjectForm from '../components/ProjectForm.vue'
const route = useRoute()
const bits = computed(() => {
  const [section = '', slug = ''] = route.path.split('/').filter(Boolean)
  return [section, slug] as const
})
const section = computed(() => bits.value[0])
const slug = computed(() => bits.value[1])
const story = computed(() => stories[bits.value.filter(Boolean).join('/')])
const space = computed(() =>
  section.value === 'inspiracion' ? spaces.find((item) => item.slug === slug.value) : undefined,
)
const article = computed(() =>
  section.value === 'journal' ? journal.find((item) => item.slug === slug.value) : undefined,
)
const title = computed(() => String(route.meta.title))
const crumbLabels: Record<string, string> = {
  productos: 'Catálogo',
  mobiliario: 'Mobiliario',
  decoracion: 'Decoración',
  colecciones: 'Colecciones',
  inspiracion: 'Inspiración',
  profesionales: 'Profesionales',
  journal: 'Journal',
  cuenta: 'Mi cuenta',
}
const heroImage = computed(() => space.value?.image || article.value?.image || story.value?.image)
const label = computed(() =>
  space.value ? 'Ambiente conceptual' : article.value ? 'Borrador editorial' : story.value?.label,
)
const description = computed(
  () => space.value?.description || article.value?.description || story.value?.text,
)
</script>
<template>
  <div class="wrap inner-page">
    <nav aria-label="Ruta de navegación" class="breadcrumbs">
      <RouterLink to="/">Inicio</RouterLink
      ><template v-if="slug && crumbLabels[section]"
        ><span aria-hidden="true">/</span
        ><RouterLink :to="'/' + section">{{ crumbLabels[section] }}</RouterLink></template
      ><span aria-hidden="true">/</span><span aria-current="page">{{ title }}</span>
    </nav>
    <div v-if="route.meta.notFound" class="page-intro">
      <p class="eyebrow">404</p>
      <h1>{{ title }}</h1>
      <p>Prueba con el catálogo o vuelve a la portada para seguir explorando.</p>
      <div class="hero-links">
        <RouterLink class="button" to="/">Volver al inicio</RouterLink
        ><RouterLink class="text-link" to="/buscar">Buscar</RouterLink>
      </div>
    </div>
    <template v-else>
      <div :class="heroImage ? 'detail-layout' : 'page-intro'">
        <EditorialImage v-if="heroImage" :image="heroImage" priority caption />
        <div class="detail-copy">
          <p v-if="label" class="eyebrow">{{ label }}</p>
          <h1>{{ title }}</h1>
          <p v-if="description">{{ description }}</p>
          <div v-if="story?.links" class="page-links">
            <RouterLink
              v-for="[name, path] in story.links"
              :key="path"
              class="text-link"
              :to="path"
              >{{ name }}</RouterLink
            >
          </div>
        </div>
      </div>
      <div v-if="story?.notes" class="detail-notes">
        <details v-for="[question, answer] in story.notes" :key="question">
          <summary>{{ question }}</summary>
          <p>{{ answer }}</p>
        </details>
      </div>
      <template v-if="section === 'solicitar-presupuesto'"><ProjectForm /></template>
      <template v-if="section === 'inspiracion' && !slug"
        ><p class="listing-intro">
          Ambientes conceptuales para imaginar cómo se integra la madera en casa.
        </p>
        <div class="grid three">
          <StoryCard
            v-for="item in spaces"
            :key="item.id"
            :title="item.name"
            :to="'/inspiracion/' + item.slug"
            :image="item.image"
            :text="item.description"
          /></div
      ></template>
      <div v-if="space" class="page-links">
        <RouterLink to="/inspiracion" class="text-link">Ver más ambientes</RouterLink
        ><RouterLink to="/a-medida" class="text-link">Explorar proyectos a medida</RouterLink>
      </div>
      <template v-if="section === 'materiales'"
        ><p class="listing-intro">
          Explora los tonos, las vetas y las combinaciones que estamos estudiando para nuestras
          piezas.
        </p>
        <div class="grid three samples material-grid">
          <article v-for="item in materials" :id="item.id" :key="item.id">
            <EditorialImage v-if="item.image" :image="item.image" caption /><span
              v-else
              class="sample-color"
              :style="{ backgroundColor: item.color }"
              role="img"
              :aria-label="'Tono orientativo de ' + item.name"
            ></span>
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
          </article>
        </div></template
      >
      <template v-if="section === 'journal' && !article"
        ><p id="materiales" class="listing-intro">
          Cuaderno de estudio sobre materiales, interiores y procesos. Estas primeras notas son
          borradores editoriales.
        </p>
        <div class="grid two">
          <StoryCard
            v-for="item in journal"
            :key="item.id"
            :title="item.name"
            :to="'/journal/' + item.slug"
            :image="item.image"
            :text="item.description"
          /></div
      ></template>
      <article v-if="article" class="reading">
        <p v-for="paragraph in article.body" :key="paragraph">{{ paragraph }}</p>
        <RouterLink to="/journal" class="text-link">Volver al Journal</RouterLink>
      </article>
    </template>
  </div>
</template>
