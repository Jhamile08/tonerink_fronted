import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../types/product'

export function Footer() {
  return <>
    <section className="quote-section" aria-label="Solicitar cotización">
      <div className="quote-banner">
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        <div><h2>¿Necesitas una cotización?</h2><p>Contáctanos por WhatsApp y recibe asesoría inmediata.</p></div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">Cotizar ahora <span aria-hidden="true">→</span></a>
      </div>
    </section>
    <footer id="footer" className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><Link to="/"><img src="/imgs/Toneink%20recortado.png" alt="Tonerink" /></Link><p>Suministros de impresión para empresas y oficinas. Tóneres, cartuchos y más de las mejores marcas.</p></div>
        <div><h3>Enlaces</h3><Link to="/">Inicio</Link><Link to="/catalogo">Productos</Link><Link to="/#about-us">Nosotros</Link><Link to="/#footer">Contacto</Link></div>
        <div><h3>Contáctanos</h3><a href="mailto:comercial.tonerink@gmail.com">comercial.tonerink@gmail.com</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">+57 319-580-65-83</a><a href="tel:+573187317450">+57 318-731-74-50</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Tonerink S.A.S. Todos los derechos reservados.</span><Link to="/login">Acceso administrador</Link></div>
    </footer>
  </>
}
