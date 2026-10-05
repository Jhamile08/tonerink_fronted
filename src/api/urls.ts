/**
 * En producción se llama directamente a la API. En desarrollo se usa el proxy
 * de Vite (`/api`) porque la API no habilita CORS para localhost.
 * `VITE_API_BASE` permite apuntar a otro backend sin tocar el código.
 */
export const URL_BASE =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.DEV ? '/api' : 'https://api.tonerinksas.com')

export const URL_PRODUCT = `${URL_BASE}/product`
export const URL_PRODUCT_CREATE = `${URL_BASE}/product/add`
export const URL_PRODUCT_GET = `${URL_BASE}/product/get`
export const URL_PRODUCT_DELETE = `${URL_BASE}/product/delete`
export const URL_AUTH = `${URL_BASE}/auth/login`
