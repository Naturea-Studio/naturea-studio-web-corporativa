<script setup lang="ts">
import { ArrowDown, ArrowUpRight } from 'lucide-vue-next'
import { collections, images } from '../data'
import EditorialImage from '../components/EditorialImage.vue'
import StoryCard from '../components/StoryCard.vue'
</script>

<template>
  <div class="studio-home">
    <section class="studio-hero">
      <picture class="studio-hero-media">
        <source media="(max-width: 680px)" srcset="/images/bandeja-haya-portada-mobile.webp" />
        <img
          src="/images/bandeja-haya-portada.webp"
          srcset="
            /images/bandeja-haya-portada-small.webp  768w,
            /images/bandeja-haya-portada.webp       1536w
          "
          sizes="100vw"
          width="1536"
          height="1024"
          fetchpriority="high"
          alt="Render de una bandeja de haya con una llave sobre un bloque de piedra"
        />
      </picture>
      <div class="studio-hero-copy">
        <p class="eyebrow">Naturea Studio · Objetos de madera</p>
        <h1>
          Al llegar,<br />
          <em>deja aquí el día.</em>
        </h1>
        <p>Una bandeja de haya para las llaves y los pequeños objetos que te acompañan al salir.</p>
        <RouterLink class="studio-cta" to="/productos/bandeja-decorativa"
          >Explorar la bandeja <ArrowUpRight :size="18" aria-hidden="true"
        /></RouterLink>
      </div>
      <div class="studio-hero-meta">
        <a href="#estudio-de-la-bandeja"
          >La forma y la veta <ArrowDown :size="16" aria-hidden="true" /></a
        ><span>Render conceptual</span>
      </div>
    </section>

    <section id="estudio-de-la-bandeja" class="studio-material">
      <div class="studio-frames">
        <EditorialImage :image="images.beechTray" />
        <EditorialImage :image="images.beech" class="studio-grain" />
      </div>
      <div class="studio-material-copy">
        <div>
          <p class="eyebrow">La bandeja de haya</p>
          <h2>La forma empieza en el borde.</h2>
          <p>
            El contorno tallado delimita un lugar para llaves, reloj o gafas. Un perfil bajo deja
            los objetos a mano.
          </p>
        </div>
        <div>
          <p class="eyebrow">La materia</p>
          <h2>De cerca, queda la veta.</h2>
          <p>
            El haya tiene una veta fina y un tono claro. Estamos estudiando cómo responde a
            distintos acabados y a la luz de un recibidor.
          </p>
          <RouterLink class="text-link" to="/productos/bandeja-decorativa"
            >Ver la pieza y sus acabados</RouterLink
          >
        </div>
      </div>
    </section>

    <section class="wrap section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Objetos y mobiliario</p>
          <h2>Cuatro maneras de trabajar la madera.</h2>
        </div>
        <RouterLink class="text-link" to="/colecciones">Ver colecciones</RouterLink>
      </div>
      <div class="grid four studio-collections">
        <StoryCard
          v-for="item in collections"
          :key="item.id"
          :title="item.name"
          :to="'/colecciones/' + item.slug"
          :image="item.image"
          :text="item.description"
        />
      </div>
    </section>

    <section class="studio-project">
      <EditorialImage :image="images.pineRiverDining" caption />
      <div>
        <p class="eyebrow">River · Mesas a medida</p>
        <h2>El río sigue el canto de la madera.</h2>
        <p>
          Dos o tres tablas de canto vivo forman el tablero. La resina rellena el espacio entre
          ellas y deja visible su contorno.
        </p>
        <div class="hero-links">
          <RouterLink class="text-link" to="/colecciones/river">Ver la colección River</RouterLink
          ><RouterLink class="text-link" to="/configurador">Explorar el configurador</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
