import { images } from '../data'
import type { ProductImage } from '../types'
export type PieceStudy = {
  slug: string
  name: string
  description: string
  image: ProductImage
  material: string
  state: 'estudio' | 'archivo'
}
export const pieces: PieceStudy[] = [
  {
    slug: 'olivo-borde-vivo',
    name: 'Olivo de borde vivo',
    description:
      'El canto conserva curvas, cavidades y cambios de tono que guían la forma de la pieza.',
    image: images.olive,
    material: 'Olivo',
    state: 'estudio',
  },
  {
    slug: 'nogal-cauce-negro',
    name: 'Nogal con cauce negro',
    description: 'Un estudio de contraste entre la resina mate y el dibujo de dos vetas de nogal.',
    image: images.resin,
    material: 'Nogal y resina',
    state: 'estudio',
  },
  {
    slug: 'roble-veta-dorada',
    name: 'Roble de veta dorada',
    description: 'Estudio de textura bajo luz lateral, conservado como referencia visual.',
    image: images.grain,
    material: 'Roble',
    state: 'archivo',
  },
]
