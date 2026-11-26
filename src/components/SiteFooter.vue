<script setup lang="ts">
const groups = [
  {
    title: 'Naturea Studio',
    links: [
      ['El estudio', 'el-estudio'],
      ['Nuestra filosofía', 'nuestra-filosofia'],
      ['Materiales', 'materiales'],
      ['Diseño y fabricación', 'diseno-y-fabricacion'],
      ['Contacto', 'contacto'],
    ],
  },
  {
    title: 'Descubrir',
    links: [
      ['Colecciones', 'colecciones'],
      ['Mobiliario', 'mobiliario'],
      ['Decoración', 'decoracion'],
      ['Piezas únicas', 'piezas-unicas'],
      ['Inspiración', 'inspiracion'],
      ['Journal', 'journal'],
    ],
  },
  {
    title: 'Profesionales',
    links: [
      ['Interioristas', 'profesionales/interioristas'],
      ['Arquitectos', 'profesionales/arquitectos'],
      ['Hostelería', 'profesionales/hosteleria'],
      ['Proyectos a medida', 'a-medida'],
      ['Solicitar presupuesto', 'solicitar-presupuesto'],
    ],
  },
  {
    title: 'Atención al cliente',
    links: [
      ['Preguntas frecuentes', 'preguntas-frecuentes'],
      ['Envíos', 'envios'],
      ['Devoluciones', 'devoluciones'],
      ['Cuidados y mantenimiento', 'cuidados'],
      ['Seguimiento de pedidos', 'cuenta/pedidos'],
    ],
  },
]
const legal = [
  ['Aviso legal', 'aviso-legal'],
  ['Privacidad', 'privacidad'],
  ['Cookies', 'cookies'],
  ['Condiciones de compra', 'condiciones'],
]
</script>
<template>
  <footer class="footer">
    <div class="wrap footer-top">
      <div class="footer-brand">
        <RouterLink class="wordmark" to="/" aria-label="Naturea Studio, inicio"
          >naturea<span>STUDIO</span></RouterLink
        >
        <p>Mobiliario y objetos de madera natural.</p>
        <p class="social-pending">Instagram y Pinterest · Próximamente</p>
      </div>
      <nav v-for="group in groups" :key="group.title" :aria-label="group.title">
        <h2>{{ group.title }}</h2>
        <RouterLink v-for="[label, path] in group.links" :key="path" :to="'/' + path">{{
          label
        }}</RouterLink>
      </nav>
    </div>
    <div class="wrap footer-bottom">
      <span>© {{ new Date().getFullYear() }} Naturea Studio</span>
      <nav aria-label="Información legal">
        <RouterLink v-for="[label, path] in legal" :key="path" :to="'/legal/' + path">{{
          label
        }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>
