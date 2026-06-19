import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Enredo', path: '/enredo' },
  { label: 'Famílias Alfa', path: '/familias/alfa' },
  { label: 'Famílias Beta', path: '/familias/beta' },
  { label: 'Famílias Gama', path: '/familias/gama' },
  { label: 'Cenários', path: '/cenarios' },
  { label: 'Contato', path: '/contato' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandTitle}>Mônaco</span>
          <span className={styles.brandSub}>The Paradise On Earth</span>
        </NavLink>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
