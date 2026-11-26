<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collectionEntries, materialsFor } from './content'
import { conceptProducts } from '../data'
import EditorialImage from '../components/EditorialImage.vue'
import ProductCard from '../components/ProductCard.vue'
const route = useRoute()
const entry = computed(() =>
  collectionEntries.find((item) => route.path === '/colecciones/' + item.collection.slug),
)
const products = computed(() =>
  conceptProducts.filter((item) => item.collection === entry.value?.collection.id),
)
</script>
<template>
  <div class="wrap inner-page collections-page">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <RouterLink to="/">Inicio</RouterLink><span aria-hidden="true">/</span
      ><template v-if="entry"
        ><RouterLink to="/colecciones">Colecciones</RouterLink
        ><span aria-hidden="true">/</span></template
      ><span aria-current="page">{{ route.meta.title }}</span>
    </nav>
    <template v-if="entry">
      <section class="collection-hero" :class="entry.story?.tone">
        <div>
          <p class="eyebrow">Colección conceptual</p>
          <h1>{{ entry.collection.name }}</h1>
          <p>{{ entry.story?.line }}</p>
          <RouterLink class="text-link" :to="{ hash: '#piezas' }"
            >Ver conceptos ({{ entry.count }})</RouterLink
          >
        </div>
        <EditorialImage :image="entry.collection.image" priority caption />
      </section>
      <section v-if="entry.story" class="collection-story">
        <EditorialImage :image="entry.story.image" caption />
        <div>
          <h2>{{ entry.story.line }}</h2>
          <p>{{ entry.story.text }}</p>
          <div class="product-materials">
            <h3>Materiales de la colección</h3>
            <div>
              <RouterLink
                v-for="material in materialsFor(entry.story.materialIds)"
                :key="material.id"
                :to="{ path: '/materiales', hash: '#' + material.id }"
                ><span :style="{ backgroundColor: material.color }"></span
                >{{ material.name }}</RouterLink
              >
            </div>
          </div>
        </div>
      </section>
      <section id="piezas" class="collection-pieces">
        <div class="section-heading">
          <h2>Piezas de {{ entry.collection.name }}.</h2>
          <p>Conceptos en desarrollo.</p>
        </div>
        <div v-if="products.length" class="grid products-grid">
          <ProductCard v-for="item in products" :key="item.id" :product="item" />
        </div>
        <p v-else>Estamos preparando los primeros estudios de esta colección.</p>
      </section>
      <nav class="catalog-tabs collection-next" aria-label="Otras colecciones">
        <RouterLink
          v-for="item in collectionEntries.filter((item) => item !== entry)"
          :key="item.collection.id"
          :to="'/colecciones/' + item.collection.slug"
          >{{ item.collection.name }}</RouterLink
        >
      </nav>
    </template>
    <template v-else>
      <header class="catalog-intro">
        <div>
          <p class="eyebrow">Naturea Studio</p>
          <h1>Colecciones</h1>
        </div>
        <p>
          Cuatro maneras de trabajar la madera. Explora los materiales, las formas y las piezas que
          componen cada colección.
        </p>
      </header>
      <div class="collection-index grid two">
        <RouterLink
          v-for="item in collectionEntries"
          :key="item.collection.id"
          :to="'/colecciones/' + item.collection.slug"
          class="story-card collection-tile"
          :class="item.story?.tone"
          ><EditorialImage :image="item.collection.image" />
          <div>
            <p class="eyebrow">
              {{ item.count }} {{ item.count === 1 ? 'concepto' : 'conceptos' }}
            </p>
            <h2>{{ item.collection.name }}</h2>
            <p>{{ item.collection.description }}</p>
            <span class="text-link">Explorar {{ item.collection.name }}</span>
          </div></RouterLink
        >
      </div>
    </template>
  </div>
</template>
