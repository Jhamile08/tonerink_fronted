import { Paragraph, Separator, YStack } from 'tamagui'
import { Navbar } from './Navbar'

const HOME_NAV = [
  { label: 'Nosotros', href: '#about-us' },
  { label: 'Categorias', href: '#about-products' },
  { label: 'Contacto', href: '#footer' },
] as const

export function Hero() {
  return (
    <YStack
      render="header"
      id="inicio"
      width="100%"
      height="100vh"
      position="relative"
      justifyContent="flex-start"
      style={{
        background:
          'linear-gradient(to right, #00000052, #00000051), url(/imgs/portada3.png)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <Navbar items={HOME_NAV} />

      <YStack
        flex={1}
        justifyContent="flex-end"
        alignItems="flex-start"
        paddingBottom={140}
        paddingLeft={40}
        $maxSm={{ alignItems: 'center', paddingLeft: 0, paddingBottom: 170 }}
      >
        <YStack width="45%" $maxLg={{ width: '70%' }} $maxSm={{ width: '85%' }}>
          <img
            src="/imgs/Toneink%20recortado.png"
            alt="Tonerink"
            style={{ width: '100%', objectFit: 'contain' }}
          />
          <Separator borderColor="#ffffffcc" marginVertical={10} />
          <Paragraph
            color="white"
            fontSize={30}
            lineHeight={38}
            fontWeight="900"
            $maxSm={{ fontSize: 22, lineHeight: 30, textAlign: 'center' }}
          >
            Suministros de impresión
          </Paragraph>
        </YStack>
      </YStack>

      {/* Ola que empalma el header con el fondo blanco de la página. */}
      <YStack
        className="hero-wave"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height={150}
        overflow="hidden"
        pointerEvents="none"
      >
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M-0.84,27.14 C209.65,135.70 281.88,2.48 500.84,30.11 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: '#fff' }}
          />
        </svg>
      </YStack>
    </YStack>
  )
}
