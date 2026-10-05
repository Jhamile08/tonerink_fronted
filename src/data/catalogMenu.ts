import type { BrandProduct, QualityProduct, TypeProduct } from '../types/product'

export type CatalogFilter =
  | { kind: 'all' }
  | { kind: 'type'; type: TypeProduct }
  | { kind: 'variant'; type: TypeProduct; brand: BrandProduct; quality: QualityProduct }

export const ALL_FILTER: CatalogFilter = { kind: 'all' }

export type MenuVariant = {
  label: string
  brand: BrandProduct
  quality: QualityProduct
}

export type MenuGroup = {
  type: TypeProduct
  label: string
  variants: readonly MenuVariant[]
}

/** Mismo árbol de categorías que tenía el `<nav>` de index2.html. */
export const CATALOG_MENU: readonly MenuGroup[] = [
  {
    type: 'CARTUCHO',
    label: 'Cartuchos',
    variants: [
      { label: 'HP Original', brand: 'HP', quality: 'ORIGINAL' },
      { label: 'HP Genérico', brand: 'HP', quality: 'GENERIC' },
      { label: 'Canon Original', brand: 'CANON', quality: 'ORIGINAL' },
    ],
  },
  {
    type: 'TONER',
    label: 'Tóner',
    variants: [
      { label: 'HP Original', brand: 'HP', quality: 'ORIGINAL' },
      { label: 'HP Genérico', brand: 'HP', quality: 'GENERIC' },
      { label: 'Samsung Original', brand: 'SAMSUNG', quality: 'ORIGINAL' },
      { label: 'Samsung Genérico', brand: 'SAMSUNG', quality: 'GENERIC' },
      { label: 'Lexmark Original', brand: 'LEXMARK', quality: 'ORIGINAL' },
    ],
  },
  {
    type: 'TONER_FOTOCOPIADORA',
    label: 'Tóner para fotocopiadoras',
    variants: [
      { label: 'Ricoh Original', brand: 'RICOH', quality: 'ORIGINAL' },
      { label: 'Ricoh Genérico', brand: 'RICOH', quality: 'GENERIC' },
      { label: 'Kyocera Original', brand: 'KYOCERA', quality: 'ORIGINAL' },
      { label: 'Kyocera Genérico', brand: 'KYOCERA', quality: 'GENERIC' },
    ],
  },
  {
    type: 'BOTELLA_TINTA',
    label: 'Botellas de tintas',
    variants: [
      { label: 'HP Original', brand: 'HP', quality: 'ORIGINAL' },
      { label: 'HP Genérico', brand: 'HP', quality: 'GENERIC' },
      { label: 'Epson Original', brand: 'EPSON', quality: 'ORIGINAL' },
      { label: 'Epson Genérico', brand: 'EPSON', quality: 'GENERIC' },
      { label: 'Brother Original', brand: 'BROTHER', quality: 'ORIGINAL' },
      { label: 'Brother Genérico', brand: 'BROTHER', quality: 'GENERIC' },
      { label: 'Canon Original', brand: 'CANON', quality: 'ORIGINAL' },
      { label: 'Canon Genérico', brand: 'CANON', quality: 'GENERIC' },
    ],
  },
  {
    type: 'CINTA_IMPRESION',
    label: 'Cintas de impresiones',
    variants: [{ label: 'Epson Original', brand: 'EPSON', quality: 'ORIGINAL' }],
  },
]

export function filterId(filter: CatalogFilter): string {
  switch (filter.kind) {
    case 'all':
      return 'TODOS'
    case 'type':
      return `${filter.type}-TODOS`
    case 'variant':
      return `${filter.type}-${filter.brand}-${filter.quality}`
  }
}
