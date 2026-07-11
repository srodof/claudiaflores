import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGsap } from '../lib/gsap'
import { useMagnetic, useMouseParallax } from '../lib/interactions'
import { SERVICES } from '../data/services'
import { ArrowRight } from '../components/icons'
import heroPhoto from '../assets/photos/claudia-hero.webp'

const ROTATING = ['movimiento.', 'contenido.', 'bienestar.', 'experiencias.']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useMouseParallax(ref, 2400)
  useMagnetic(ref)

  useGsap(ref, () => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(
      '.hero__title .line > span',
      { yPercent: 105 },
      { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
    )
      .fromTo(
        ['.hero__eyebrow', '.hero__rotator', '.hero__intro', '.hero__actions'],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 },
        '-=0.7',
      )
      .fromTo(
        '.hero__arch',
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.9',
      )
      .fromTo(
        '.hero__watermark',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.8',
      )
      .fromTo(
        '.hero__photo',
        { clipPath: 'inset(100% 0 0 0)', y: 60 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.9',
      )
      .fromTo(
        '.hero__chip, .hero__portrait-caption',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.1 },
        '-=0.5',
      )
      .fromTo(
        '.hero__quicklink',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 },
        '-=0.5',
      )

    // Palabra rotativa
    const word = wordRef.current!
    let i = 0
    const cycle = gsap.timeline({ repeat: -1, repeatDelay: 2.1, delay: 2 })
    cycle
      .to(word, {
        yPercent: -60,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          i = (i + 1) % ROTATING.length
          word.textContent = ROTATING[i]
        },
      })
      .fromTo(
        word,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      )

    // Parallax de scroll: la foto y el arco se separan sutilmente al bajar
    gsap.to('.hero__stage', {
      yPercent: 8,
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
    })
    gsap.to('.hero__blob--1', {
      yPercent: 25,
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
    })
    gsap.to('.hero__blob--2', {
      yPercent: -20,
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
    })
  })

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero__blob hero__blob--1" aria-hidden />
      <div className="hero__blob hero__blob--2" aria-hidden />

      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow will-reveal">
              Consultora Creativa <i>·</i> Coach de Pilates <i>·</i> Creadora de Experiencias
            </p>

            <h1 className="hero__title">
              <span className="line">
                <span>Claudia</span>
              </span>
              <span className="line">
                <span>
                  Andrea <em>Flores</em>
                </span>
              </span>
            </h1>

            <p className="hero__rotator will-reveal">
              <span className="hero__rotator-label">Marcas que se elevan con</span>
              <span className="hero__rotator-word" ref={wordRef}>
                {ROTATING[0]}
              </span>
            </p>

            <p className="hero__intro will-reveal">
              Estrategia, bienestar y creatividad en una sola voz — para que marcas y personas
              comuniquen con intención, se muevan con propósito y creen experiencias que nadie
              olvida.
            </p>

            <div className="hero__actions will-reveal">
              <a
                className="btn btn--primary magnetic"
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                ¿Cómo trabajamos juntos? <ArrowRight />
              </a>
              <a
                className="btn btn--ghost magnetic"
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Ver proyectos
              </a>
            </div>
          </div>

          <div className="hero__stage">
            <span className="hero__watermark" data-depth="-0.35" aria-hidden>
              Flores
            </span>
            <div className="hero__arch" data-depth="-0.15" aria-hidden />
            <img
              className="hero__photo"
              src={heroPhoto}
              alt="Claudia Andrea Flores"
              width="900"
              height="1600"
              data-depth="0.12"
              fetchPriority="high"
            />
            <span className="hero__chip hero__chip--1" data-depth="0.45" aria-hidden>
              Estrategia
            </span>
            <span className="hero__chip hero__chip--2" data-depth="0.6" aria-hidden>
              Pilates
            </span>
            <span className="hero__chip hero__chip--3" data-depth="0.5" aria-hidden>
              Experiencias
            </span>
            <p className="hero__portrait-caption" data-depth="0.3">
              Hola, soy <span>Clau</span>
            </p>
          </div>
        </div>

        <div className="hero__quicklinks">
          {SERVICES.map((s) => (
            <Link key={s.id} to={`/servicios/${s.slug}`} className="hero__quicklink">
              <small>{s.number}</small>
              <strong>
                {s.shortName} <ArrowRight />
              </strong>
            </Link>
          ))}
        </div>
      </div>

      <p className="hero__scroll" aria-hidden>
        Descubre
      </p>
    </section>
  )
}
