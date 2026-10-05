import { useEffect, useState } from 'react'
import { Form, H3, Input, Label, Paragraph, Spinner, XStack, YStack } from 'tamagui'
import { PrimaryButton } from './ui'
import { SelectField } from './ui/SelectField'
import type { SelectOption } from './ui/SelectField'
import { BRAND_PRODUCT, QUALITY_PRODUCT, TYPE_PRODUCT } from '../types/product'
import type { BrandProduct, Product, ProductInput, QualityProduct, TypeProduct } from '../types/product'

function toOptions(record: Record<string, string>): SelectOption[] {
  return Object.entries(record).map(([value, label]) => ({ value, label }))
}

const TYPE_OPTIONS = toOptions(TYPE_PRODUCT)
const BRAND_OPTIONS = toOptions(BRAND_PRODUCT)
const QUALITY_OPTIONS = toOptions(QUALITY_PRODUCT)

export type ProductDraft = {
  /** `null` mientras el producto no existe en el backend. */
  id: number | null
  typeProduct: string
  brandProduct: string
  qualityProduct: string
  imgProduct: string
  nameProduct: string
  performanceProduct: string
  compatibilityProduct: string
}

const EMPTY_DRAFT: ProductDraft = {
  id: null,
  typeProduct: '',
  brandProduct: '',
  qualityProduct: '',
  imgProduct: '',
  nameProduct: '',
  performanceProduct: '',
  compatibilityProduct: '',
}

export function draftFromProduct(product: Product): ProductDraft {
  return {
    id: product.id,
    typeProduct: product.typeProduct ?? '',
    brandProduct: product.brandProduct ?? '',
    qualityProduct: product.qualityProduct ?? '',
    imgProduct: product.imgProduct ?? '',
    nameProduct: product.nameProduct ?? '',
    performanceProduct: product.performanceProduct ?? '',
    compatibilityProduct: product.compatibilityProduct ?? '',
  }
}

type ProductFormProps = {
  /** `null` crea un producto nuevo; con valor, edita el existente. */
  initial: ProductDraft | null
  submitting: boolean
  onSubmit: (product: ProductInput, id: number | null) => void
  onCancel: () => void
}

export function ProductForm({ initial, submitting, onSubmit, onCancel }: ProductFormProps) {
  const [draft, setDraft] = useState<ProductDraft>(initial ?? EMPTY_DRAFT)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setDraft(initial ?? EMPTY_DRAFT)
    setValidationError(null)
  }, [initial])

  const editing = initial?.id != null

  function set<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit() {
    const missing = (
      [
        'typeProduct',
        'brandProduct',
        'qualityProduct',
        'imgProduct',
        'nameProduct',
        'performanceProduct',
        'compatibilityProduct',
      ] as const
    ).some((key) => !draft[key].trim())

    if (missing) {
      setValidationError('Completa todos los campos antes de enviar.')
      return
    }

    const { id, ...fields } = draft
    setValidationError(null)
    onSubmit(
      {
        ...fields,
        typeProduct: fields.typeProduct as TypeProduct,
        brandProduct: fields.brandProduct as BrandProduct,
        qualityProduct: fields.qualityProduct as QualityProduct,
      },
      id,
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      gap="$3"
      width="100%"
      maxWidth={680}
      padding={24}
      backgroundColor="white"
      borderRadius={12}
      shadowColor="#00000014"
      shadowRadius={10}
    >
      <H3 fontSize={26}>{editing ? 'Editar producto' : 'Crear producto'}</H3>

      <SelectField
        id="typeProduct"
        label="Tipo"
        placeholder="Seleccione tipo de producto"
        value={draft.typeProduct}
        options={TYPE_OPTIONS}
        onChange={(value) => set('typeProduct', value)}
      />

      <YStack gap="$2">
        <Label htmlFor="nameProduct" fontWeight="600">
          Nombre producto
        </Label>
        <Input
          id="nameProduct"
          value={draft.nameProduct}
          onChangeText={(value) => set('nameProduct', value)}
        />
      </YStack>

      <YStack gap="$2">
        <Label htmlFor="imgProduct" fontWeight="600">
          URL de la imagen del producto
        </Label>
        <Input
          id="imgProduct"
          value={draft.imgProduct}
          onChangeText={(value) => set('imgProduct', value)}
          placeholder="https://…"
        />
      </YStack>

      <YStack gap="$2">
        <Label htmlFor="performanceProduct" fontWeight="600">
          Rendimiento del producto
        </Label>
        <Input
          id="performanceProduct"
          value={draft.performanceProduct}
          onChangeText={(value) => set('performanceProduct', value)}
        />
      </YStack>

      <YStack gap="$2">
        <Label htmlFor="compatibilityProduct" fontWeight="600">
          Compatibilidad del producto
        </Label>
        <Input
          id="compatibilityProduct"
          value={draft.compatibilityProduct}
          onChangeText={(value) => set('compatibilityProduct', value)}
        />
      </YStack>

      <XStack gap="$3" $maxSm={{ flexDirection: 'column' }}>
        <SelectField
          id="brand"
          label="Marca"
          placeholder="Seleccione marca del producto"
          value={draft.brandProduct}
          options={BRAND_OPTIONS}
          onChange={(value) => set('brandProduct', value)}
          width="50%"
        />
        <SelectField
          id="quality"
          label="Calidad"
          placeholder="Seleccione calidad del producto"
          value={draft.qualityProduct}
          options={QUALITY_OPTIONS}
          onChange={(value) => set('qualityProduct', value)}
          width="50%"
        />
      </XStack>

      {validationError ? (
        <Paragraph role="alert" color="#b00020">
          {validationError}
        </Paragraph>
      ) : null}

      <XStack gap="$3" marginTop="$2">
        <Form.Trigger asChild disabled={submitting}>
          <PrimaryButton icon={submitting ? <Spinner /> : undefined}>
            {editing ? 'Guardar' : 'Enviar'}
          </PrimaryButton>
        </Form.Trigger>
        <PrimaryButton
          backgroundColor="transparent"
          color="#333"
          borderWidth={1}
          borderColor="#c9ced6"
          hoverStyle={{ backgroundColor: '#f1f3f6' }}
          onPress={onCancel}
        >
          Cancelar
        </PrimaryButton>
      </XStack>
    </Form>
  )
}
