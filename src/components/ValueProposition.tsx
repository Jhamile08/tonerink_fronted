const VALUES = [
  { icon: 'fa-solid fa-shield-halved', title: 'Calidad garantizada', text: 'Suministros de marcas confiables, originales y compatibles.' },
  { icon: 'fa-solid fa-headset', title: 'Asesoría personalizada', text: 'Te ayudamos a elegir el producto ideal para tu impresora.' },
  { icon: 'fa-solid fa-truck-fast', title: 'Envíos nacionales', text: 'Llegamos a diferentes ciudades de Colombia.' },
]
export function ValueProposition() {
  return <section id="about-us" className="value-section">
    <div className="section-heading"><h2>¿Por qué elegir Tonerink?</h2></div>
    <div className="value-grid">{VALUES.map(value => <div className="value-item" key={value.title}>
      <span className="value-icon"><i className={value.icon} aria-hidden="true" /></span>
      <div><h3>{value.title}</h3><p>{value.text}</p></div>
    </div>)}</div>
  </section>
}
