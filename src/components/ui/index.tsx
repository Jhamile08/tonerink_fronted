import { Button, H2, Paragraph, styled, XStack, YStack } from 'tamagui'
import { brand } from '../../tamagui.config'

/** Título de sección (`.titulo-2` del CSS original). */
export const SectionTitle = styled(H2, {
  name: 'SectionTitle',
  textAlign: 'center',
  color: brand.blue,
  fontWeight: '900',
  fontSize: 30,
  lineHeight: 38,
  $maxSm: { fontSize: 25 },
})

/** Tarjeta blanca con borde y sombra, reutilizada en catálogo y carrusel. */
export const SurfaceCard = styled(YStack, {
  name: 'SurfaceCard',
  backgroundColor: brand.white,
  borderWidth: 2,
  borderColor: 'lightgray',
  borderRadius: 15,
  shadowColor: '#d3d3d3',
  shadowRadius: 6,
  shadowOffset: { width: 1, height: 1 },
  hoverStyle: {
    borderColor: '#c0c0c0',
    shadowColor: '#8f8f8f',
    shadowRadius: 12,
  },
})

/** Botón azul corporativo (`.btnForm` / `#button-login`). */
export const PrimaryButton = styled(Button, {
  name: 'PrimaryButton',
  backgroundColor: brand.blue,
  color: brand.white,
  borderWidth: 0,
  borderRadius: 10,
  fontWeight: '600',
  cursor: 'pointer',
  hoverStyle: { backgroundColor: brand.blueSoft },
  pressStyle: { backgroundColor: '#022e4b' },
})

/** Flecha redonda de navegación de los carruseles. */
export const CarouselArrow = styled(Button, {
  name: 'CarouselArrow',
  width: 44,
  height: 44,
  borderRadius: 999,
  backgroundColor: brand.white,
  color: brand.blue,
  borderWidth: 1,
  borderColor: brand.border,
  fontSize: 20,
  fontWeight: '900',
  cursor: 'pointer',
  shadowColor: '#00000033',
  shadowRadius: 8,
  hoverStyle: { backgroundColor: brand.blue, borderColor: brand.blue },
  disabledStyle: { opacity: 0.4 },
})

/** Punto de paginación del carrusel. */
export const CarouselDot = styled(XStack, {
  name: 'CarouselDot',
  width: 10,
  height: 10,
  borderRadius: 999,
  backgroundColor: '#c9ced6',
  cursor: 'pointer',
  transition: 'quick',
  hoverStyle: { backgroundColor: brand.blueLight },
  variants: {
    active: {
      true: { backgroundColor: brand.blue, width: 26 },
    },
  } as const,
})

export const Muted = styled(Paragraph, {
  name: 'Muted',
  color: '#5b6672',
  fontSize: 16,
  textAlign: 'center',
})
