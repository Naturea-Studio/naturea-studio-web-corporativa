import type {
  Product,
  ProductCategory,
  ProductCollection,
  ProductImage,
  Material,
  InspirationSpace,
  JournalArticle,
} from './types'
export const visual = (key: string, alt: string): ProductImage => ({ key, alt, conceptual: true })
export const images = {
  river: visual('river', 'Mesa de centro ovalada de nogal con una veta de resina negra'),
  walnut: visual('walnut', 'Veta natural de nogal'),
  steel: visual('steel', 'Estructura de acero negro mate'),
  finish: visual('finish', 'Aplicación de aceite en una tabla de roble'),
  ash: visual('ash', 'Veta clara de una muestra de fresno'),
  hero: visual('hero', 'Mesa ovalada de nogal en un comedor mediterráneo'),
  side: visual('side', 'Mesa auxiliar de roble con base escultórica'),
  tray: visual('tray', 'Bandeja ovalada labrada en nogal'),
  clock: visual('clock', 'Reloj circular de madera de olivo'),
  coffee: visual('coffee', 'Mesa de centro de nogal en un salón luminoso'),
  valet: visual('valet', 'Organizador de nogal con llave y teléfono'),
  shelf: visual('shelf', 'Estante flotante de roble'),
  resin: visual('resin', 'Resina negra mate entre dos vetas de nogal'),
  olive: visual('olive', 'Detalle de un borde natural de olivo'),
  grain: visual('grain', 'Veta de roble iluminada de lado'),
  workshop: visual('workshop', 'Manos lijando una tabla de madera'),
  dining: visual('dining', 'Mesa de roble en un comedor de inspiración japandi'),
  desk: visual('desk', 'Escritorio de nogal junto a una ventana'),
}
export const collections: ProductCollection[] = [
  {
    id: 'essence',
    slug: 'essence',
    name: 'Essence',
    description: 'Roble claro, líneas serenas y la calidez de lo esencial.',
    image: images.dining,
  },
  {
    id: 'river',
    slug: 'river',
    name: 'River',
    description: 'La resina dibuja un cauce entre las vetas de la madera.',
    image: images.river,
  },
  {
    id: 'organic',
    slug: 'organic',
    name: 'Organic',
    description: 'Bordes vivos y formas que siguen el gesto del árbol.',
    image: images.olive,
  },
  {
    id: 'signature',
    slug: 'signature',
    name: 'Signature',
    description: 'Piezas de estudio con una selección singular de formas y materiales.',
    image: images.desk,
  },
]
const furniture = [
  'Mesas de comedor',
  'Mesas de centro',
  'Mesas auxiliares',
  'Mesas nido',
  'Mesitas de noche',
  'Escritorios',
  'Consolas',
  'Estanterías',
  'Bancos',
]
const decor = [
  'Bandejas',
  'Relojes',
  'Organizadores',
  'Cuadros',
  'Sujetalibros',
  'Espejos',
  'Iluminación',
  'Objetos decorativos',
]
export const normalize = (s: string) =>
  s
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
const categoriesFor = (names: string[], section: ProductCategory['section']): ProductCategory[] =>
  names.map((name) => {
    const slug = normalize(name).replaceAll(' ', '-')
    return { id: slug, slug, name, section, description: '' }
  })
export const categories = [
  ...categoriesFor(furniture, 'mobiliario'),
  ...categoriesFor(decor, 'decoracion'),
]
const concept = (
  slug: string,
  name: string,
  description: string,
  category: string,
  collection: string,
  material: string,
  image: ProductImage,
  euros?: number,
): Product => ({
  id: slug,
  slug,
  name,
  description,
  category,
  collection,
  materialIds: [material],
  image,
  availability: 'concepto',
  publicStatus: 'Concepto en desarrollo',
  manufacturing: euros ? 'serie' : 'personalizado',
  ...(euros ? { price: { currency: 'EUR', subtotalCents: euros * 100, estimate: true } } : {}),
})
export const conceptProducts = [
  concept(
    'mesa-auxiliar',
    'Mesa auxiliar',
    'Una silueta redonda sobre una base de roble con un perfil escultórico.',
    'mesas-auxiliares',
    'essence',
    'roble',
    images.side,
    199,
  ),
  concept(
    'bandeja-decorativa',
    'Bandeja decorativa',
    'Nogal tallado con un perímetro orgánico para reunir pequeños objetos.',
    'bandejas',
    'organic',
    'nogal',
    images.tray,
    99,
  ),
  concept(
    'reloj-de-pared',
    'Reloj de pared',
    'Una esfera de olivo que deja la veta a la vista.',
    'relojes',
    'organic',
    'olivo',
    images.clock,
    99,
  ),
  concept(
    'mesa-de-centro',
    'Mesa de centro',
    'Un tablero bajo de nogal con contorno irregular.',
    'mesas-de-centro',
    'organic',
    'nogal',
    images.coffee,
    399,
  ),
  concept(
    'organizador-personal',
    'Organizador personal',
    'Compartimentos de nogal para el teléfono, las llaves y los objetos de bolsillo.',
    'organizadores',
    'signature',
    'nogal',
    images.valet,
    59,
  ),
  concept(
    'estanteria-flotante',
    'Estantería flotante',
    'Una repisa de roble de líneas limpias para dar espacio a los objetos de cada día.',
    'estanterias',
    'essence',
    'roble',
    images.shelf,
    89,
  ),
  concept(
    'mesa-de-comedor',
    'Mesa de comedor',
    'Una mesa de nogal de proporciones generosas, pensada para explorar medidas a pedido.',
    'mesas-de-comedor',
    'signature',
    'nogal',
    images.hero,
  ),
  concept(
    'escritorio',
    'Escritorio',
    'Nogal, líneas horizontales y almacenaje integrado como punto de partida.',
    'escritorios',
    'signature',
    'nogal',
    images.desk,
  ),
]
conceptProducts.push({
  ...concept(
    'mesa-de-centro-river',
    'Mesa de centro River',
    'Un tablero ovalado de nogal atravesado por un cauce estrecho de resina negra mate.',
    'mesas-de-centro',
    'river',
    'nogal',
    images.river,
  ),
  manufacturing: 'serie',
  materialIds: ['nogal', 'resina'],
})
export const materials: Material[] = [
  {
    id: 'roble',
    slug: 'roble',
    name: 'Roble',
    kind: 'madera',
    description: 'Tonos dorados y una veta que cambia con la luz.',
    image: images.grain,
    color: '#ac8158',
    finishIds: ['mate', 'aceite'],
  },
  {
    id: 'nogal',
    slug: 'nogal',
    name: 'Nogal',
    kind: 'madera',
    description: 'Marrones profundos y contraste entre vetas.',
    image: images.walnut,
    color: '#64412b',
    finishIds: ['mate', 'satinado'],
  },
  {
    id: 'olivo',
    slug: 'olivo',
    name: 'Olivo',
    kind: 'madera',
    description: 'Vetas sinuosas y contrastes entre tonos claros y oscuros.',
    image: images.olive,
    color: '#a07a46',
  },
  {
    id: 'fresno',
    slug: 'fresno',
    name: 'Fresno',
    kind: 'madera',
    description: 'Madera clara de dibujo marcado.',
    image: images.ash,
    color: '#d1b489',
  },
  {
    id: 'resina',
    slug: 'resina',
    name: 'Resina epoxi',
    kind: 'resina',
    description:
      'Negra, transparente o ahumada según la composición. También exploramos oliva, blanco, arena y ámbar.',
    image: images.resin,
    color: '#393632',
  },
  {
    id: 'metal',
    slug: 'metal',
    name: 'Acero',
    kind: 'metal',
    description: 'Estructuras discretas en negro mate y otros acabados por estudiar.',
    image: images.steel,
    color: '#454440',
  },
  {
    id: 'acabados',
    slug: 'acabados',
    name: 'Acabados',
    kind: 'acabado',
    description: 'Aceite natural, mate, satinado o barnizado según la pieza.',
    image: images.finish,
    color: '#b8936d',
  },
]
export const spaces: InspirationSpace[] = [
  {
    id: 'salon',
    slug: 'salon',
    name: 'Salón',
    description: 'Madera oscura, lino y luz de tarde.',
    image: images.coffee,
  },
  {
    id: 'comedor',
    slug: 'comedor',
    name: 'Comedor',
    description: 'Roble claro y espacio para reunirse.',
    image: images.dining,
  },
  {
    id: 'despacho',
    slug: 'despacho',
    name: 'Despacho',
    description: 'Nogal y pared mineral para un espacio de trabajo sereno.',
    image: images.desk,
  },
]
export const journal: JournalArticle[] = [
  {
    id: 'leer-la-veta',
    slug: 'leer-la-veta',
    name: 'Cómo leer la veta de la madera',
    description: 'El dibujo de una tabla cambia según el árbol y la forma de cortarla.',
    image: images.grain,
    author: 'Naturea Studio',
    date: '2026-11-26',
    category: 'Materiales',
    body: [
      'Antes de decidir la forma de una pieza observamos el dibujo de la tabla. Una veta recta puede acompañar una línea larga, mientras que un remolino pide más superficie para poder apreciarse.',
      'El roble suele mostrar contrastes dorados. El nogal reúne tonos profundos y el olivo dibuja líneas sinuosas. Incluso dentro de una misma especie, cada tabla tiene su propio ritmo.',
    ],
  },
  {
    id: 'pensar-una-mesa',
    slug: 'pensar-una-mesa',
    name: 'Pensar una mesa desde el espacio',
    description: 'Proporción, circulación y luz antes de decidir el tablero.',
    image: images.dining,
    author: 'Naturea Studio',
    date: '2026-11-26',
    category: 'Diseño',
    body: [
      'Antes de dibujar la mesa conviene observar cómo se usa la habitación: por dónde se entra, hacia dónde se mueven las sillas y cómo cambia la luz.',
      'Con esas referencias exploramos la forma y las dimensiones. Un tablero ovalado suaviza el paso y una base central puede liberar espacio en los extremos. La elección depende del uso y del lugar.',
    ],
  },
]
export const priceLabel = (value: number, currency: string) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value / 100)
