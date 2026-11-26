<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { categories, collections, conceptProducts, materials, normalize } from '../data'
import { useFavorites } from '../stores'
import ProductCard from '../components/ProductCard.vue'
const route = useRoute()
const router = useRouter()
const favorites = useFavorites()
const section = computed(() => route.path.split('/')[1])
const category = computed(() =>
  categories.find(
    (item) => item.section === section.value && route.path === '/' + item.section + '/' + item.slug,
  ),
)
const shop = computed(() => section.value !== 'favoritos')
const tabPaths = [
  ['Todos', '/productos'],
  ['Mobiliario', '/mobiliario'],
  ['Decoración', '/decoracion'],
]
const filtersOpen = ref(!window.matchMedia('(max-width: 849px)').matches)
const query = (key: string) =>
  typeof route.query[key] === 'string' ? (route.query[key] as string) : ''
const groups = computed(() =>
  categories.filter(
    (item) =>
      section.value === 'productos' || section.value === 'buscar' || item.section === section.value,
  ),
)
const scope = computed(() =>
  conceptProducts.filter((item) =>
    section.value === 'favoritos'
      ? favorites.ids.includes(item.id)
      : category.value
        ? item.category === category.value.id
        : groups.value.some((entry) => entry.id === item.category),
  ),
)
const manufacturing = [
  { id: 'serie', name: 'Pequeña serie' },
  { id: 'personalizado', name: 'Proyecto personalizado' },
]
const priceRanges = [
  { id: 'hasta-100', name: 'Menos de 100 €' },
  { id: '100-300', name: '100 a 300 €' },
  { id: 'mas-300', name: 'Más de 300 €' },
  { id: 'sin-precio', name: 'Sin precio definido' },
]
const definitions = computed(() => [
  ...(!category.value
    ? [
        {
          key: 'categoria',
          label: 'Categoría',
          options: groups.value.filter((item) =>
            scope.value.some((product) => product.category === item.id),
          ),
        },
      ]
    : []),
  {
    key: 'coleccion',
    label: 'Colección',
    options: collections.filter((item) =>
      scope.value.some((product) => product.collection === item.id),
    ),
  },
  {
    key: 'material',
    label: 'Material',
    options: materials.filter((item) =>
      scope.value.some((product) => product.materialIds.includes(item.id)),
    ),
  },
  { key: 'fabricacion', label: 'Fabricación prevista', options: manufacturing },
  { key: 'precio', label: 'Precio orientativo', options: priceRanges },
])
const active = computed(() =>
  definitions.value.flatMap((group) => {
    const option = group.options.find((item) => item.id === query(group.key))
    return option ? [{ key: group.key, name: option.name }] : []
  }),
)
function set(key: string, value: string) {
  void router.replace({ query: { ...route.query, [key]: value || undefined } })
}
function onChange(key: string, event: Event) {
  set(key, (event.target as HTMLInputElement).value)
}
function clear() {
  const next = { ...route.query }
  for (const { key } of active.value) delete next[key]
  void router.replace({ query: next })
}
function priceRange(cents?: number) {
  if (cents === undefined) return 'sin-precio'
  if (cents < 10000) return 'hasta-100'
  return cents <= 30000 ? '100-300' : 'mas-300'
}
const results = computed(() => {
  const words = normalize(query('q')).trim().split(/\s+/).filter(Boolean)
  const rows = scope.value.filter((item) => {
    const fields: Record<string, string[]> = {
      categoria: [item.category],
      coleccion: [item.collection],
      material: item.materialIds,
      fabricacion: [item.manufacturing],
      precio: [priceRange(item.price?.subtotalCents)],
    }
    const searchable = normalize(
      [
        item.name,
        item.description,
        categories.find((category) => category.id === item.category)?.name,
        collections.find((collection) => collection.id === item.collection)?.name,
        ...materials
          .filter((material) => item.materialIds.includes(material.id))
          .map((material) => material.name),
      ].join(' '),
    )
    return (
      active.value.every(({ key }) => fields[key].includes(query(key))) &&
      words.every((word) => searchable.includes(word))
    )
  })
  const order = query('orden')
  if (order === 'asc' || order === 'desc')
    rows.sort((a, b) => {
      if (!a.price) return b.price ? 1 : 0
      if (!b.price) return -1
      return (a.price.subtotalCents - b.price.subtotalCents) * (order === 'asc' ? 1 : -1)
    })
  if (order === 'nombre') rows.sort((a, b) => a.name.localeCompare(b.name, 'es'))
  return rows
})
</script>
<template>
  <div class="wrap inner-page catalog-page">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <RouterLink to="/">Inicio</RouterLink><span aria-hidden="true">/</span
      ><template v-if="category"
        ><RouterLink :to="'/' + category.section">{{
          category.section === 'mobiliario' ? 'Mobiliario' : 'Decoración'
        }}</RouterLink
        ><span aria-hidden="true">/</span></template
      ><span aria-current="page">{{ route.meta.title }}</span>
    </nav>
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">{{ shop ? 'Catálogo conceptual' : 'Tu selección' }}</p>
        <h1>{{ route.meta.title }}</h1>
      </div>
      <p v-if="shop">
        Estudios de mobiliario y objetos en madera. Las imágenes muestran propuestas de diseño y los
        importes son orientativos.
      </p>
      <p v-else>Las piezas que guardas quedan en este navegador para que puedas volver a ellas.</p>
    </header>
    <nav v-if="shop" class="catalog-tabs" aria-label="Secciones del catálogo">
      <RouterLink
        v-for="[name, path] in tabPaths"
        :key="path"
        :to="path"
        :class="{ selected: route.path === path || (category && path === '/' + category.section) }"
        >{{ name }}</RouterLink><RouterLink to="/colecciones">Colecciones</RouterLink>
    </nav>
    <div v-if="shop" class="catalog-controls">
      <label class="search-label"
        >Buscar piezas<span
          ><Search :size="18" /><input
            type="search"
            placeholder="Por ejemplo, mesa de nogal"
            :value="query('q')"
            @input="onChange('q', $event)" /></span
      ></label>
      <label class="catalog-order"
        >Orden<select :value="query('orden')" @change="onChange('orden', $event)">
          <option value="">Relevancia</option>
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
          <option value="nombre">Nombre, A–Z</option>
        </select></label
      >
      <button
        class="catalog-filter-button"
        type="button"
        aria-controls="catalog-filters"
        :aria-expanded="filtersOpen"
        @click="filtersOpen = !filtersOpen"
      >
        <SlidersHorizontal :size="17" />{{ filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'
        }}<span v-if="active.length">({{ active.length }})</span>
      </button>
    </div>
    <div v-if="shop" v-show="filtersOpen" id="catalog-filters" class="filters catalog-filters">
      <label v-for="group in definitions" :key="group.key"
        >{{ group.label
        }}<select
          :value="
            group.options.some((item) => item.id === query(group.key)) ? query(group.key) : ''
          "
          @change="onChange(group.key, $event)"
        >
          <option value="">Cualquiera</option>
          <option v-for="option in group.options" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select></label
      >
    </div>
    <div class="catalog-summary">
      <p role="status">
        {{ results.length }} {{ results.length === 1 ? 'concepto' : 'conceptos' }}
      </p>
      <div v-if="active.length && shop" class="catalog-chips">
        <button
          v-for="filter in active"
          :key="filter.key"
          type="button"
          :aria-label="'Quitar filtro ' + filter.name"
          @click="set(filter.key, '')"
        >
          {{ filter.name }}<X :size="13" /></button
        ><button class="text-link" type="button" @click="clear">Limpiar filtros</button>
      </div>
    </div>
    <div v-if="results.length" class="grid products-grid">
      <ProductCard v-for="item in results" :key="item.id" :product="item" />
    </div>
    <div v-else class="catalog-empty">
      <h2>
        {{
          !shop
            ? 'Aún no tienes favoritos.'
            : !scope.length
              ? 'Esta categoría está en desarrollo.'
              : 'Ningún concepto coincide.'
        }}
      </h2>
      <p>
        {{
          !shop
            ? 'Guarda las piezas que quieras volver a consultar.'
            : !scope.length
              ? 'Explora las piezas que ya tienen un estudio visual.'
              : 'Prueba con otra búsqueda o quita algún filtro.'
        }}
      </p>
      <button
        v-if="shop && (active.length || query('q'))"
        class="text-link"
        type="button"
        @click="router.replace({ query: {} })"
      >
        Reiniciar búsqueda y filtros
      </button>
      <RouterLink v-else class="text-link" to="/productos">Ver todo el catálogo</RouterLink>
    </div>
  </div>
</template>
