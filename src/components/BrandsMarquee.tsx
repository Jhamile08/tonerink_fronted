import { XStack, YStack } from 'tamagui'

const BRAND_LOGOS = [
  { src: '/imgs/logo-Samsung.png', alt: 'Samsung' },
  { src: '/imgs/logo-canon5.png', alt: 'Canon' },
  { src: '/imgs/logo-brother.jpg', alt: 'Brother' },
  { src: '/imgs/logo-lexmark3.png', alt: 'Lexmark' },
  { src: '/imgs/logo-hp2.png', alt: 'HP' },
  { src: '/imgs/logo-ricoh2.png', alt: 'Ricoh' },
  { src: '/imgs/logo-kyocera.jpg', alt: 'Kyocera' },
  { src: '/imgs/LOGO-EPSON2.jpg', alt: 'Epson' },
  { src: '/imgs/LOGO-XEROX2.jpg', alt: 'Xerox' },
] as const

/**
 * Carrusel continuo de marcas. La pista se renderiza dos veces para que el
 * desplazamiento del 50% quede exactamente en el punto de empalme y el bucle
 * se vea sin saltos.
 */
export function BrandsMarquee() {
  const track = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <YStack
      className="brands-marquee"
      width="100%"
      height={150}
      overflow="hidden"
      justifyContent="center"
      shadowColor="#00000033"
      shadowRadius={20}
      backgroundColor="$white"
    >
      <XStack className="brands-track" alignItems="center" width="max-content">
        {track.map((logo, index) => (
          <XStack
            key={`${logo.alt}-${index}`}
            width={200}
            height={150}
            marginHorizontal={32}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              aria-hidden={index >= BRAND_LOGOS.length}
              style={{ width: '100%', objectFit: 'contain' }}
            />
          </XStack>
        ))}
      </XStack>
    </YStack>
  )
}
