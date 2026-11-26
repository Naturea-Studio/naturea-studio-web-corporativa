<script setup lang="ts">
import type { ProductImage } from '../types'
defineProps<{ image: ProductImage; priority?: boolean; caption?: boolean }>()
</script>
<template>
  <figure class="editorial-image" :class="{ 'show-caption': caption && image.conceptual }">
    <img
      :src="'/images/' + image.key + '.webp'"
      :srcset="
        ['hero', 'river', 'river-comedor'].includes(image.key)
          ? `/images/${image.key}-small.webp 768w, /images/${image.key}.webp 1536w`
          : undefined
      "
      :sizes="
        ['hero', 'river', 'river-comedor'].includes(image.key)
          ? '(min-width: 850px) 60vw, 100vw'
          : undefined
      "
      :alt="image.alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      :width="['hero', 'river', 'river-comedor'].includes(image.key) ? 1536 : 354"
      :height="['hero', 'river', 'river-comedor'].includes(image.key) ? 1024 : 354"
    />
    <figcaption v-if="caption && image.conceptual">Imagen conceptual</figcaption>
  </figure>
</template>
