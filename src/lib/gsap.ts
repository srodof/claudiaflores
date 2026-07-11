import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

if (import.meta.env.DEV) {
  // Para depurar desde la consola del navegador.
  ;(window as unknown as Record<string, unknown>).__gsap = gsap
  ;(window as unknown as Record<string, unknown>).__ST = ScrollTrigger
}

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Ejecuta animaciones GSAP dentro de un contexto ligado a un elemento.
 * Hace revert automático al desmontar (seguro con React StrictMode).
 * Si el usuario prefiere menos movimiento, muestra los `.will-reveal`
 * directamente y no ejecuta nada.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  fn: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return
    if (prefersReducedMotion()) {
      gsap.set(scope.current.querySelectorAll('.will-reveal'), { opacity: 1 })
      return
    }
    const ctx = gsap.context(fn, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Reveal estándar: fade + subida sutil al entrar en viewport. */
export function scrollReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  trigger?: Element | null,
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: (trigger ?? targets) as Element,
        start: 'top 82%',
        once: true,
      },
      ...vars,
    },
  )
}

/** Hook simple: revela los hijos `.will-reveal` de una sección al hacer scroll. */
export function useSectionReveal(scope: RefObject<HTMLElement | null>) {
  useGsap(scope, () => {
    const items = scope.current!.querySelectorAll<HTMLElement>('.will-reveal')
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    })
  })
}

/** Referencia + reveal en una línea para secciones sencillas. */
export function useRevealRef<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useSectionReveal(ref)
  return ref
}
