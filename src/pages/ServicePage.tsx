import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gsap, useGsap } from '../lib/gsap'
import { SERVICES, getServiceBySlug } from '../data/services'
import { whatsappUrl } from '../data/site'
import { ArrowRight, People } from '../components/icons'

export default function ServicePage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug ?? '')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (service) {
      document.title = `${service.name} — Claudia Andrea Flores`
    }
    return () => {
      document.title = 'Claudia Andrea Flores — Consultora Creativa · Pilates · Experiencias'
    }
  }, [service])

  useGsap(
    ref,
    () => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        '.svc-hero__inner > *',
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09 },
      )
      gsap.fromTo(
        '.inc-item',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.inc-list', start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        '.svc-cta > .container > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.svc-cta', start: 'top 75%', once: true },
        },
      )
    },
    [service?.id],
  )

  if (!service) return <Navigate to="/" replace />

  const idx = SERVICES.findIndex((s) => s.id === service.id)
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length]
  const next = SERVICES[(idx + 1) % SERVICES.length]
  const isBrochure = service.cta.download

  return (
    <div
      ref={ref}
      style={
        {
          '--svc-accent': service.accent,
          '--svc-soft': service.accentSoft,
        } as React.CSSProperties
      }
    >
      <section className="svc-hero">
        <div className="svc-hero__bg" aria-hidden />
        <div className="container svc-hero__inner">
          <Link to="/#servicios" className="svc-hero__back">
            <ArrowRight /> Todos los servicios
          </Link>
          <p className="svc-hero__num">{service.number} / 04</p>
          <h1 className="svc-hero__title">{service.name}</h1>
          <p className="svc-hero__tag">{service.tagline}</p>
          <p className="svc-hero__audience">
            <People /> {service.audience}
          </p>
        </div>
      </section>

      <section className="section svc-includes">
        <div className="container svc-includes__grid">
          <div className="svc-includes__sticky">
            <span className="eyebrow">Qué incluye</span>
            <p className="svc-includes__desc">{service.description}</p>
          </div>
          <ul className="inc-list">
            {service.includes.map((inc) => (
              <li className="inc-item" key={inc.title}>
                <div>
                  <h3>{inc.title}</h3>
                  <p>{inc.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section svc-cta">
        <div className="container">
          <h2>
            ¿Te imaginas esto <em>para tu marca?</em>
          </h2>
          <p>
            {isBrochure
              ? 'Descarga el material con todos los detalles, o escríbeme directamente y lo conversamos.'
              : 'Escríbeme y encontramos juntos el formato ideal para ti o tu equipo.'}
          </p>
          <div className="svc-cta__actions">
            {isBrochure ? (
              /* TODO: enlazar el PDF real del brochure/media kit */
              <a className="btn btn--light" href={service.cta.href}>
                {service.cta.label} <ArrowRight />
              </a>
            ) : (
              <a
                className="btn btn--light"
                href={whatsappUrl(`Hola Claudia, quiero conocer más sobre ${service.name}.`)}
                target="_blank"
                rel="noreferrer"
              >
                {service.cta.label} <ArrowRight />
              </a>
            )}
            <a
              className="btn btn--ghost"
              style={{ borderColor: 'rgba(245,239,230,0.3)', color: 'var(--paper-on-dark)' }}
              href={whatsappUrl(`Hola Claudia, me interesa ${service.name}.`)}
              target="_blank"
              rel="noreferrer"
            >
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <nav className="svc-next" aria-label="Otros servicios">
        <Link to={`/servicios/${prev.slug}`}>
          <small>← Anterior</small>
          <strong>{prev.shortName}</strong>
        </Link>
        <Link to={`/servicios/${next.slug}`}>
          <small>Siguiente →</small>
          <strong>{next.shortName}</strong>
        </Link>
      </nav>
    </div>
  )
}
