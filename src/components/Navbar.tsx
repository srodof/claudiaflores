import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/gsap'

import { SITE } from '../data/site'
import { Instagram, LinkedIn, TikTok } from './icons'

const LINKS = [
  { label: 'Inicio', hash: 'inicio' },
  { label: 'Sobre mí', hash: 'sobre-mi' },
  { label: 'Servicios', hash: 'servicios' },
  { label: 'Proyectos', hash: 'proyectos' },
  { label: 'Contacto', hash: 'contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Barra de progreso de lectura
  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  // Animación del menú móvil
  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const reduced = prefersReducedMotion()
    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(menu, { visibility: 'visible' })
      if (reduced) {
        gsap.set(menu, { clipPath: 'inset(0% 0 0% 0)' })
        gsap.set(menu.querySelectorAll('.mobile-menu__link, .mobile-menu__footer'), {
          y: 0,
          opacity: 1,
        })
      } else {
        gsap.to(menu, { clipPath: 'inset(0% 0 0% 0)', duration: 0.6, ease: 'power3.inOut' })
        gsap.fromTo(
          menu.querySelectorAll('.mobile-menu__link, .mobile-menu__footer'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, delay: 0.25, ease: 'power3.out' },
        )
      }
    } else {
      document.body.style.overflow = ''
      if (reduced) {
        gsap.set(menu, { clipPath: 'inset(0 0 100% 0)', visibility: 'hidden' })
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.45,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        })
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate(`/#${hash}`)
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__logo" aria-label="Claudia Andrea Flores — Inicio" onClick={() => goTo('inicio')}>
            Claudia Flores
            <small>Creative · Pilates · Experiences</small>
          </Link>

          <nav aria-label="Navegación principal">
            <ul className="nav__links">
              {LINKS.slice(1, 4).map((l) => (
                <li key={l.hash}>
                  <button className="nav__link" onClick={() => goTo(l.hash)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button className="nav__cta" onClick={() => goTo('contacto')}>
            Trabajemos juntos
          </button>

          <button
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="nav__progress" ref={progressRef} aria-hidden />
      </header>

      <div className="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menú">
        <ul className="mobile-menu__links">
          {LINKS.map((l, i) => (
            <li key={l.hash}>
              <button className="mobile-menu__link" onClick={() => goTo(l.hash)}>
                <small>0{i + 1}</small>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__footer">
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram style={{ width: 20, height: 20 }} />
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn style={{ width: 20, height: 20 }} />
          </a>
          <a href={SITE.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TikTok style={{ width: 20, height: 20 }} />
          </a>
        </div>
      </div>
    </>
  )
}
