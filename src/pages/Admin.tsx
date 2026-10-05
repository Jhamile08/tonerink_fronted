import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { H2, Paragraph, ScrollView, Spinner, XStack, YStack } from 'tamagui'
import { ProductForm, draftFromProduct } from '../components/ProductForm'
import type { ProductDraft } from '../components/ProductForm'
import { SearchBar } from '../components/SearchBar'
import { Muted, PrimaryButton } from '../components/ui'
import { createProduct, deleteProduct, updateProduct } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { brand } from '../tamagui.config'
import { BRAND_PRODUCT, QUALITY_PRODUCT, TYPE_PRODUCT } from '../types/product'
import type { Product, ProductInput } from '../types/product'

type View = { mode: 'list' } | { mode: 'form'; draft: ProductDraft | null }

/** `flex` reparte el espacio sobrante entre nombre y compatibilidad. */
const COLUMNS = [
  { key: 'img', label: '', width: 70, flex: 0 },
  { key: 'id', label: 'ID', width: 70, flex: 0 },
  { key: 'type', label: 'Tipo', width: 150, flex: 0 },
  { key: 'name', label: 'Nombre', width: 220, flex: 1 },
  { key: 'brand', label: 'Marca', width: 160, flex: 0 },
  { key: 'performance', label: 'Rendimiento', width: 140, flex: 0 },
  { key: 'compatibility', label: 'Compatibilidad', width: 240, flex: 1 },
  { key: 'actions', label: '', width: 190, flex: 0 },
] as const

const TABLE_MIN_WIDTH = COLUMNS.reduce((total, column) => total + column.width, 0)

export default function Admin() {
  const navigate = useNavigate()
  const { token, signOut } = useAuth()
  const { products, loading, error, reload } = useProducts()
  const [view, setView] = useState<View>({ mode: 'list' })
  const [query, setQuery] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return products
    return products.filter(
      (product) =>
        product.nameProduct.toLowerCase().includes(needle) ||
        product.typeProduct.toLowerCase().includes(needle) ||
        product.brandProduct.toLowerCase().includes(needle),
    )
  }, [products, query])

  async function handleSubmit(product: ProductInput, id: number | null) {
    if (!token) return
    setSubmitting(true)
    setFeedback(null)

    try {
      if (id != null) {
        await updateProduct(id, product, token)
        setFeedback({ kind: 'ok', text: 'Producto actualizado correctamente.' })
      } else {
        await createProduct(product, token)
        setFeedback({ kind: 'ok', text: 'Producto registrado correctamente.' })
      }
      setView({ mode: 'list' })
      reload()
    } catch (cause) {
      console.error('Error al guardar el producto:', cause)
      setFeedback({ kind: 'error', text: 'No se pudo guardar el producto.' })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(product: Product) {
    if (!token) return
    const confirmed = window.confirm(`¿Eliminar "${product.nameProduct}"?`)
    if (!confirmed) return

    setFeedback(null)
    try {
      await deleteProduct(product.id, token)
      setFeedback({ kind: 'ok', text: 'Producto eliminado.' })
      reload()
    } catch (cause) {
      console.error('Error al eliminar el producto:', cause)
      setFeedback({ kind: 'error', text: 'No se pudo eliminar el producto.' })
    }
  }

  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <YStack width="100%" minHeight="100vh" backgroundColor={brand.grayBg} padding="$4" gap="$4">
      <XStack width="100%" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="$3">
        <H2 fontSize={34} color={brand.blue}>
          Productos
        </H2>
        <XStack gap="$3">
          {view.mode === 'list' ? (
            <PrimaryButton onPress={() => setView({ mode: 'form', draft: null })}>
              Agregar producto
            </PrimaryButton>
          ) : null}
          <PrimaryButton
            backgroundColor="transparent"
            color={brand.blue}
            borderWidth={1}
            borderColor={brand.blue}
            hoverStyle={{ backgroundColor: '#dde5ee' }}
            onPress={handleSignOut}
          >
            Salir
          </PrimaryButton>
        </XStack>
      </XStack>

      {feedback ? (
        <Paragraph
          role="status"
          padding={12}
          borderRadius={8}
          backgroundColor={feedback.kind === 'ok' ? '#d4edda' : '#f8d7da'}
          color={feedback.kind === 'ok' ? '#155724' : '#721c24'}
        >
          {feedback.text}
        </Paragraph>
      ) : null}

      {view.mode === 'form' ? (
        <XStack justifyContent="center" width="100%">
          <ProductForm
            initial={view.draft}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => setView({ mode: 'list' })}
          />
        </XStack>
      ) : (
        <YStack gap="$4" alignItems="center" width="100%">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Filtrar por nombre, tipo o marca…"
            maxWidth="50%"
          />

          {loading ? (
            <Spinner size="large" color={brand.blue} />
          ) : error ? (
            <Muted>{error}</Muted>
          ) : (
            <YStack
              width="100%"
              backgroundColor="white"
              borderRadius={12}
              overflow="hidden"
              shadowColor="#00000014"
              shadowRadius={10}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator>
                <YStack minWidth={TABLE_MIN_WIDTH} width="100%">
                  <XStack backgroundColor="#f8f9fa" borderBottomWidth={2} borderBottomColor="#dee2e6">
                    {COLUMNS.map((column) => (
                      <Paragraph
                        key={column.key}
                        width={column.width}
                        flex={column.flex}
                        padding={8}
                        fontWeight="700"
                        fontSize={14}
                      >
                        {column.label}
                      </Paragraph>
                    ))}
                  </XStack>

                  <ScrollView maxHeight={560}>
                    {visible.map((product, index) => (
                      <XStack
                        key={product.id}
                        alignItems="flex-start"
                        borderTopWidth={1}
                        borderTopColor="#dee2e6"
                        backgroundColor={index % 2 === 1 ? '#0000000d' : 'transparent'}
                        hoverStyle={{ backgroundColor: '#00000013' }}
                      >
                        <XStack width={70} padding={8}>
                          <img
                            src={product.imgProduct}
                            alt=""
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                          />
                        </XStack>
                        <Cell width={70}>{product.id}</Cell>
                        <Cell width={150}>
                          {TYPE_PRODUCT[product.typeProduct] ?? product.typeProduct}
                        </Cell>
                        <Cell width={220} flex={1}>
                          {product.nameProduct}
                        </Cell>
                        <Cell width={160}>
                          {BRAND_PRODUCT[product.brandProduct] ?? product.brandProduct}{' '}
                          {QUALITY_PRODUCT[product.qualityProduct] ?? product.qualityProduct}
                        </Cell>
                        <Cell width={140}>{product.performanceProduct}</Cell>
                        <Cell width={240} flex={1}>
                          {product.compatibilityProduct}
                        </Cell>
                        <XStack width={190} padding={8} gap="$2">
                          <PrimaryButton
                            size="$2"
                            onPress={() =>
                              setView({ mode: 'form', draft: draftFromProduct(product) })
                            }
                          >
                            Editar
                          </PrimaryButton>
                          <PrimaryButton
                            size="$2"
                            backgroundColor="#b00020"
                            hoverStyle={{ backgroundColor: '#8c0019' }}
                            onPress={() => handleDelete(product)}
                          >
                            Eliminar
                          </PrimaryButton>
                        </XStack>
                      </XStack>
                    ))}
                  </ScrollView>
                </YStack>
              </ScrollView>

              {visible.length === 0 ? <Muted padding="$6">Sin resultados.</Muted> : null}
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  )
}

function Cell({
  width,
  flex = 0,
  children,
}: {
  width: number
  flex?: number
  children: React.ReactNode
}) {
  return (
    <Paragraph width={width} flex={flex} padding={8} fontSize={14} lineHeight={20}>
      {children}
    </Paragraph>
  )
}
