<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import type { Product } from '../types'
import { collections, materials, priceLabel } from '../data'
import { useFavorites } from '../stores'
import EditorialImage from './EditorialImage.vue'
defineProps<{ product: Product }>()
const favorites = useFavorites()
</script>
<template>
  <article class="product-card">
    <RouterLink :to="'/productos/' + product.slug">
      <EditorialImage v-if="product.image" :image="product.image" />
      <div v-else class="product-card-text">
        <span>Ficha de estudio</span>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-title">
        <h3>{{ product.name }}</h3>
        <span v-if="product.price" class="price"
          >{{ priceLabel(product.price.subtotalCents, product.price.currency) }} aprox.</span
        >
      </div>
      <p>
        {{ collections.find((item) => item.id === product.collection)?.name }} ·
        {{
          product.materialIds
            .map((id) => materials.find((item) => item.id === id)?.name)
            .filter(Boolean)
            .join(' + ')
        }}
      </p>
      <small>{{ product.publicStatus }}</small>
    </RouterLink>
    <button
      class="icon favorite"
      type="button"
      :aria-label="'Guardar ' + product.name + ' en favoritos'"
      :aria-pressed="favorites.ids.includes(product.id)"
      @click="favorites.toggle(product.id)"
    >
      <Heart :size="17" :fill="favorites.ids.includes(product.id) ? 'currentColor' : 'none'" />
    </button>
  </article>
</template>
