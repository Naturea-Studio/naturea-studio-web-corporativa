<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
const route = useRoute()
watch(
  () => route.path,
  async (_, previous) => {
    if (!previous) return
    await nextTick()
    document.querySelector<HTMLElement>('#content')?.focus({ preventScroll: true })
  },
)
</script>
<template>
  <a class="skip-link" href="#content">Saltar al contenido</a>
  <SiteHeader />
  <main id="content" tabindex="-1"><RouterView :key="route.path" /></main>
  <SiteFooter />
</template>
