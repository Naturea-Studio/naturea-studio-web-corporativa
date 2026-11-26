export interface Content {
  id: string
  slug: string
  name: string
  description: string
}
export interface ProductImage {
  key: string
  alt: string
  conceptual: boolean
}
export interface Seo {
  title?: string
  description?: string
  image?: ProductImage
}
export interface ProductDimension {
  lengthMm?: number
  widthMm?: number
  heightMm?: number
  thicknessMm?: number
}
export interface ProductCategory extends Content {
  section: 'mobiliario' | 'decoracion'
}
export interface ProductCollection extends Content {
  image: ProductImage
  seo?: Seo
}
export interface PriceBreakdown {
  currency: string
  subtotalCents: number
  taxCents?: number
  shippingCents?: number
  estimate: boolean
}
export type ProductAvailability =
  | 'concepto'
  | 'prototipo'
  | 'en-desarrollo'
  | 'proximamente'
  | 'disponible'
  | 'bajo-pedido'
  | 'agotado'
  | 'vendido'
  | 'descatalogado'
export interface Finish extends Content {
  care?: string
}
export interface Material extends Content {
  kind: 'madera' | 'resina' | 'metal' | 'acabado'
  image?: ProductImage
  color?: string
  features?: string[]
  care?: string
  finishIds?: string[]
  available?: boolean
  surchargeCents?: number
}
export interface WoodType extends Material {
  kind: 'madera'
}
export interface ResinType extends Material {
  kind: 'resina'
}
export interface LegType extends Content {
  materialId: string
  colors: string[]
}
export interface ProductSpecification {
  label: string
  value: string
}
export interface ProductDocument {
  type: 'montaje' | 'cuidados' | 'seguridad' | 'ficha' | 'cad' | 'certificado'
  name: string
  url: string
  revision?: string
}
export interface ProductOptionValue {
  id: string
  name: string
  surchargeCents?: number
  image?: ProductImage
}
export interface ProductOption {
  id: string
  name: string
  values: ProductOptionValue[]
}
export interface ProductVariant {
  id: string
  sku: string
  selections: Record<string, string>
  availability: ProductAvailability
  price?: PriceBreakdown
  dimensions?: ProductDimension
  images?: ProductImage[]
}
export interface Product extends Content {
  sku?: string
  category: string
  collection: string
  materialIds: string[]
  image?: ProductImage
  price?: PriceBreakdown
  availability: ProductAvailability
  publicStatus: string
  manufacturing: 'serie' | 'bajo-pedido' | 'pieza-unica' | 'personalizado'
  variants?: ProductVariant[]
  options?: ProductOption[]
  dimensions?: ProductDimension
  weightGrams?: number
  specifications?: ProductSpecification[]
  documents?: ProductDocument[]
  warnings?: string[]
  verifiedLoadKg?: number
  manufacturer?: string
  batch?: string
  revision?: string
  seo?: Seo
}
export interface CompatibilityRule {
  when: Record<string, string>
  exclude: Record<string, string[]>
  reason: string
}
export interface ProductConfiguration {
  productId: string
  dimensions: ProductDimension
  selections: Record<string, string>
  estimate?: PriceBreakdown
}
export interface UniquePiece extends Content {
  sku: string
  serial?: string
  images: ProductImage[]
  materialIds: string[]
  grainNotes?: string
  dimensions: ProductDimension
  weightGrams?: number
  finishId?: string
  collectionId?: string
  manufacturedAt?: string
  certificate?: ProductDocument
  stock: 0 | 1
  status: 'disponible' | 'reservada' | 'vendida' | 'en-fabricacion' | 'archivada'
  price?: PriceBreakdown
}
export interface CustomProject {
  id: string
  name: string
  email: string
  phone?: string
  productType?: string
  dimensions?: string
  material?: string
  finish?: string
  color?: string
  budget?: string
  province?: string
  desiredDate?: string
  description: string
  references?: File[]
}
export interface ProfessionalCustomer {
  id: string
  name: string
  company: string
  email: string
  sector: string
}
export interface Quotation {
  id: string
  projectId: string
  status: 'borrador' | 'en-revision' | 'emitido' | 'aceptado'
  price?: PriceBreakdown
}
export type CartItem = { quantity: number } & (
  | { kind: 'simple'; productId: string }
  | { kind: 'variant'; productId: string; variantId: string }
  | { kind: 'custom'; configuration: ProductConfiguration }
)
export interface JournalArticle extends Content {
  image: ProductImage
  author: string
  date: string
  category: string
  body: string[]
  productIds?: string[]
  collectionIds?: string[]
  seo?: Seo
}
export interface InspirationSpace extends Content {
  image: ProductImage
}
