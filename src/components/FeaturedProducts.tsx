import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { whatsappLink } from '../types/product'

export function FeaturedProducts() {
  const { products, loading, error, reload } = useProducts()
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set())
  // Reemplazar el primer producto y descartar imágenes ausentes o que fallen al cargar.
  const candidates = products.slice(1).filter(product => product.imgProduct?.trim() && !failedImages.has(product.id))
  // Preferir variedad de marcas, usando siempre los productos reales del catálogo.
  const brands = new Set<string>()
  const selected = candidates.filter(product => {
    if (brands.has(product.brandProduct)) return false
    brands.add(product.brandProduct)
    return true
  }).slice(0, 4)
  const featured = [...selected, ...candidates.filter(p => !selected.some(s => s.id === p.id))].slice(0, 4)

  return <section className="featured-section" aria-labelledby="featured-title">
    <div className="section-heading"><h2 id="featured-title">Productos destacados</h2>
      <p>Suministros para tu oficina o empresa, de las marcas que conoces.</p></div>
    {loading ? <p className="products-status" role="status">Cargando productos…</p>
      : error ? <div className="products-status" role="alert"><p>{error}</p><button className="catalog-button" onClick={reload}>Reintentar</button></div>
      : featured.length === 0 ? <p className="products-status">Pronto encontrarás más productos aquí. Contáctanos para asesorarte.</p>
      : <div className="featured-grid">{featured.map(product => <article className="featured-card" key={product.id}>
        <div className="featured-image"><img src={product.imgProduct} alt={product.nameProduct} loading="lazy"
          onError={() => setFailedImages(previous => new Set(previous).add(product.id))} /></div>
        <span className="product-brand">{product.brandProduct} · {product.qualityProduct === 'ORIGINAL' ? 'Original' : 'Compatible'}</span>
        <h3>{product.nameProduct}</h3>
        <p>{product.compatibilityProduct}</p>
        <a className="product-quote" href={whatsappLink(product.nameProduct)} target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp" aria-hidden="true" /> Consultar producto</a>
      </article>)}</div>}
    <Link className="all-products-link" to="/catalogo">Ver todo el catálogo <span aria-hidden="true">→</span></Link>
  </section>
}
