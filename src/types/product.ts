export const TYPE_PRODUCT = {
  CARTUCHO: 'Cartucho',
  TONER: 'Tóner',
  TONER_FOTOCOPIADORA: 'Tóner de fotocopiadora',
  BOTELLA_TINTA: 'Botella de tinta',
  CINTA_IMPRESION: 'Cinta de impresión',
} as const

export type TypeProduct = keyof typeof TYPE_PRODUCT

export const BRAND_PRODUCT = {
  BROTHER: 'Brother',
  CANON: 'Canon',
  EPSON: 'Epson',
  HP: 'Hp',
  SAMSUNG: 'Samsung',
  LEXMARK: 'Lexmark',
  RICOH: 'Ricoh',
  KYOCERA: 'Kyocera',
} as const

export type BrandProduct = keyof typeof BRAND_PRODUCT

export const QUALITY_PRODUCT = {
  ORIGINAL: 'Original',
  GENERIC: 'Genérico',
} as const

export type QualityProduct = keyof typeof QUALITY_PRODUCT

export type Product = {
  id: number
  typeProduct: TypeProduct
  brandProduct: BrandProduct
  qualityProduct: QualityProduct
  imgProduct: string
  nameProduct: string
  performanceProduct: string
  compatibilityProduct: string
}

/** Campos que el formulario de administración envía al backend. */
export type ProductInput = Omit<Product, 'id'>

/** Respuesta paginada del backend (`/product/get`). */
export type ProductPage = {
  content: Product[]
  totalElements: number
}

export const WHATSAPP_NUMBER = '573195806583'

export function whatsappLink(productName: string): string {
  const text = `Hola, Estoy interesado en el ${productName}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
