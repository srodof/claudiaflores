import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion, useGsap } from '../lib/gsap'
import { SERVICES, type ServiceId } from '../data/services'
import { whatsappUrl } from '../data/site'
import { ArrowRight } from '../components/icons'

interface Option {
  label: string
  votes: ServiceId[]
}

interface Question {
  q: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    q: '¿Para quién estás buscando algo?',
    options: [
      { label: 'Para mi empresa o mi equipo', votes: ['consultoria', 'sculpt'] },
      { label: 'Para mi marca personal', votes: ['consultoria'] },
      { label: 'Para mí — quiero moverme y sentirme mejor', votes: ['sculpt'] },
      { label: 'Para mi marca — busco una colaboración', votes: ['mediakit'] },
    ],
  },
  {
    q: '¿Qué te gustaría lograr?',
    options: [
      { label: 'Posicionarme y vender con contenido', votes: ['consultoria'] },
      { label: 'Bienestar y movimiento consciente', votes: ['sculpt'] },
      { label: 'Un evento o experiencia memorable', votes: ['flore'] },
      { label: 'Una campaña con una creadora real', votes: ['mediakit'] },
    ],
  },
  {
    q: '¿Cómo te imaginas el primer paso?',
    options: [
      { label: 'Una estrategia clara sobre la mesa', votes: ['consultoria'] },
      { label: 'Una clase o un programa de Pilates', votes: ['sculpt'] },
      { label: 'Una propuesta creativa de experiencia', votes: ['flore'] },
      { label: 'Ver números, audiencia y formatos', votes: ['mediakit'] },
    ],
  },
]

export default function Quiz() {
  const ref = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<ServiceId, number>>({
    consultoria: 0,
    sculpt: 0,
    flore: 0,
    mediakit: 0,
  })
  const [done, setDone] = useState(false)

  useGsap(ref, () => {
    gsap.fromTo(
      '.quiz__card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.quiz__card', start: 'top 82%', once: true },
      },
    )
  })

  const animateSwap = (update: () => void) => {
    const inner = cardRef.current?.querySelector('.quiz__inner')
    if (!inner || prefersReducedMotion()) {
      update()
      return
    }
    gsap.to(inner, {
      opacity: 0,
      y: -16,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        update()
        gsap.fromTo(
          inner,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        )
      },
    })
  }

  const pick = (opt: Option) => {
    const next = { ...scores }
    opt.votes.forEach((id) => {
      next[id] += 1
    })
    animateSwap(() => {
      setScores(next)
      if (step + 1 >= QUESTIONS.length) setDone(true)
      else setStep(step + 1)
    })
  }

  const back = () => {
    animateSwap(() => {
      // Reiniciar es más honesto que deshacer votos parciales.
      if (done) {
        setDone(false)
        setStep(0)
        setScores({ consultoria: 0, sculpt: 0, flore: 0, mediakit: 0 })
      } else if (step > 0) {
        setStep(0)
        setScores({ consultoria: 0, sculpt: 0, flore: 0, mediakit: 0 })
      }
    })
  }

  const winner = SERVICES.reduce((best, s) =>
    scores[s.id] > scores[best.id] ? s : best,
  )

  return (
    <section className="section" id="quiz" ref={ref}>
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            ¿No sabes por dónde empezar?
          </span>
          <h2>
            Encuentra tu <em>punto de partida</em>
          </h2>
          <p style={{ marginInline: 'auto' }}>
            Tres preguntas, treinta segundos. Te digo cuál de mis servicios encaja contigo.
          </p>
        </div>

        <div className="quiz__card" ref={cardRef}>
          <div className="quiz__progress" aria-hidden>
            {QUESTIONS.map((_, i) => (
              <span key={i} className={i < step || done ? 'is-done' : ''} />
            ))}
          </div>

          <div className="quiz__inner">
            {!done ? (
              <>
                <p className="quiz__step-label">
                  Pregunta {step + 1} de {QUESTIONS.length}
                </p>
                <h3 className="quiz__question">{QUESTIONS[step].q}</h3>
                <div className="quiz__options">
                  {QUESTIONS[step].options.map((o) => (
                    <button key={o.label} className="quiz__option" onClick={() => pick(o)}>
                      {o.label}
                      <ArrowRight />
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button className="quiz__back" onClick={back}>
                    <ArrowRight /> Volver a empezar
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p className="quiz__result-eyebrow">Tu punto de partida ideal</p>
                <h3 className="quiz__result-name" style={{ color: winner.accent }}>
                  {winner.name}
                </h3>
                <p className="quiz__result-tag" style={{ marginInline: 'auto' }}>
                  {winner.tagline}
                </p>
                <div className="quiz__result-actions" style={{ justifyContent: 'center' }}>
                  <Link className="btn btn--primary" to={`/servicios/${winner.slug}`}>
                    Conocer más <ArrowRight />
                  </Link>
                  <a
                    className="btn btn--ghost"
                    href={whatsappUrl(
                      `Hola Claudia, hice el quiz de tu web y mi resultado fue "${winner.name}". Me gustaría conversar.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hablemos por WhatsApp
                  </a>
                </div>
                <button className="quiz__back" onClick={back}>
                  <ArrowRight /> Volver a empezar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
