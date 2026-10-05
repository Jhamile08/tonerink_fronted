import { Link } from 'react-router-dom'
import { Paragraph, XStack } from 'tamagui'
import { brand } from '../tamagui.config'

type NavItem = { label: string; href: string }

type NavbarProps = {
  items: readonly NavItem[]
  /** El home flota sobre la portada; el catálogo usa la barra azul sólida. */
  variant?: 'transparent' | 'solid'
}

export function Navbar({ items, variant = 'transparent' }: NavbarProps) {
  const solid = variant === 'solid'

  return (
    <XStack
      render="nav"
      justifyContent="flex-end"
      alignItems="center"
      width="100%"
      height={solid ? 56 : 80}
      paddingRight={solid ? 20 : 80}
      backgroundColor={solid ? brand.blue : 'transparent'}
      zIndex={10}
      $maxMd={{ justifyContent: 'center', paddingRight: 0 }}
    >
      {items.map((item) => (
        <XStack key={item.href} alignItems="center" paddingHorizontal={10} $maxSm={{ paddingHorizontal: 5 }}>
          <Link to={item.href} style={{ textDecoration: 'none' }}>
            <Paragraph
              color="white"
              fontWeight="600"
              fontSize={solid ? 18 : 22}
              $maxSm={{ fontSize: 15 }}
              $maxXs={{ fontSize: 13 }}
              hoverStyle={{ opacity: 0.8 }}
            >
              {item.label}
            </Paragraph>
          </Link>
        </XStack>
      ))}
    </XStack>
  )
}
