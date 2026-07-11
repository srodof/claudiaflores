import { useRef } from 'react'
import { gsap, useGsap } from '../lib/gsap'
import { useTilt } from '../lib/interactions'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useTilt(ref, 3)

  useGsap(ref, () => {
    gsap.fromTo(
      '.projects .section-head .will-reveal',
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.projects .section-head', start: 'top 82%', once: true },
      },
    )

    const mm = gsap.matchMedia()

    // Desktop: scroll horizontal con pin
    mm.add('(min-width: 901px)', () => {
      const track = trackRef.current!
      const getDistance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects__viewport',
          start: 'top 15%',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: '.projects',
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const bar = ref.current?.querySelector<HTMLElement>('.projects__hint-bar span')
            if (bar) bar.style.transform = `scaleX(${self.progress})`
          },
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    // Móvil: entrada escalonada de tarjetas (scroll nativo horizontal)
    mm.add('(max-width: 900px)', () => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.projects__track', start: 'top 85%', once: true },
        },
      )
    })
  })

  return (
    <section className="section projects" id="proyectos" ref={ref}>
      <div className="projects__viewport">
        <div className="container section-head">
          <span className="eyebrow will-reveal">Proyectos destacados</span>
          <h2 className="will-reveal">
            Marcas y experiencias <em>que florecieron.</em>
          </h2>
          <p className="will-reveal">
            Una selección de campañas, eventos y colaboraciones donde estrategia y sensibilidad se
            encontraron.
          </p>
        </div>

        <div className="projects__track" ref={trackRef}>
          {PROJECTS.map((p) => (
            <article className="project-card tilt" key={p.id}>
              <div className="project-card__visual" style={{ background: p.gradient }}>
                {/* TODO: reemplazar por fotografía real del proyecto */}
                <span className="project-card__monogram">{p.monogram}</span>
                <span className="project-card__year">{p.year}</span>
              </div>
              <div className="project-card__meta">
                <span className="project-card__cat">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__hint" aria-hidden>
          <span>Desliza</span>
          <div className="projects__hint-bar">
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}
