import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import { Menu, X } from 'lucide-react'
import { asset } from '../utils/asset'

const links = [
  { id: 'skills', href: '#skills', label: 'Skills' },
  { id: 'tools', href: '#tools', label: 'Tools' },
  { id: 'projects', href: '#projects', label: 'Projects' },
  { id: 'designs', href: '#designs', label: 'Designs' },
  { id: 'contact', href: '#contact', label: 'Contact' },
]

const mobileLinks = [{ id: 'top', href: '#top', label: 'Home' }, ...links]

const LOGO_DARK = asset('logo-ganesh-dark.png')
const LOGO_LIGHT = asset('logo-ganesh-light.png?v=3')

export default function Navbar() {
  const [light, setLight] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const sectionIds = ['top', ...links.map((l) => l.id)]

    const onScroll = () => {
      setLight(window.scrollY > window.innerHeight * 0.85)

      const offset = window.innerHeight * 0.35
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) current = id
      }
      setActive(current === 'top' ? '' : current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <Box
      component="header"
      className={`nav ${light ? 'is-light' : ''} ${open ? 'is-open' : ''}`}
    >
      <Link href="#top" className="nav-brand" onClick={close} aria-label="Ganesh home">
        <Box
          component="img"
          className="nav-logo"
          src={light ? LOGO_LIGHT : LOGO_DARK}
          alt="Ganesh"
        />
      </Link>

      <Box className="nav-links-desktop" component="nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={active === l.id ? 'is-active' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </Box>

      <IconButton
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        sx={{ color: 'inherit' }}
      >
        <Menu size={22} />
      </IconButton>

      <Box
        className={`nav-menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={close}
      >
        <Box
          className="nav-menu-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <Box className="nav-menu-links" component="nav">
            {mobileLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                underline="none"
                className={
                  l.id === 'top'
                    ? active === '' || active === 'top'
                      ? 'is-active is-home'
                      : 'is-home'
                    : active === l.id
                      ? 'is-active'
                      : undefined
                }
                onClick={close}
                sx={{ color: 'inherit' }}
              >
                {l.label}
              </Link>
            ))}
          </Box>
          <IconButton
            className="nav-menu-close"
            aria-label="Close menu"
            onClick={close}
            sx={{ color: 'inherit' }}
          >
            <X size={22} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
