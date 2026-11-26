import { images, materials, conceptProducts, collections } from '../data'
import type { ProductImage, Product } from '../types'

type ProductStudy = {
  intent: string
  pending: string
  details: [string, string][]
  detailImage?: ProductImage
}
export const studies: Partial<Record<string, ProductStudy>> = {
  'mesas-nido-de-roble': {
    intent: 'Dos mesas de roble de distinta altura que se pueden colocar juntas o separar.',
    pending:
      'Probar la holgura al encajar las mesas, la estabilidad de cada una y cómo se protegen juntas en el envío.',
    details: [],
  },
  'mesita-de-noche-de-roble': {
    intent: 'Un cajón con tirador integrado guarda lo que se quiere tener a mano junto a la cama.',
    pending:
      'Validar las guías del cajón, las tolerancias de la madera y la estabilidad con el cajón abierto.',
    details: [],
  },
  'banco-de-roble': {
    intent: 'Una tabla continua sobre dos apoyos para el recibidor.',
    pending: 'Ensayar uniones, estabilidad y resistencia antes de ofrecerlo como asiento.',
    details: [],
  },
  'cuadro-relieve-de-nogal': {
    intent: 'Un panel de nogal tallado en ondas que cambian de sombra con la luz.',
    pending:
      'Definir el sistema de fijación, el peso y la protección de los relieves para transporte.',
    details: [],
  },
  'espejo-con-marco-de-roble': {
    intent: 'Un marco de roble con esquinas redondeadas enmarca un espejo vertical.',
    pending: 'Validar la retención del cristal, la fijación mural y el embalaje contra impactos.',
    details: [],
  },
  'lampara-de-sobremesa-de-nogal': {
    intent: 'Una base de nogal de perfil curvo y una pantalla de lino como estudio de iluminación.',
    pending:
      'Seleccionar componentes y validar seguridad eléctrica y térmica del conjunto antes de ofrecerla.',
    details: [],
  },
  'escultura-de-nogal': {
    intent: 'Dos formas curvas de nogal se cruzan en una pieza de sobremesa.',
    pending: 'Probar el ensamblaje, el apoyo y la inmovilización de la pieza en su caja.',
    details: [],
  },
  'posavasos-de-nogal': {
    intent: 'Repetir un contorno con retales aptos y conservar el dibujo de la veta en cada pieza.',
    pending: 'Espesor, planitud, respuesta a la humedad y embalaje.',
    details: [
      ['Proceso en estudio', 'Corte repetible y canto suavizado'],
      ['Material de partida', 'Retales de haya seleccionados'],
    ],
  },
  'sujetalibros-de-nogal': {
    intent: 'Dos bloques con apoyo plano y una cara oblicua que deja la veta a la vista.',
    pending: 'Peso, adherencia, estabilidad frente al empuje y protección de aristas.',
    details: [
      ['Formato en estudio', 'Dos bloques'],
      ['Proceso en estudio', 'Corte oblicuo y acabado común con la bandeja'],
    ],
  },
  'consola-roble-acero': {
    intent:
      'Separar tablero y estructura para poder estudiar la consola según el espacio del encargo.',
    pending: 'Sección, anclaje, unión madera-acero, estabilidad y transporte.',
    details: [
      ['Uso previsto', 'Recibidor'],
      ['Montaje en estudio', 'Tablero separado de la estructura'],
    ],
  },
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
    detailImage: images.beech,
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
    intent: 'Un tablero bajo de pino con un contorno libre para acompañar una zona de estar.',
    pending: 'Proporciones, resistencia de la superficie y estabilidad.',
    details: [
      ['Forma', 'Orgánica'],
      ['Estructura de estudio', 'Apoyos bajos de madera'],
    ],
  },
  'organizador-personal': {
    intent:
      'Un vaciado central da sitio al teléfono y los compartimentos bajos mantienen llaves y accesorios a la vista.',
    pending: 'Medidas interiores y compatibilidad con distintos tamaños de teléfono.',
    details: [
      ['Formato', 'Rectangular'],
      ['Distribución', 'Compartimentos de distinta profundidad'],
    ],
    detailImage: images.beech,
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
      'Tres tablas de pino forman dos cauces de resina azul. El recorte irregular conserva la silueta de los cantos vivos.',
    pending: 'Medidas, separación de apoyos y viabilidad estructural para cada proyecto.',
    details: [
      ['Forma', 'Rectangular con canto vivo'],
      ['Composición', 'Tres tablas de pino, resina azul petróleo y base de acero negro'],
    ],
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
      'La resina negra rellena el hueco entre dos tablas de pino y conserva la forma irregular de sus cantos.',
    pending: 'Geometría del encuentro, proporciones, acabado y comportamiento de la unión.',
    details: [
      ['Forma', 'Ovalada'],
      ['Composición', 'Pino con resina negra mate'],
    ],
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
    line: 'El cauce toma la forma de la madera',
    text: 'Se colocan dos o tres tablas con los cantos vivos enfrentados. La resina rellena los huecos a ras del tablero. Negro mate y azul petróleo son referencias de contraste. El tono, la transparencia y el dibujo se estudian para cada encargo.',
    materialIds: ['pino', 'nogal', 'resina'],
    image: images.riverBlue,
    tone: 'river',
  },
  {
    id: 'organic',
    line: 'Formas que conserva el árbol',
    text: 'Una curva de la tabla puede dictar todo el contorno. Organic recoge esa libertad en objetos pequeños y mesas de perfil irregular.',
    materialIds: ['haya', 'pino', 'olivo', 'nogal'],
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
