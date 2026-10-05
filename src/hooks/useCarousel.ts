import { useCallback, useEffect, useState } from 'react'

type UseCarousel = {
  page: number
  pageCount: number
  direction: 1 | -1
  next: () => void
  previous: () => void
  goTo: (page: number) => void
}

/**
 * Paginación circular para los carruseles. `direction` sirve para que
 * `AnimatePresence` sepa hacia dónde debe entrar y salir cada slide.
 */
export function useCarousel(itemCount: number, perPage: number, autoPlayMs = 0): UseCarousel {
  const pageCount = Math.max(1, Math.ceil(itemCount / perPage))
  const [{ page, direction }, setState] = useState<{ page: number; direction: 1 | -1 }>({
    page: 0,
    direction: 1,
  })

  // Al cambiar el breakpoint cambia `perPage`, así que la página actual
  // puede quedar fuera de rango.
  useEffect(() => {
    setState((current) =>
      current.page < pageCount ? current : { page: pageCount - 1, direction: -1 },
    )
  }, [pageCount])

  const paginate = useCallback(
    (step: 1 | -1) => {
      setState((current) => ({
        page: (current.page + step + pageCount) % pageCount,
        direction: step,
      }))
    },
    [pageCount],
  )

  const next = useCallback(() => paginate(1), [paginate])
  const previous = useCallback(() => paginate(-1), [paginate])

  const goTo = useCallback((target: number) => {
    setState((current) => ({
      page: target,
      direction: target >= current.page ? 1 : -1,
    }))
  }, [])

  useEffect(() => {
    if (autoPlayMs <= 0 || pageCount < 2) return
    const timer = window.setInterval(next, autoPlayMs)
    return () => window.clearInterval(timer)
  }, [autoPlayMs, next, pageCount])

  return { page, pageCount, direction, next, previous, goTo }
}
