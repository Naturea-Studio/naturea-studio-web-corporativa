import { images, materials, conceptProducts, collections } from '../data'
import type { ProductImage, Product } from '../types'

type ProductStudy = {
  intent: string
  pending: string
  details: [string, string][]
  detailImage?: ProductImage
}
export const studies: Partial<Record<string, ProductStudy>> = {
  'mesa-auxiliar': {
    intent:
      'La base concentra el peso visual y deja libre el borde del tablero. La escala está pensada para acompañar un sofá o un sillón.',
    pending: 'Diámetro, altura, estabilidad y acabado superficial.',
    details: [
      ['Forma', 'Tablero redondo'],
      ['Base', 'Roble de perfil escultórico'],
    ],
    detailImage: images.grain,
  },
  'bandeja-decorativa': {
    intent:
      'El borde tallado sigue un contorno irregular. El interior recoge objetos pequeños en un recibidor o una cómoda.',
    pending: 'Dimensiones, acabado y cuidados para uso decorativo.',
    details: [
      ['Forma', 'Óvalo orgánico'],
      ['Uso previsto', 'Organización de objetos pequeños'],
    ],
    detailImage: images.walnut,
  },
  'reloj-de-pared': {
    intent: 'La esfera mantiene la veta a la vista y dos agujas oscuras marcan la lectura.',
    pending: 'Diámetro, mecanismo y sistema de instalación.',
    details: [
      ['Forma', 'Esfera circular'],
      ['Contraste', 'Agujas oscuras sobre olivo'],
    ],
    detailImage: images.olive,
  },
  'mesa-de-centro': {
    intent: 'Un tablero bajo de nogal con un contorno libre para acompañar una zona de estar.',
    pending: 'Proporciones, resistencia de la superficie y estabilidad.',
    details: [
      ['Forma', 'Orgánica'],
      ['Estructura de estudio', 'Apoyos bajos de madera'],
    ],
    detailImage: images.walnut,
  },
  'organizador-personal': {
    intent:
      'Un vaciado central da sitio al teléfono y los compartimentos bajos mantienen llaves y accesorios a la vista.',
    pending: 'Medidas interiores y compatibilidad con distintos tamaños de teléfono.',
    details: [
      ['Formato', 'Rectangular'],
      ['Distribución', 'Compartimentos de distinta profundidad'],
    ],
    detailImage: images.walnut,
  },
  'estanteria-flotante': {
    intent: 'Un plano fino de roble deja todo el protagonismo a los objetos que sostiene.',
    pending: 'Longitudes, requisitos de anclaje y carga admisible según el soporte.',
    details: [
      ['Formato', 'Repisa horizontal'],
      ['Instalación prevista', 'Mural'],
    ],
    detailImage: images.grain,
  },
  'mesa-de-comedor': {
    intent:
      'El tablero ovalado suaviza los recorridos. Dos apoyos de nogal permiten estudiar distintas configuraciones de asiento.',
    pending: 'Medidas, separación de apoyos y viabilidad estructural para cada proyecto.',
    details: [
      ['Forma', 'Ovalada'],
      ['Estructura de estudio', 'Dos apoyos de nogal'],
    ],
    detailImage: images.walnut,
  },
  escritorio: {
    intent:
      'Dos módulos laterales enmarcan una superficie de trabajo amplia con almacenaje integrado.',
    pending: 'Dimensiones, guías de cajón y paso de cables.',
    details: [
      ['Forma', 'Rectangular'],
      ['Almacenaje previsto', 'Cajones laterales'],
    ],
    detailImage: images.walnut,
  },
  'mesa-de-centro-river': {
    intent:
      'Una línea negra estrecha une dos bordes de nogal y sigue el dibujo natural del tablero.',
    pending: 'Geometría del encuentro, proporciones, acabado y comportamiento de la unión.',
    details: [
      ['Forma', 'Ovalada'],
      ['Composición', 'Nogal con resina negra mate'],
    ],
    detailImage: images.resin,
  },
}
export const collectionStories = [
  {
    id: 'essence',
    line: 'La expresión más serena de la madera',
    text: 'Superficies claras, contornos sencillos y una veta visible incluso a distancia. Essence reúne conceptos que dan espacio a la luz y a los objetos cotidianos.',
    materialIds: ['roble', 'fresno'],
    image: images.grain,
    tone: 'essence',
  },
  {
    id: 'river',
    line: 'Una línea entre dos vetas',
    text: 'El cauce sigue el encuentro entre dos tablas. La colección explora la resina como un detalle de unión, con variaciones de profundidad y contraste.',
    materialIds: ['nogal', 'resina'],
    image: images.resin,
    tone: 'river',
  },
  {
    id: 'organic',
    line: 'Formas que conserva el árbol',
    text: 'Una curva de la tabla puede dictar todo el contorno. Organic recoge esa libertad en objetos pequeños y mesas de perfil irregular.',
    materialIds: ['olivo', 'nogal'],
    image: images.olive,
    tone: 'organic',
  },
  {
    id: 'signature',
    line: 'Diseños que parten de la pieza',
    text: 'Signature reúne propuestas que nacen de una selección singular de madera y proporciones. Las mesas y escritorios se plantean como un punto de partida para futuros encargos.',
    materialIds: ['nogal'],
    image: images.walnut,
    tone: 'signature',
  },
]
export function materialsFor(ids: string[]) {
  return ids.flatMap((id) => materials.find((material) => material.id === id) ?? [])
}
export function relatedProducts(product: Product) {
  return conceptProducts
    .filter((item) => item.id !== product.id)
    .map((item) => ({
      item,
      score:
        (item.category === product.category ? 4 : 0) +
        (item.collection === product.collection ? 3 : 0) +
        (item.materialIds.some((id) => product.materialIds.includes(id)) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item)
}
export const collectionEntries = collections.map((collection) => ({
  collection,
  story: collectionStories.find((item) => item.id === collection.id),
  count: conceptProducts.filter((item) => item.collection === collection.id).length,
}))
