import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../api/client'
import type { Product } from '../types/product'

type UseProducts = {
  products: Product[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useProducts(): UseProducts {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    getProducts()
      .then((loaded) => {
        if (!active) return
        setProducts(loaded)
      })
      .catch((cause: unknown) => {
        if (!active) return
        console.error('No se pudieron cargar los productos:', cause)
        setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [nonce])

  return { products, loading, error, reload }
}
