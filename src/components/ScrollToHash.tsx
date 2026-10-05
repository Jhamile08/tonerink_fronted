import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Los enlaces del menú siguen siendo anclas (`/#inicio`, `#about-us`).
 * React Router cambia la URL pero no desplaza la página, así que lo hacemos aquí.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    // Espera un frame para que la sección ya esté montada.
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
