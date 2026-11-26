<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-vue-next'
import { collections, categories, priceLabel } from '../data'
import { useFavorites } from '../stores'
import { useCommerce } from '../features/commerce'
import type { Product } from '../types'
import { materialsFor, relatedProducts, studies } from './content'
import EditorialImage from '../components/EditorialImage.vue'
import ProductCard from '../components/ProductCard.vue'
import TrayStudy from './TrayStudy.vue'
const props = defineProps<{ product: Product }>()
const index = ref(0)
const favorites = useFavorites()
const commerce = useCommerce()
const quantity = computed(
  () => commerce.lines.find((line) => line.id === props.product.id)?.quantity ?? 0,
)
const isTray = computed(() => props.product.slug === 'bandeja-decorativa')
const study = computed(() => studies[props.product.id])
const collection = computed(() => collections.find((item) => item.id === props.product.collection))
const category = computed(() => categories.find((item) => item.id === props.product.category))
const gallery = computed(() =>
  props.product.image
    ? [props.product.image, ...(study.value?.detailImage ? [study.value.detailImage] : [])]
    : [],
)
const related = computed(() => relatedProducts(props.product))
const saved = computed(() => favorites.ids.includes(props.product.id))
function move(distance: number) {
  index.value = (index.value + distance + gallery.value.length) % gallery.value.length
}
</script>
<template>
  <div class="wrap inner-page product-page">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <RouterLink to="/">Inicio</RouterLink><span aria-hidden="true">/</span
      ><RouterLink to="/productos">Catálogo</RouterLink><span aria-hidden="true">/</span
      ><RouterLink v-if="category" :to="'/' + category.section + '/' + category.slug">{{
        category.name
      }}</RouterLink
      ><span v-if="category" aria-hidden="true">/</span
      ><span aria-current="page">{{ product.name }}</span>
    </nav>
    <div class="product-detail" :class="{ 'product-detail-text': !gallery.length }">
      <section
        v-if="gallery.length"
        class="product-gallery"
        aria-label="Galería conceptual"
        @keydown.left.prevent="move(-1)"
        @keydown.right.prevent="move(1)"
      >
        <div class="gallery-stage">
          <EditorialImage :key="gallery[index].key" :image="gallery[index]" priority />
          <template v-if="gallery.length > 1"
            ><button
              class="icon gallery-prev"
              type="button"
              aria-label="Imagen anterior"
              @click="move(-1)"
            >
              <ChevronLeft :size="22" /></button
            ><button
              class="icon gallery-next"
              type="button"
              aria-label="Imagen siguiente"
              @click="move(1)"
            >
              <ChevronRight :size="22" /></button
          ></template>
        </div>
        <div class="gallery-caption" aria-live="polite">
          <span>{{
            index === 0 ? 'Visualización del concepto' : 'Referencia de material'
          }}</span><span>{{ index + 1 }} / {{ gallery.length }}</span>
        </div>
        <div v-if="gallery.length > 1" class="gallery-thumbs">
          <button
            v-for="(image, i) in gallery"
            :key="image.key"
            type="button"
            :aria-pressed="index === i"
            :aria-label="i === 0 ? 'Ver la pieza' : 'Ver referencia de material'"
            @click="index = i"
          >
            <img :src="'/images/' + image.key + '.webp'" alt="" width="72" height="58" />
          </button>
        </div>
      </section>
      <div class="product-info">
        <p class="eyebrow">{{ product.publicStatus }}</p>
        <h1>{{ product.name }}</h1>
        <RouterLink
          v-if="collection"
          class="text-link product-collection"
          :to="'/colecciones/' + collection.slug"
          >Colección {{ collection.name }}</RouterLink
        >
        <p>{{ product.description }}</p>
        <div class="product-estimate">
          <strong v-if="product.price">{{
            priceLabel(product.price.subtotalCents, product.price.currency)
          }}</strong><span>{{ product.price ? 'Precio orientativo' : 'Precio por definir' }}</span>
        </div>
        <div class="product-materials">
          <h2>Materiales del concepto</h2>
          <div>
            <RouterLink
              v-for="material in materialsFor(product.materialIds)"
              :key="material.id"
              :to="{ path: '/materiales', hash: '#' + material.id }"
              ><span :style="{ backgroundColor: material.color }"></span
              >{{ material.name }}</RouterLink
            >
          </div>
        </div>
        <div class="hero-links">
          <a v-if="isTray" class="button" href="#bandeja-en-tu-espacio">Probar en mi espacio</a>
          <button
            class="button"
            type="button"
            :aria-pressed="saved"
            @click="favorites.toggle(product.id)"
          >
            <Heart :size="17" :fill="saved ? 'currentColor' : 'none'" />{{
              saved ? 'Quitar de favoritos' : 'Guardar en favoritos'
            }}</button
          ><RouterLink
            v-if="product.manufacturing === 'personalizado'"
            class="text-link"
            to="/a-medida"
            >Explorar a medida</RouterLink
          >
        </div>
        <div v-if="product.price && !isTray" class="page-links">
          <button
            class="text-link"
            type="button"
            :disabled="quantity >= 9"
            @click="commerce.set(product.id, quantity + 1)"
          >
            Añadir al carrito de prueba</button
          ><RouterLink v-if="quantity" class="text-link" to="/carrito"
            >Ver carrito ({{ quantity }})</RouterLink
          >
        </div>
        <p class="concept-note">Diseño en desarrollo · Sin disponibilidad para compra.</p>
      </div>
    </div>
    <TrayStudy v-if="isTray" />
    <section class="product-study">
      <div>
        <p class="eyebrow">Notas de diseño</p>
        <h2>La idea detrás de la pieza.</h2>
        <p>{{ study?.intent || product.description }}</p>
      </div>
      <div>
        <dl>
          <div v-for="[label, value] in study?.details" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </div>
          <div>
            <dt>Fabricación prevista</dt>
            <dd>
              {{ product.manufacturing === 'serie' ? 'Pequeña serie' : 'Proyecto personalizado' }}
            </dd>
          </div>
        </dl>
        <p v-if="study"><strong>Pendiente de validar</strong><br />{{ study.pending }}</p>
      </div>
    </section>
    <section class="catalog-related">
      <div class="section-heading">
        <h2>Otras piezas para explorar.</h2>
        <RouterLink class="text-link" to="/productos">Ver catálogo</RouterLink>
      </div>
      <div class="grid products-grid">
        <ProductCard v-for="item in related" :key="item.id" :product="item" />
      </div>
    </section>
  </div>
</template>
