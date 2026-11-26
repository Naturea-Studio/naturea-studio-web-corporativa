import { images } from './data'
import type { ProductImage } from './types'
export interface PageStory {
  label: string
  text: string
  image?: ProductImage
  links?: [string, string][]
  notes?: [string, string][]
}
export const stories: Record<string, PageStory> = {
  'a-medida': {
    label: 'Diseño por encargo',
    text: 'Partimos de tu espacio, de su uso y de las proporciones que necesita. Después exploramos la madera, el contorno del tablero, la estructura y los acabados.',
    image: images.hero,
    links: [
      ['Preparar una solicitud', '/solicitar-presupuesto'],
      ['Explorar materiales', '/materiales'],
      ['Ver configurador', '/configurador'],
    ],
    notes: [
      [
        '01 · Cuéntanos qué necesitas',
        'Medidas aproximadas, ubicación y referencias ayudan a definir el punto de partida.',
      ],
      [
        '02 · Explora materiales y formas',
        'Cada selección deberá revisarse para confirmar su compatibilidad.',
      ],
      [
        '03 · Definición del proyecto',
        'La viabilidad, el plazo y el presupuesto se concretarán por proyecto.',
      ],
    ],
  },
  configurador: {
    label: 'Diseño por encargo',
    text: 'La selección interactiva de medidas, madera, resina, patas y acabados se incorporará en la fase de personalización. Puedes empezar reuniendo las medidas y las preferencias de tu proyecto.',
    image: images.desk,
    links: [
      ['Preparar una solicitud', '/solicitar-presupuesto'],
      ['Explorar materiales', '/materiales'],
    ],
  },
  'piezas-unicas': {
    label: 'Galería en desarrollo',
    text: 'Cuando una pieza esté fabricada, la galería podrá mostrar sus vetas, sus dimensiones reales y sus acabados. Las piezas vendidas podrán conservarse como archivo visual.',
    image: images.olive,
    links: [
      ['Conocer Signature', '/colecciones/signature'],
      ['Explorar materiales', '/materiales'],
    ],
  },
  'el-estudio': {
    label: 'Naturea Studio',
    text: 'Desarrollamos mobiliario y objetos propios a partir de la madera natural. Nos interesan las formas serenas, las vetas visibles y los acabados que dejan apreciar el material.',
    image: images.workshop,
    links: [
      ['Nuestra filosofía', '/nuestra-filosofia'],
      ['Diseño y fabricación', '/diseno-y-fabricacion'],
      ['Para profesionales', '/profesionales'],
    ],
  },
  'nuestra-filosofia': {
    label: 'El estudio',
    text: 'Cada pieza empieza con una elección de forma, proporción y material. La madera marca el carácter de la pieza y la resina amplía las posibilidades cuando la composición lo pide.',
    image: images.grain,
    links: [
      ['Ver colecciones', '/colecciones'],
      ['Conocer los materiales', '/materiales'],
    ],
  },
  'diseno-y-fabricacion': {
    label: 'El estudio',
    text: 'Seleccionar la tabla, dibujar el contorno, estudiar la estructura y probar el acabado son decisiones que se toman juntas. Las dimensiones y aplicaciones de cada concepto se revisarán antes de fabricar.',
    image: images.workshop,
    links: [
      ['Ver materiales', '/materiales'],
      ['Ver el catálogo conceptual', '/productos'],
    ],
  },
  profesionales: {
    label: 'Colaboraciones',
    text: 'Un punto de partida para interioristas, arquitectos y equipos de hostelería que buscan mobiliario personalizado, una selección de materiales o un presupuesto por proyecto.',
    image: images.dining,
    links: [
      ['Interioristas', '/profesionales/interioristas'],
      ['Arquitectos', '/profesionales/arquitectos'],
      ['Hostelería', '/profesionales/hosteleria'],
      ['Preparar una solicitud', '/solicitar-presupuesto'],
    ],
  },
  'profesionales/interioristas': {
    label: 'Profesionales',
    text: 'Explora proporciones, maderas y acabados para integrar una mesa, un escritorio o una consola en el espacio que estás diseñando.',
    image: images.coffee,
    links: [
      ['Preparar una solicitud', '/solicitar-presupuesto'],
      ['Ver materiales', '/materiales'],
    ],
  },
  'profesionales/arquitectos': {
    label: 'Profesionales',
    text: 'Parte de tus planos, medidas y requisitos de uso para definir el mobiliario. Las fichas y los archivos CAD se incorporarán cuando estén disponibles.',
    image: images.desk,
    links: [
      ['Preparar una solicitud', '/solicitar-presupuesto'],
      ['Diseño y fabricación', '/diseno-y-fabricacion'],
    ],
  },
  'profesionales/hosteleria': {
    label: 'Profesionales',
    text: 'Mesas, barras, bancos y mostradores como líneas de trabajo para restaurantes y alojamientos. Cada propuesta deberá validar medidas, uso y condiciones de fabricación.',
    image: images.hero,
    links: [['Preparar una solicitud', '/solicitar-presupuesto']],
  },
  contacto: {
    label: 'Naturea Studio',
    text: 'El canal de contacto se habilitará con el lanzamiento. Si ya tienes un proyecto en mente, puedes reunir tus ideas en un borrador local.',
    links: [['Preparar un borrador', '/solicitar-presupuesto']],
  },
  ayuda: {
    label: 'Atención al cliente',
    text: 'Consulta el estado del catálogo y las próximas opciones de compra y gestión de pedidos.',
    links: [
      ['Preguntas frecuentes', '/preguntas-frecuentes'],
      ['Envíos', '/envios'],
      ['Devoluciones', '/devoluciones'],
      ['Cuidados', '/cuidados'],
    ],
  },
  'preguntas-frecuentes': {
    label: 'Atención al cliente',
    text: 'Información sobre el catálogo de prueba y los proyectos a medida.',
    notes: [
      [
        '¿Puedo comprar una pieza?',
        'Esta versión presenta conceptos de diseño. La compra se habilitará cuando existan productos validados.',
      ],
      [
        '¿Qué significan los precios?',
        'Son referencias orientativas para los conceptos iniciales.',
      ],
      [
        '¿Qué son las imágenes conceptuales?',
        'Son visualizaciones que ilustran la dirección del diseño antes de fabricar.',
      ],
      [
        '¿Puedo plantear un proyecto?',
        'Puedes preparar y descargar un borrador desde la página de solicitud.',
      ],
    ],
  },
  envios: {
    label: 'Atención al cliente',
    text: 'Los costes, los plazos de envío y las opciones de montaje se publicarán al activar la venta.',
  },
  devoluciones: {
    label: 'Atención al cliente',
    text: 'La información de devoluciones se publicará al activar la venta.',
  },
  cuidados: {
    label: 'Atención al cliente',
    text: 'Las pautas de mantenimiento se documentarán según el material y el acabado de cada pieza.',
    links: [['Explorar materiales', '/materiales']],
  },
  carrito: {
    label: 'Tu selección',
    text: 'Tu carrito está vacío. La compra se habilitará cuando se publique el catálogo comercial.',
    links: [
      ['Explorar el catálogo', '/productos'],
      ['Ver favoritos', '/favoritos'],
    ],
  },
  checkout: {
    label: 'Tu selección',
    text: 'El pago se habilitará al publicar el catálogo comercial.',
    links: [['Volver al carrito', '/carrito']],
  },
  cuenta: {
    label: 'Área personal',
    text: 'Las cuentas y el acceso al historial se incorporarán en la fase de ecommerce.',
    links: [
      ['Pedidos', '/cuenta/pedidos'],
      ['Facturas', '/cuenta/facturas'],
      ['Proyectos', '/cuenta/proyectos'],
      ['Presupuestos', '/cuenta/presupuestos'],
      ['Favoritos de este dispositivo', '/favoritos'],
    ],
  },
  'cuenta/pedidos': {
    label: 'Mi cuenta',
    text: 'Aquí podrás seguir tus pedidos cuando se active la compra.',
  },
  'cuenta/facturas': {
    label: 'Mi cuenta',
    text: 'Las facturas estarán disponibles cuando se activen las cuentas.',
  },
  'cuenta/proyectos': {
    label: 'Mi cuenta',
    text: 'Aquí podrás consultar tus proyectos en una fase posterior.',
    links: [['Preparar una solicitud', '/solicitar-presupuesto']],
  },
  'cuenta/presupuestos': {
    label: 'Mi cuenta',
    text: 'La consulta de presupuestos se incorporará con el área de cliente.',
    links: [['Ver proyectos a medida', '/a-medida']],
  },
  'legal/aviso-legal': {
    label: 'Información legal',
    text: 'La identificación del titular y los datos de contacto se incorporarán antes de la apertura comercial.',
  },
  'legal/privacidad': {
    label: 'Información legal',
    text: 'En esta versión, el formulario genera un archivo en tu dispositivo. Los datos que escribas se utilizan en el navegador para crear ese archivo.',
  },
  'legal/cookies': {
    label: 'Información legal',
    text: 'La web utiliza el almacenamiento local del navegador para recordar los favoritos en este dispositivo. Puedes quitarlos desde Favoritos o eliminar los datos del sitio desde tu navegador.',
    links: [['Ver favoritos', '/favoritos']],
  },
  'legal/condiciones': {
    label: 'Información legal',
    text: 'Las condiciones de compra se publicarán junto con la tienda. Los importes del catálogo de prueba son orientativos.',
  },
}
