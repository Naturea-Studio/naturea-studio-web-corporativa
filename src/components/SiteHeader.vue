<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-vue-next'
import { categories, collections, images } from '../data'
import EditorialImage from './EditorialImage.vue'
const route = useRoute()
const expanded = ref('')
const mobile = ref(false)
const toggle = ref<HTMLButtonElement>()
const nav = [
  {
    title: 'Colecciones',
    path: '/colecciones',
    items: collections.map((item) => ({ title: item.name, path: '/colecciones/' + item.slug })),
    image: images.dining,
  },
  ...(['mobiliario', 'decoracion'] as const).map((section) => ({
    title: section === 'mobiliario' ? 'Mobiliario' : 'Decoración',
    path: '/' + section,
    items: categories
      .filter((item) => item.section === section)
      .map((item) => ({ title: item.name, path: '/' + section + '/' + item.slug })),
    image: section === 'mobiliario' ? images.coffee : images.tray,
  })),
  { title: 'Piezas únicas', path: '/piezas-unicas' },
  { title: 'A medida', path: '/a-medida' },
  { title: 'El estudio', path: '/el-estudio' },
]
const actions = [
  { title: 'Buscar', path: '/buscar', icon: Search },
  { title: 'Favoritos', path: '/favoritos', icon: Heart },
  { title: 'Mi cuenta', path: '/cuenta', icon: UserRound },
  { title: 'Carrito', path: '/carrito', icon: ShoppingBag },
]
function close(restore = false) {
  const previous = expanded.value
  const wasMobile = mobile.value
  expanded.value = ''
  mobile.value = false
  if (restore)
    void nextTick(() =>
      wasMobile
        ? toggle.value?.focus()
        : document.querySelector<HTMLButtonElement>('[data-menu="' + previous + '"]')?.focus(),
    )
}
const mobileLayout = window.matchMedia('(max-width: 1090px)')
function closeOutside(event: PointerEvent) {
  if (event.target instanceof Element && !event.target.closest('.site-header')) close()
}
function resetMenu() {
  close()
}
onMounted(() => {
  document.addEventListener('pointerdown', closeOutside)
  mobileLayout.addEventListener('change', resetMenu)
})
onUnmounted(() => {
  document.removeEventListener('pointerdown', closeOutside)
  mobileLayout.removeEventListener('change', resetMenu)
})
function closeOnFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    event.currentTarget instanceof HTMLElement &&
    !event.currentTarget.contains(event.relatedTarget)
  )
    close()
}
watch(
  () => route.path,
  () => close(),
)
</script>
<template>
  <header class="site-header" @keydown.esc="close(true)" @focusout="closeOnFocusOut">
    <div class="header-inner">
      <button
        ref="toggle"
        class="icon mobile-toggle"
        type="button"
        :aria-label="mobile ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="mobile"
        aria-controls="main-nav"
        @click="mobile ? close() : (mobile = true)"
      >
        <X v-if="mobile" :size="22" /><Menu v-else :size="22" />
      </button>
      <RouterLink class="wordmark" to="/" aria-label="Naturea Studio, inicio"
        >naturea<span>STUDIO</span></RouterLink
      >
      <nav
        id="main-nav"
        class="main-nav"
        :class="{ open: mobile }"
        aria-label="Navegación principal"
      >
        <div v-for="item in nav" :key="item.path" class="nav-item">
          <RouterLink :to="item.path" @click="close()">{{ item.title }}</RouterLink>
          <button
            v-if="item.items"
            type="button"
            class="nav-disclosure"
            :data-menu="item.path"
            :aria-label="'Submenú de ' + item.title"
            :aria-expanded="expanded === item.path"
            :aria-controls="
              expanded === item.path ? (mobile ? 'mobile-submenu' : 'mega-menu') : undefined
            "
            @click="expanded = expanded === item.path ? '' : item.path"
          >
            <ChevronDown :size="14" />
          </button>
          <ul
            v-if="mobile && item.items && expanded === item.path"
            id="mobile-submenu"
            class="mobile-submenu"
          >
            <li v-for="link in item.items" :key="link.path">
              <RouterLink :to="link.path" @click="close()">{{ link.title }}</RouterLink>
            </li>
          </ul>
          <div v-if="item.items && !mobile && expanded === item.path" id="mega-menu" class="mega">
            <div>
              <RouterLink class="mega-title" :to="item.path">{{ item.title }}</RouterLink>
              <ul>
                <li v-for="link in item.items" :key="link.path">
                  <RouterLink :to="link.path" @click="close()">{{ link.title }}</RouterLink>
                </li>
              </ul>
            </div>
            <EditorialImage v-if="item.image" :image="item.image" />
          </div>
        </div>
        <RouterLink @click="close()" class="mobile-only" to="/profesionales"
          >Profesionales</RouterLink
        >
        <RouterLink @click="close()" class="mobile-only" to="/favoritos">Favoritos</RouterLink>
        <RouterLink @click="close()" class="mobile-only" to="/cuenta">Mi cuenta</RouterLink>
      </nav>
      <div class="header-actions">
        <RouterLink
          v-for="action in actions"
          :key="action.path"
          :to="action.path"
          class="icon"
          :class="{ 'desktop-only': action.path === '/favoritos' || action.path === '/cuenta' }"
          :aria-label="action.title"
          ><component :is="action.icon" :size="19"
        /></RouterLink>
      </div>
    </div>
  </header>
</template>
