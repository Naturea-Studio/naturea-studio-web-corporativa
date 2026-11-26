import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import { categories, collections, conceptProducts, images, journal, spaces } from './data'
const catalog = () => import('./catalog/Catalog.vue')
const collectionView = () => import('./catalog/Collections.vue')
const productView = () => import('./catalog/ProductDetail.vue')
const catalogPages = ['productos', 'mobiliario', 'decoracion', 'buscar', 'favoritos']
const international = () => import('./features/International.vue')
const professional = () => import('./features/Professional.vue')
const account = () => import('./features/Account.vue')
const commerce = () => import('./features/Commerce.vue')
const commercePages = ['carrito', 'checkout', 'cuenta/pedidos', 'cuenta/facturas']
const piecesView = () => import('./features/Pieces.vue')
const configurator = () => import('./features/Configurator.vue')
const page = () => import('./views/Page.vue')
const directory = {
  colecciones: 'Colecciones',
  mobiliario: 'Mobiliario',
  decoracion: 'Decoración',
  productos: 'Catálogo',
  'piezas-unicas': 'Piezas únicas',
  'a-medida': 'Proyectos a medida',
  configurador: 'Configurador',
  'solicitar-presupuesto': 'Preparar una solicitud',
  inspiracion: 'Inspiración',
  internacional: 'Naturea Studio International',
  profesionales: 'Profesionales',
  'profesionales/mesa-de-trabajo': 'Mesa de trabajo',
  'profesionales/interioristas': 'Interioristas',
  'profesionales/arquitectos': 'Arquitectos',
  'profesionales/hosteleria': 'Hostelería',
  'el-estudio': 'El estudio',
  'nuestra-filosofia': 'Nuestra filosofía',
  materiales: 'Materiales',
  'diseno-y-fabricacion': 'Diseño y fabricación',
  contacto: 'Contacto',
  journal: 'Journal',
  ayuda: 'Ayuda',
  'preguntas-frecuentes': 'Preguntas frecuentes',
  envios: 'Envíos',
  devoluciones: 'Devoluciones',
  cuidados: 'Cuidados y mantenimiento',
  buscar: 'Buscar',
  favoritos: 'Favoritos',
  carrito: 'Carrito',
  checkout: 'Finalizar pedido',
  cuenta: 'Mi cuenta',
  'cuenta/recuperar': 'Recuperar contraseña',
  'cuenta/pedidos': 'Pedidos',
  'cuenta/facturas': 'Facturas',
  'cuenta/proyectos': 'Proyectos',
  'cuenta/presupuestos': 'Presupuestos',
  'legal/aviso-legal': 'Aviso legal',
  'legal/privacidad': 'Privacidad',
  'legal/cookies': 'Cookies',
  'legal/condiciones': 'Condiciones de compra',
}
const detailRoutes = [
  ...collections.map((item) => ({ ...item, path: '/colecciones/' + item.slug })),
  ...categories.map((item) => ({ ...item, path: '/' + item.section + '/' + item.slug })),
  ...conceptProducts.map((item) => ({ ...item, path: '/productos/' + item.slug })),
  ...spaces.map((item) => ({ ...item, path: '/inspiracion/' + item.slug })),
]
const indexPaths = [
  '/',
  '/el-estudio',
  '/nuestra-filosofia',
  '/materiales',
  '/colecciones',
  '/a-medida',
  '/inspiracion',
  '/profesionales',
]
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Mobiliario y objetos de madera',
        description:
          'Naturea Studio, estudio de mobiliario y objetos de madera natural. Descubre nuestras colecciones y proyectos a medida.',
        image: images.hero,
      },
    },
    ...Object.entries(directory).map(([slug, title]) => ({
      path: '/' + slug,
      component:
        slug === 'cuenta' || slug === 'cuenta/recuperar'
          ? account
          : slug === 'internacional'
            ? international
            : slug === 'profesionales' ||
                slug.startsWith('profesionales/') ||
                ['cuenta/proyectos', 'cuenta/presupuestos'].includes(slug)
              ? professional
              : commercePages.includes(slug)
                ? commerce
                : slug === 'piezas-unicas'
                  ? piecesView
                  : slug === 'configurador'
                    ? configurator
                    : slug === 'colecciones'
                      ? collectionView
                      : catalogPages.includes(slug)
                        ? catalog
                        : page,
      meta: { title },
    })),
    ...detailRoutes.map((item) => ({
      path: item.path,
      component: item.path.startsWith('/productos/')
        ? productView
        : item.path.startsWith('/colecciones/')
          ? collectionView
          : /^\/(mobiliario|decoracion)\//.test(item.path)
            ? catalog
            : page,
      props: item.path.startsWith('/productos/')
        ? { product: conceptProducts.find((product) => product.id === item.id) }
        : undefined,
      meta: {
        title: item.name,
        description: item.description,
        image: 'image' in item ? item.image : undefined,
      },
    })),
    ...(import.meta.env.DEV
      ? [
          {
            path: '/taller/operaciones',
            component: () => import('./features/Workshop.vue'),
            meta: { title: 'Operaciones de taller' },
          },
        ]
      : []),
    ...journal.map((item) => ({
      path: '/journal/' + item.slug,
      component: page,
      meta: { title: item.name, description: item.description, image: item.image },
    })),
    {
      path: '/piezas-unicas/:slug',
      component: piecesView,
      meta: {
        title: 'Pieza única',
        description: 'Estudios conceptuales de madera en Naturea Studio.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: page,
      meta: { title: 'Página no encontrada', notFound: true },
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      const target = document.getElementById(to.hash.slice(1))
      if (target) return { el: target, top: 95 }
      return { top: 0 }
    }
    if (to.path !== from.path) return { top: 0, behavior: 'instant' as const }
  },
})
function updateTag(key: 'name' | 'property' | 'rel', label: string, value: string) {
  const tag = key === 'rel' ? 'link' : 'meta'
  let element = document.head.querySelector(`${tag}[${key}="${label}"]`)
  if (!element) {
    element = document.createElement(tag)
    element.setAttribute(key, label)
    document.head.append(element)
  }
  element.setAttribute(tag === 'link' ? 'href' : 'content', value)
}
router.afterEach((to) => {
  const title =
    to.path === '/'
      ? 'Naturea Studio — Mobiliario y objetos de madera'
      : to.meta.title + ' | Naturea Studio'
  const description = String(
    to.meta.description ||
      to.meta.title + ' en Naturea Studio, mobiliario y objetos de madera natural.',
  )
  const origin = (import.meta.env.VITE_SITE_URL || 'https://natureastudio.com').replace(/\/$/, '')
  const url = origin + to.path
  document.title = title
  updateTag('name', 'description', description)
  updateTag(
    'name',
    'robots',
    import.meta.env.PROD &&
      import.meta.env.VITE_ALLOW_INDEXING === 'true' &&
      indexPaths.includes(to.path)
      ? 'index,follow'
      : 'noindex,follow',
  )
  updateTag('rel', 'canonical', url)
  updateTag('property', 'og:title', title)
  updateTag('property', 'og:description', description)
  updateTag('property', 'og:url', url)
  updateTag('property', 'og:type', 'website')
  updateTag('property', 'og:locale', 'es_ES')
  updateTag(
    'property',
    'og:image',
    origin +
      '/images/' +
      ((to.meta.image as typeof images.hero | undefined)?.key || 'hero') +
      '.webp',
  )
})
