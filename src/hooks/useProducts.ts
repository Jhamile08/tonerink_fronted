import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../api/client'
import { demoProducts } from '../data/demoProducts.js'
import type { Product } from '../types/product'

type UseProducts = {
  products: Product[]
  isDemo: boolean
  loading: boolean
  error: string | null
  reload: () => void
}

export function useProducts({ fallback = true }: { fallback?: boolean } = {}): UseProducts {
  const [products, setProducts] = useState<Product[]>([])
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    setLoading(true)
    setError(null)

    getProducts(controller.signal)
      .then((loaded) => {
        if (!active) return
        setIsDemo(false)
        setProducts(loaded)
      })
      .catch((cause: unknown) => {
        if (!active) return
        console.error('No se pudieron cargar los productos:', cause)
        if (fallback) {
          setProducts(demoProducts)
          setIsDemo(true)
        } else {
          setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.')
        }
      })
      .finally(() => {
        clearTimeout(timeout)
        if (active) setLoading(false)
      })

    return () => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    }
  }, [nonce, fallback])

  return { products, isDemo, loading, error, reload }
}
