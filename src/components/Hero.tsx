import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'

const HOME_NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/catalogo' },
  { label: 'Nosotros', href: '/#about-us' },
  { label: 'Contacto', href: '/#footer' },
] as const

export function Hero() {
  return (
    <header id="inicio">
      <Navbar items={HOME_NAV} />
      <section className="home-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">SUMINISTROS DE IMPRESIÓN</span>
            <h1>Todo para tu impresora,<br />en un solo lugar</h1>
            <p>Tóneres, cartuchos y suministros de las mejores marcas, con asesoría especializada.</p>
            <Link className="catalog-button" to="/catalogo">Explorar productos <span aria-hidden="true">→</span></Link>
            <div className="hero-benefits">
              <span><i className="fa-solid fa-shield-halved" aria-hidden="true" />Productos originales<br />y compatibles</span>
              <span><i className="fa-solid fa-headset" aria-hidden="true" />Asesoría<br />especializada</span>
              <span><i className="fa-solid fa-truck-fast" aria-hidden="true" />Envíos a<br />toda Colombia</span>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-printer" src="/imgs/portada3.png" alt="Impresora multifuncional en funcionamiento" />
            <div className="hero-product"><img src="/imgs/original%20toner%20hp%20105a.webp" alt="Tóner original HP 105A" /><span>Las mejores marcas<br /><strong>para cada impresión.</strong></span></div>
          </div>
        </div>
      </section>
    </header>
  )
}
