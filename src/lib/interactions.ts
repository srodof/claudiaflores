import { useLayoutEffect, type RefObject } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Parallax de profundidad con el mouse: los hijos con [data-depth] se
 * desplazan proporcionalmente a la distancia del cursor al centro.
 * depth positivo = sigue al cursor; negativo = se aleja (capa profunda).
 */
export function useMouseParallax(scope: RefObject<HTMLElement | null>, activateAfterMs = 0) {
  useLayoutEffect(() => {
    const el = scope.current
    if (!el || !finePointer() || prefersReducedMotion()) return

    let layers: {
      node: HTMLElement
      depth: number
      toX: (v: number) => void
      toY: (v: number) => void
    }[] = []

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5 // -0.5 .. 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      layers.forEach((l) => {
        l.toX(nx * l.depth * 60)
        l.toY(ny * l.depth * 40)
      })
    }
    const onLeave = () => layers.forEach((l) => (l.toX(0), l.toY(0)))

    // Se activa después de la animación de entrada para no pelear por `y`.
    const timer = window.setTimeout(() => {
      layers = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map((node) => ({
        node,
        depth: Number(node.dataset.depth ?? 0),
        toX: gsap.quickTo(node, 'x', { duration: 0.9, ease: 'power3.out' }),
        toY: gsap.quickTo(node, 'y', { duration: 0.9, ease: 'power3.out' }),
      }))
      el.addEventListener('mousemove', onMove, { passive: true })
      el.addEventListener('mouseleave', onLeave, { passive: true })
    }, activateAfterMs)

    return () => {
      window.clearTimeout(timer)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      layers.forEach((l) => gsap.set(l.node, { x: 0, y: 0 }))
    }
  }, [scope, activateAfterMs])
}

/**
 * Botones magnéticos: los elementos `.magnetic` dentro del scope se
 * inclinan hacia el cursor y regresan con rebote elástico al salir.
 */
export function useMagnetic(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !finePointer() || prefersReducedMotion()) return

    const items = Array.from(root.querySelectorAll<HTMLElement>('.magnetic'))
    const cleanups = items.map((item) => {
      const toX = gsap.quickTo(item, 'x', { duration: 0.35, ease: 'power3.out' })
      const toY = gsap.quickTo(item, 'y', { duration: 0.35, ease: 'power3.out' })
      const onMove = (e: MouseEvent) => {
        const r = item.getBoundingClientRect()
        toX((e.clientX - (r.left + r.width / 2)) * 0.28)
        toY((e.clientY - (r.top + r.height / 2)) * 0.28)
      }
      const onLeave = () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      }
      item.addEventListener('mousemove', onMove, { passive: true })
      item.addEventListener('mouseleave', onLeave, { passive: true })
      return () => {
        item.removeEventListener('mousemove', onMove)
        item.removeEventListener('mouseleave', onLeave)
        gsap.set(item, { x: 0, y: 0 })
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [scope])
}

/**
 * Tilt 3D sutil en tarjetas: rotateX/rotateY siguiendo al cursor,
 * con restauración suave al salir. Aplica a `.tilt` dentro del scope.
 */
export function useTilt(scope: RefObject<HTMLElement | null>, maxDeg = 5) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !finePointer() || prefersReducedMotion()) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.tilt'))
    const cleanups = cards.map((card) => {
      gsap.set(card, { transformPerspective: 900 })
      const toRX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' })
      const toRY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' })
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        toRY(nx * maxDeg * 2)
        toRX(-ny * maxDeg * 2)
      }
      const onLeave = () => {
        toRX(0)
        toRY(0)
      }
      card.addEventListener('mousemove', onMove, { passive: true })
      card.addEventListener('mouseleave', onLeave, { passive: true })
      return () => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
        gsap.set(card, { rotationX: 0, rotationY: 0 })
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [scope, maxDeg])
}
