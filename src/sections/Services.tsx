import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGsap } from '../lib/gsap'
import { useTilt } from '../lib/interactions'
import { SERVICES, type Service } from '../data/services'
import { ArrowRight, Spark, Wave, Bloom, LinkIcon } from '../components/icons'

const ICONS: Record<Service['icon'], typeof Spark> = {
  spark: Spark,
  wave: Wave,
  bloom: Bloom,
  link: LinkIcon,
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useTilt(ref, 4)

  useGsap(ref, () => {
    gsap.fromTo(
      '.section-head .will-reveal',
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.section-head', start: 'top 82%', once: true },
      },
    )
    gsap.fromTo(
      '.service-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.services__grid', start: 'top 80%', once: true },
      },
    )
  })

  return (
    <section className="section services" id="servicios" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow will-reveal">Mis servicios</span>
          <h2 className="will-reveal">
            ¿Cómo podemos <em>trabajar juntos?</em>
          </h2>
          <p className="will-reveal">
            Cuatro líneas de negocio, una misma esencia: estrategia, estética y experiencias que
            dejan huella.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon]
            return (
              <article
                key={s.id}
                className="service-card tilt"
                style={
                  {
                    '--sc-accent': s.accent,
                    '--sc-soft': s.accentSoft,
                  } as React.CSSProperties
                }
              >
                <div className="service-card__top">
                  <span className="service-card__num">{s.number}</span>
                  <span className="service-card__icon">
                    <Icon />
                  </span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <Link className="service-card__link" to={`/servicios/${s.slug}`}>
                  Descubrir <ArrowRight />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
