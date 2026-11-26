<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import { collections, conceptProducts, images, materials, spaces } from '../data'
import EditorialImage from '../components/EditorialImage.vue'
import EditorialSplit from '../components/EditorialSplit.vue'
import StoryCard from '../components/StoryCard.vue'
import ProductCard from '../components/ProductCard.vue'
const areas = [
  {
    title: 'Mobiliario',
    to: '/mobiliario',
    image: images.coffee,
    text: 'Mesas, escritorios y piezas para habitar cada día.',
  },
  {
    title: 'Decoración',
    to: '/decoracion',
    image: images.tray,
    text: 'Objetos cotidianos que dejan ver el trabajo de la madera.',
  },
  {
    title: 'Proyectos a medida',
    to: '/a-medida',
    image: images.desk,
    text: 'Mobiliario que parte de tu espacio y de cómo lo usas.',
  },
]
const samples = materials.filter((item) =>
  ['roble', 'resina', 'metal', 'acabados'].includes(item.id),
)
</script>
<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Mobiliario y objetos de autor</p>
      <h1>La naturaleza,<br />convertida<br />en <em>diseño.</em></h1>
      <p class="hero-description">
        Mobiliario y objetos que nacen de materiales naturales. Piezas con carácter propio, pensadas
        para transformar tus espacios.
      </p>
      <div class="hero-links">
        <RouterLink class="button" to="/colecciones">Descubrir colecciones</RouterLink
        ><RouterLink class="text-link" to="/mobiliario">Explorar mobiliario</RouterLink>
      </div>
    </div>
    <EditorialImage class="hero-image" :image="images.hero" priority caption />
  </section>
  <div class="hero-note">
    <span>Madera natural · Diseño contemporáneo</span
    ><a href="#universo">Explorar <ArrowDown :size="14" /></a>
  </div>

  <section id="universo" class="wrap section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">El universo Naturea</p>
        <h2>Diseño para vivir.</h2>
      </div>
      <p>Desde los objetos que usas a diario hasta la mesa que reúne a todos.</p>
    </div>
    <div class="grid three areas">
      <StoryCard v-for="area in areas" :key="area.to" v-bind="area" />
    </div>
  </section>

  <section class="collection-band">
    <div class="wrap section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Colecciones</p>
          <h2>
            Cuatro formas de<br />
            entender la madera.
          </h2>
        </div>
        <RouterLink class="text-link" to="/colecciones">Ver colecciones</RouterLink>
      </div>
      <div class="grid collection-grid">
        <StoryCard
          v-for="item in collections"
          :key="item.id"
          :title="item.name"
          :to="'/colecciones/' + item.slug"
          :image="item.image"
          :text="item.description"
        />
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Catálogo conceptual</p>
        <h2>Piezas destacadas.</h2>
      </div>
      <RouterLink class="text-link" to="/productos">Explorar el catálogo</RouterLink>
    </div>
    <div class="grid products-grid">
      <ProductCard
        v-for="product in conceptProducts.slice(0, 6)"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>

  <EditorialSplit
    title="Cada veta cuenta una historia."
    label="La madera"
    :image="images.grain"
    tone="sand"
  >
    <p>
      El roble recoge la luz, el nogal aporta profundidad y el olivo traza líneas sinuosas. El corte
      de la tabla y los nudos cambian el dibujo de una pieza a otra, aunque compartan forma y
      medidas.
    </p>
    <RouterLink class="text-link" to="/materiales">Conocer las maderas</RouterLink>
  </EditorialSplit>

  <section class="wrap section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Texturas y acabados</p>
        <h2>
          Materiales que definen<br />
          nuestras piezas.
        </h2>
      </div>
      <RouterLink class="text-link" to="/materiales">Ver materiales</RouterLink>
    </div>
    <div class="grid four samples">
      <RouterLink
        v-for="item in samples"
        :key="item.id"
        :to="{ path: '/materiales', hash: '#' + item.id }"
      >
        <EditorialImage v-if="item.image" :image="item.image" /><span
          v-else
          class="sample-color"
          :style="{ backgroundColor: item.color }"
          role="img"
          aria-label="Muestra de color de acero negro mate"
        ></span>
        <h3>{{ item.id === 'roble' ? 'Madera' : item.name }}</h3>
        <p>{{ item.description }}</p>
      </RouterLink>
    </div>
  </section>

  <section class="wrap section spaces">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Inspiración</p>
        <h2>La madera en casa.</h2>
      </div>
      <p>Tres ambientes conceptuales para imaginar la madera en tu espacio.</p>
    </div>
    <div class="grid three">
      <StoryCard
        v-for="item in spaces"
        :key="item.id"
        :title="item.name"
        :to="'/inspiracion/' + item.slug"
        :image="item.image"
        :text="item.description"
      />
    </div>
  </section>

  <EditorialSplit
    title="No hay dos piezas iguales."
    label="Piezas únicas"
    :image="images.olive"
    tone="green"
    reverse
  >
    <p>
      Un borde vivo, un cambio de tono o una veta irrepetible pueden definir una pieza entera. La
      futura galería reunirá esas piezas con sus propias fotografías, medidas y acabados.
    </p>
    <RouterLink class="text-link" to="/piezas-unicas">Descubrir piezas únicas</RouterLink>
  </EditorialSplit>
  <EditorialSplit
    title="Tu espacio. Tu pieza."
    label="Proyectos a medida"
    :image="images.hero"
    tone="sand"
  >
    <p>
      Empieza por unas medidas, una forma o una madera. A partir de ahí podemos explorar tableros,
      resinas, estructuras y acabados según lo que permita el proyecto.
    </p>
    <div class="hero-links">
      <RouterLink class="button" to="/a-medida">Explorar proyectos a medida</RouterLink
      ><RouterLink class="text-link" to="/solicitar-presupuesto">Preparar una solicitud</RouterLink>
    </div>
  </EditorialSplit>
  <EditorialSplit
    title="Del dibujo a la madera."
    label="El estudio"
    :image="images.workshop"
    reverse
  >
    <p>
      Naturea Studio nace para desarrollar mobiliario propio a partir de la madera. La selección de
      la tabla, las proporciones y el acabado forman parte de un diseño que se prueba y se ajusta
      antes de fabricar.
    </p>
    <RouterLink class="text-link" to="/el-estudio">Conocer el estudio</RouterLink>
  </EditorialSplit>

  <section class="professional">
    <div class="wrap section section-heading">
      <div>
        <p class="eyebrow">Para profesionales</p>
        <h2>Diseñar en colaboración.</h2>
      </div>
      <div>
        <p>
          Mobiliario a medida, selección de materiales y presupuestos por proyecto para
          interioristas, arquitectos y hostelería.
        </p>
        <RouterLink class="text-link" to="/profesionales">Naturea para profesionales</RouterLink>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Journal</p>
        <h2>Cuaderno de estudio.</h2>
      </div>
      <RouterLink class="text-link" to="/journal">Descubrir el Journal</RouterLink>
    </div>
    <div class="grid two">
      <StoryCard
        title="Materiales y procesos"
        :image="images.workshop"
        to="/journal#materiales"
        text="Ideas sobre vetas, acabados y trabajo en madera."
      /><StoryCard
        title="Habitar la madera"
        :image="images.dining"
        to="/inspiracion"
        text="Composiciones para imaginar una pieza en su entorno."
      />
    </div>
  </section>
  <section class="newsletter">
    <p class="eyebrow">Newsletter</p>
    <h2>Un espacio para la inspiración.</h2>
    <p>Próximamente podrás recibir novedades sobre colecciones, materiales y piezas especiales.</p>
  </section>
</template>
