import type { ReactNode } from 'react'
import { AnimatePresence, XStack, YStack, useMedia } from 'tamagui'
import { CarouselArrow, CarouselDot } from './ui'
import { useCarousel } from '../hooks/useCarousel'

type CarouselProps<T> = {
  items: readonly T[]
  /** Clave estable por elemento, para que React no reutilice nodos al paginar. */
  itemKey: (item: T, index: number) => string
  renderItem: (item: T) => ReactNode
  /** Cuántas tarjetas se muestran por página, de móvil a escritorio. */
  perPage?: { base: number; sm: number; md: number; lg: number }
  gap?: number
  autoPlayMs?: number
}

export function Carousel<T>({
  items,
  itemKey,
  renderItem,
  perPage = { base: 1, sm: 2, md: 3, lg: 3 },
  gap = 24,
  autoPlayMs = 0,
}: CarouselProps<T>) {
  const media = useMedia()

  const visible = media.xl
    ? perPage.lg
    : media.md
      ? perPage.md
      : media.sm
        ? perPage.sm
        : perPage.base

  const { page, pageCount, direction, next, previous, goTo } = useCarousel(
    items.length,
    visible,
    autoPlayMs,
  )

  const slice = items.slice(page * visible, page * visible + visible)
  const offset = direction > 0 ? 60 : -60

  return (
    <YStack width="100%" gap="$4">
      <XStack alignItems="center" gap="$3" width="100%">
        <CarouselArrow
          aria-label="Anterior"
          onPress={previous}
          disabled={pageCount < 2}
          $maxSm={{ display: 'none' }}
        >
          ‹
        </CarouselArrow>

        <YStack flex={1} overflow="hidden">
          <AnimatePresence initial={false} custom={{ offset }}>
            <XStack
              key={page}
              gap={gap}
              width="100%"
              transition="medium"
              x={0}
              opacity={1}
              enterStyle={{ x: offset, opacity: 0 }}
              exitStyle={{ position: 'absolute', x: -offset, opacity: 0 }}
              $maxSm={{ flexDirection: 'column' }}
            >
              {slice.map((item, index) => (
                <YStack key={itemKey(item, index)} flex={1} minWidth={0}>
                  {renderItem(item)}
                </YStack>
              ))}
              {/* Rellena la última página para que las tarjetas no se estiren. */}
              {Array.from({ length: visible - slice.length }, (_, index) => (
                <YStack key={`spacer-${index}`} flex={1} minWidth={0} $maxSm={{ display: 'none' }} />
              ))}
            </XStack>
          </AnimatePresence>
        </YStack>

        <CarouselArrow
          aria-label="Siguiente"
          onPress={next}
          disabled={pageCount < 2}
          $maxSm={{ display: 'none' }}
        >
          ›
        </CarouselArrow>
      </XStack>

      <XStack justifyContent="center" alignItems="center" gap="$2">
        {Array.from({ length: pageCount }, (_, index) => (
          <CarouselDot
            key={index}
            active={index === page}
            onPress={() => goTo(index)}
            role="button"
            aria-label={`Ir a la página ${index + 1}`}
          />
        ))}
      </XStack>

      <XStack justifyContent="center" gap="$4" display="none" $maxSm={{ display: 'flex' }}>
        <CarouselArrow aria-label="Anterior" onPress={previous} disabled={pageCount < 2}>
          ‹
        </CarouselArrow>
        <CarouselArrow aria-label="Siguiente" onPress={next} disabled={pageCount < 2}>
          ›
        </CarouselArrow>
      </XStack>
    </YStack>
  )
}
