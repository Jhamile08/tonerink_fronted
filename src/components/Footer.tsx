import { Link } from 'react-router-dom'
import { Anchor, H3, Paragraph, Separator, XStack, YStack } from 'tamagui'
import { brand } from '../tamagui.config'

const INTEREST_LINKS = [
  { label: 'Inicio', to: '/#inicio' },
  { label: 'Productos', to: '/catalogo' },
  { label: 'Contáctenos', to: '/#footer' },
] as const

const CONTACTS = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'comercial.tonerink@gmail.com',
    href: 'mailto:comercial.tonerink@gmail.com',
  },
  {
    icon: 'fa-brands fa-whatsapp',
    label: '+57 319-580-65-83',
    href: 'https://wa.me/573195806583',
  },
  {
    icon: 'fa-solid fa-phone',
    label: '+57 318-731-74-50',
    href: 'tel:+573187317450',
  },
] as const

export function Footer() {
  return (
    <YStack render="footer" id="footer" width="100%" backgroundColor={brand.blue}>
      <XStack
        gap={40}
        paddingVertical={55}
        paddingHorizontal={60}
        justifyContent="center"
        alignItems="center"
        $maxLg={{
          flexDirection: 'column',
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
      >
        <YStack gap="$2" $maxLg={{ alignItems: 'center' }}>
          <H3 color="white" fontSize={22}>
            Enlaces de interés
          </H3>
          {INTEREST_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </YStack>

        <YStack gap="$2" $maxLg={{ alignItems: 'center' }}>
          <H3 color="white" fontSize={22}>
            Conéctate con nosotros
          </H3>
          {CONTACTS.map((contact) => (
            <XStack key={contact.href} alignItems="center" gap="$2">
              <i className={contact.icon} style={{ color: '#fff', fontSize: 24 }} />
              <Anchor
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                color="white"
                textDecorationLine="none"
              >
                {contact.label}
              </Anchor>
            </XStack>
          ))}
          <Separator borderColor="#ffffff66" width="100%" marginTop="$2" />
        </YStack>

        <YStack width="55%" gap="$2" $maxLg={{ width: '100%', alignItems: 'center' }}>
          <H3 color="white" fontSize={22}>
            Sobre nosotros
          </H3>
          <Paragraph color="white" $maxLg={{ textAlign: 'center' }}>
            Tonerink S.A.S es una empresa que se dedica a la venta de tóner y cartuchos de
            impresoras de oficina para pymes. Operamos en Bogotá, Medellín, Cali y Barranquilla.
            Manejamos otros servicios como la recarga de tóner y el mantenimiento y reparación de
            las impresoras.
          </Paragraph>
        </YStack>

        <Link to="/login" aria-label="Acceso administrador">
          <img src="/imgs/profile.png" alt="" style={{ width: 100 }} />
        </Link>
      </XStack>
    </YStack>
  )
}
