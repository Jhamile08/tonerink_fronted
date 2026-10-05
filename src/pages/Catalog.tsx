import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Anchor, Paragraph, Spinner, XStack, YStack } from 'tamagui'
import { CategorySidebar } from '../components/CategorySidebar'
import { Navbar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { Muted } from '../components/ui'
import { ALL_FILTER } from '../data/catalogMenu'
import type { CatalogFilter } from '../data/catalogMenu'
import { useProducts } from '../hooks/useProducts'
import { brand } from '../tamagui.config'
import { TYPE_PRODUCT, WHATSAPP_NUMBER } from '../types/product'
import type { Product, TypeProduct } from '../types/product'

const CATALOG_NAV = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Contáctenos', href: '/#footer' },
] as const

function matchesFilter(product: Product, filter: CatalogFilter): boolean {
  switch (filter.kind) {
    case 'all':
      return true
    case 'type':
      return product.typeProduct === filter.type
    case 'variant':
      return (
        product.typeProduct === filter.type &&
        product.brandProduct === filter.brand &&
        product.qualityProduct === filter.quality
      )
  }
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true
  const needle = query.toLowerCase()
  return (
    product.nameProduct.toLowerCase().includes(needle) ||
    product.typeProduct.toLowerCase().includes(needle) ||
    product.brandProduct.toLowerCase().includes(needle) ||
    product.compatibilityProduct.toLowerCase().includes(needle)
  )
}

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const { products, loading, error } = useProducts()
  const [filter, setFilter] = useState<CatalogFilter>(ALL_FILTER)
  const [query, setQuery] = useState('')

  // Las tarjetas del home enlazan a /catalogo?categoria=TONER y similares.
  useEffect(() => {
    const requested = searchParams.get('categoria')
    if (requested && requested in TYPE_PRODUCT) {
      setFilter({ kind: 'type', type: requested as TypeProduct })
    }
  }, [searchParams])

  const visible = useMemo(
    () => products.filter((p) => matchesFilter(p, filter) && matchesQuery(p, query)),
    [products, filter, query],
  )

  return (
    <YStack width="100%" minHeight="100vh" backgroundColor={brand.grayBg}>
      <Navbar items={CATALOG_NAV} variant="solid" />

      <XStack width="100%" alignItems="flex-start" $maxMd={{ flexDirection: 'column' }}>
        <CategorySidebar value={filter} onChange={setFilter} />

        <YStack flex={1} alignItems="center" paddingBottom="$8" minWidth={0}>
          <XStack
            width="85%"
            marginTop={20}
            paddingVertical={10}
            paddingHorizontal={24}
            borderRadius={40}
            backgroundColor={brand.blue}
            alignItems="center"
            justifyContent="center"
          >
            <Paragraph color="white" textAlign="center" fontSize={18}>
              <strong>¡Recuerda!</strong> si no encuentras el producto que necesitas no dudes en
              contactarnos al{' '}
              <Anchor
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                color="white"
                fontWeight="700"
                textDecorationLine="none"
              >
                3195806583
              </Anchor>
              .
            </Paragraph>
          </XStack>

          <XStack width="100%" justifyContent="center" marginVertical={30}>
            <SearchBar value={query} onChange={setQuery} />
          </XStack>

          {loading ? (
            <YStack paddingVertical="$8" gap="$3" alignItems="center">
              <Spinner size="large" color={brand.blue} />
              <Muted>Cargando productos…</Muted>
            </YStack>
          ) : error ? (
            <Muted paddingVertical="$8">{error}</Muted>
          ) : visible.length === 0 ? (
            <Muted paddingVertical="$8">
              No encontramos productos para esta búsqueda. Escríbenos y te ayudamos.
            </Muted>
          ) : (
            <XStack
              flexWrap="wrap"
              justifyContent="center"
              gap={20}
              paddingHorizontal={10}
              width="100%"
            >
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </XStack>
          )}
        </YStack>
      </XStack>
    </YStack>
  )
}
