import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'

/** Al cambiar de ruta: sube al inicio (o al ancla del hash) y refresca ScrollTrigger. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const firstLoad = useRef(true)

  useEffect(() => {
    // En la carga inicial el salto al ancla es instantáneo (deep link);
    // en navegaciones posteriores dentro del sitio, suave.
    const behavior: ScrollBehavior = firstLoad.current ? 'auto' : 'smooth'
    firstLoad.current = false
    if (hash) {
      // Espera un frame para que la sección exista tras el render.
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}
