/**
 * Se usa el proxy del mismo origen: Vite en desarrollo y nginx en producción.
 * `VITE_API_BASE` permite apuntar a otro backend durante la compilación.
 */
export const URL_BASE =
  (import.meta.env.VITE_API_BASE?.trim() || '/api').replace(/\/+$/, '')

export const URL_PRODUCT = `${URL_BASE}/product`
export const URL_PRODUCT_CREATE = `${URL_BASE}/product/add`
export const URL_PRODUCT_GET = `${URL_BASE}/product/get`
export const URL_PRODUCT_DELETE = `${URL_BASE}/product/delete`
export const URL_AUTH = `${URL_BASE}/auth/login`
