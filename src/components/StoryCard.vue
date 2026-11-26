<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { ProductImage } from '../types'
import EditorialImage from './EditorialImage.vue'
defineProps<{ title: string; to: string; image: ProductImage; text?: string }>()
</script>
<template>
  <RouterLink class="story-card" :to="to">
    <EditorialImage :image="image" />
    <div class="story-title">
      <h3>{{ title }}</h3>
      <ArrowUpRight :size="18" aria-hidden="true" />
    </div>
    <p v-if="text">{{ text }}</p>
  </RouterLink>
</template>
