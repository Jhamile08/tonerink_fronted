import { URL_PRODUCT, URL_PRODUCT_CREATE, URL_PRODUCT_DELETE, URL_PRODUCT_GET } from './urls'
import type { Product, ProductInput, ProductPage } from '../types/product'

/**
 * El listado es paginado (Spring Data) pero el backend ignora el parámetro
 * `page`, así que pedimos una única página grande.
 */
const PAGE_SIZE = 500

function authHeaders(token?: string | null): HeadersInit {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(detail || `HTTP ${response.status} al llamar a ${url}`)
  }

  const body = await response.text()
  return (body ? JSON.parse(body) : undefined) as T
}

export async function getProducts(): Promise<Product[]> {
  const page = await request<ProductPage>(`${URL_PRODUCT_GET}?size=${PAGE_SIZE}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  const content = page.content ?? []
  if (page.totalElements > content.length) {
    console.warn(
      `Se recibieron ${content.length} de ${page.totalElements} productos; ` +
        'habría que paginar el listado.',
    )
  }
  return content
}

export function createProduct(product: ProductInput, token: string) {
  return request<void>(URL_PRODUCT_CREATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(product),
  })
}

export function updateProduct(id: number, product: ProductInput, token: string) {
  return request<void>(`${URL_PRODUCT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify({ ...product, id }),
  })
}

export function deleteProduct(id: number, token: string) {
  return request<void>(`${URL_PRODUCT_DELETE}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders(token) },
  })
}

export type LoginResponse = { token: string }

export function login(userName: string, password: string, url: string) {
  return request<LoginResponse>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  })
}
