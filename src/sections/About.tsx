import { useRef } from 'react'
import { gsap, useGsap } from '../lib/gsap'
import aboutPhoto from '../assets/photos/claudia-about.webp'

const PILLARS = [
  { name: 'Marketing', hint: 'Posicionamiento que conecta y convierte' },
  { name: 'Wellness', hint: 'Bienestar como estilo de vida y de marca' },
  { name: 'Experiencias', hint: 'Momentos que la gente no olvida' },
  { name: 'Estrategia', hint: 'Decisiones creativas con visión de negocio' },
  { name: 'Contenido', hint: 'Historias que se sienten reales' },
]

const STATS = [
  { value: 3, suffix: '+', label: 'Años de experiencia' },
  { value: 7, suffix: '+', label: 'Proyectos destacados' },
  { value: 4, suffix: '', label: 'Líneas de negocio' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, () => {
    gsap.utils.toArray<HTMLElement>('.will-reveal', ref.current!).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    })

    gsap.fromTo(
      '.pillar',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.pillars', start: 'top 82%', once: true },
      },
    )

    // Contadores: el markup ya trae el valor final (accesible sin JS/motion);
    // aquí solo se anima desde 0 como mejora progresiva.
    gsap.utils.toArray<HTMLElement>('.stat__num b', ref.current!).forEach((el) => {
      const target = Number(el.dataset.value ?? 0)
      const obj = { n: 0 }
      el.textContent = '0'
      gsap.to(obj, {
        n: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.n))
        },
      })
    })
  })

  return (
    <section className="section" id="sobre-mi" ref={ref}>
      <div className="container">
        <div className="about__grid">
          <div className="about__sticky">
            <span className="eyebrow will-reveal">Sobre mí</span>
            <h2 className="about__statement will-reveal">
              No elegí entre el marketing y el bienestar. <em>Los uní.</em>
            </h2>
            <figure className="about__portrait will-reveal">
              <img
                src={aboutPhoto}
                alt="Claudia Andrea Flores, retrato"
                width="700"
                height="879"
                loading="lazy"
              />
              <figcaption>Claudia Andrea Flores</figcaption>
            </figure>
          </div>

          <div className="about__body">
            <p className="will-reveal">
              Durante años viví en dos mundos: el de las <strong>marcas y la estrategia</strong>,
              donde aprendí a construir historias que venden; y el del{' '}
              <strong>movimiento y el bienestar</strong>, donde descubrí que la conexión más
              poderosa es la que pasa por el cuerpo.
            </p>
            <p className="will-reveal">
              Hoy esos dos mundos son uno. Ayudo a empresas y personas a comunicar con intención,
              diseño experiencias que reúnen comunidades y acompaño a la gente a moverse mejor —
              porque una marca, igual que un cuerpo, necesita <strong>coherencia, energía y
              propósito</strong>.
            </p>
            <p className="will-reveal">
              Esta web es el paraguas de todo lo que hago. Cinco disciplinas, una sola forma de
              trabajar: con estrategia, con estética y con alma.
            </p>

            <ul className="pillars">
              {PILLARS.map((p, i) => (
                <li className="pillar" key={p.name}>
                  <span className="pillar__num">0{i + 1}</span>
                  <span className="pillar__name">{p.name}</span>
                  <span className="pillar__hint">{p.hint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">
                <b data-value={s.value}>{s.value}</b>
                {s.suffix && <sup>{s.suffix}</sup>}
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
