import { Link, useLocation } from 'react-router-dom'

type NavItem = { label: string; href: string }
type NavbarProps = { items: readonly NavItem[]; variant?: 'transparent' | 'solid' }

export function Navbar({ items }: NavbarProps) {
  const { pathname } = useLocation()
  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="nav-inner">
        <Link to="/" className="brand-logo" aria-label="Tonerink, inicio">
          <img src="/imgs/Toneink%20recortado.png" alt="Tonerink" />
        </Link>
        <div className="nav-links">
          {items.map(item => <Link key={item.href} to={item.href}
            className={item.href === pathname ? 'active' : undefined}>{item.label}</Link>)}
        </div>
      </div>
    </nav>
  )
}
