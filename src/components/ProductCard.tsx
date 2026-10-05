import { Anchor, H3, Paragraph, Separator, XStack } from 'tamagui'
import { SurfaceCard } from './ui'
import { brand } from '../tamagui.config'
import { whatsappLink } from '../types/product'
import type { Product } from '../types/product'

export function ProductCard({ product }: { product: Product }) {
  return (
    <SurfaceCard width={292} paddingVertical={10} paddingHorizontal={16} alignItems="center" transition="quick">
      <img
        src={product.imgProduct}
        alt={product.nameProduct}
        loading="lazy"
        style={{ width: '100%', height: 192, objectFit: 'contain' }}
      />

      <Separator width="100%" marginVertical="$2" />

      <XStack alignItems="center" justifyContent="center" minHeight={56}>
        <H3 fontSize={18} lineHeight={24} textAlign="center" width="80%">
          {product.nameProduct}
        </H3>
      </XStack>

      <Separator width="100%" marginVertical="$2" />

      <Paragraph fontSize={15} fontWeight="500" width="100%">
        <strong>Rendimiento:</strong> {product.performanceProduct}
      </Paragraph>
      <Paragraph fontSize={15} fontWeight="500" width="100%" marginBottom="$2">
        <strong>Compatibilidad:</strong> {product.compatibilityProduct}
      </Paragraph>

      <Anchor
        href={whatsappLink(product.nameProduct)}
        target="_blank"
        rel="noreferrer"
        textDecorationLine="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="$2"
        padding={6}
        margin={3}
        color={brand.blue}
        borderWidth={2}
        borderColor={brand.blue}
        borderRadius={15}
        hoverStyle={{ backgroundColor: brand.blue, color: 'white' }}
      >
        <i className="fa-brands fa-whatsapp" style={{ fontSize: 20 }} />
        Comprar
      </Anchor>
    </SurfaceCard>
  )
}
