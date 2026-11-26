<script setup lang="ts">
import type { ProductImage } from '../types'
import EditorialImage from './EditorialImage.vue'
defineProps<{
  title: string
  image: ProductImage
  label: string
  reverse?: boolean
  tone?: string
}>()
</script>
<template>
  <section class="editorial-split" :class="[{ reverse }, tone]">
    <EditorialImage :image="image" :caption="true" />
    <div class="split-copy">
      <p class="eyebrow">{{ label }}</p>
      <h2>{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
