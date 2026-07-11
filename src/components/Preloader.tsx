import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { SITE } from '../data/site'

const KEY = 'cf_intro_seen'

export default function Preloader() {
  const [gone, setGone] = useState(
    () => sessionStorage.getItem(KEY) === '1' || prefersReducedMotion(),
  )
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (gone || !ref.current) return
    sessionStorage.setItem(KEY, '1')
    const letters = ref.current.querySelectorAll('.preloader__name span')
    const tl = gsap.timeline({
      onComplete: () => setGone(true),
    })
    tl.fromTo(
      letters,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.035 },
    )
      .to('.preloader__roles', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to(ref.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.55,
      })
    return () => {
      tl.kill()
    }
  }, [gone])

  if (gone) return null

  return (
    <div className="preloader" ref={ref} aria-hidden>
      <div className="preloader__name">
        {SITE.name.split('').map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
      <p className="preloader__roles">{SITE.roles.join(' · ')}</p>
    </div>
  )
}
