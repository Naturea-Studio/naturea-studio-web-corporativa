<script setup lang="ts">
import { computed, ref } from 'vue'
import { images } from '../data'
import EditorialImage from '../components/EditorialImage.vue'
const locale = ref<'en' | 'fr'>('en')
const content = {
  en: {
    title: 'Nature shaped into design.',
    intro:
      'Naturea Studio explores wooden furniture and objects, from small everyday pieces to tables designed around a room.',
    catalog: 'Explore the catalogue in Spanish',
    collection: 'Discover the collections in Spanish',
    custom: 'Explore made-to-measure projects in Spanish',
    market: 'Market information',
    note: 'This is a design preview. The catalogue shows concepts and indicative euro prices for Spain. International sales and delivery remain under study.',
  },
  fr: {
    title: 'La nature prend forme.',
    intro:
      'Naturea Studio explore le mobilier et les objets en bois, des petites pièces du quotidien aux tables pensées pour un espace.',
    catalog: 'Explorer le catalogue en espagnol',
    collection: 'Découvrir les collections en espagnol',
    custom: 'Explorer les projets sur mesure en espagnol',
    market: 'Informations sur les marchés',
    note: 'Ce site présente des concepts et des prix indicatifs en euros pour l’Espagne. La vente et la livraison à l’international sont à l’étude.',
  },
}
const copy = computed(() => content[locale.value])
</script>
<template>
  <div class="wrap inner-page">
    <nav class="catalog-tabs" aria-label="Idioma de la presentación">
      <button
        class="text-link"
        type="button"
        lang="en"
        :aria-pressed="locale === 'en'"
        @click="locale = 'en'"
      >
        English</button
      ><button
        class="text-link"
        type="button"
        lang="fr"
        :aria-pressed="locale === 'fr'"
        @click="locale = 'fr'"
      >
        Français</button
      ><RouterLink to="/">Español</RouterLink>
    </nav>
    <div :lang="locale">
      <div class="feature-columns">
        <EditorialImage
          class="feature-image"
          :image="{
            ...images.hero,
            alt:
              locale === 'fr'
                ? 'Table ovale en noyer dans une salle à manger méditerranéenne'
                : 'Oval walnut table in a Mediterranean dining room',
          }"
          priority
        />
        <div class="detail-copy">
          <p class="eyebrow">Naturea Studio</p>
          <h1>{{ copy.title }}</h1>
          <p>{{ copy.intro }}</p>
          <div class="page-links">
            <RouterLink class="text-link" to="/productos">{{ copy.catalog }}</RouterLink
            ><RouterLink class="text-link" to="/colecciones">{{ copy.collection }}</RouterLink
            ><RouterLink class="text-link" to="/a-medida">{{ copy.custom }}</RouterLink>
          </div>
        </div>
      </div>
      <section class="feature-panel">
        <h2>{{ copy.market }}</h2>
        <p>{{ copy.note }}</p>
      </section>
    </div>
  </div>
</template>
