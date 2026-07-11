import { useRef, useState, type FormEvent } from 'react'
import { gsap, useGsap } from '../lib/gsap'
import { SERVICES } from '../data/services'
import { SITE, whatsappUrl } from '../data/site'
import { ArrowRight, Check, Instagram, LinkedIn, Mail, WhatsApp } from '../components/icons'

interface Errors {
  nombre?: string
  email?: string
  mensaje?: string
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  useGsap(ref, () => {
    gsap.fromTo(
      '.contact .will-reveal',
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact__grid', start: 'top 80%', once: true },
      },
    )
  })

  const validate = (data: FormData): Errors => {
    const errs: Errors = {}
    const nombre = String(data.get('nombre') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const mensaje = String(data.get('mensaje') ?? '').trim()
    if (!nombre) errs.nombre = 'Cuéntame tu nombre para saber con quién hablo.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Necesito un correo válido para responderte.'
    if (mensaje.length < 10) errs.mensaje = 'Cuéntame un poco más — al menos una frase.'
    return errs
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0]
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus()
      return
    }
    const nombre = data.get('nombre')
    const interes = data.get('interes')
    const mensaje = data.get('mensaje')
    const subject = encodeURIComponent(`Contacto web — ${nombre} (${interes})`)
    const body = encodeURIComponent(
      `Hola Claudia,\n\n${mensaje}\n\n— ${nombre}\nCorreo: ${data.get('email')}\nInterés: ${interes}`,
    )
    // Sin backend: abre el cliente de correo con todo pre-cargado.
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    setSent(true)
    form.reset()
  }

  return (
    <section className="section contact" id="contacto" ref={ref}>
      <div className="container">
        <div className="contact__grid">
          <div>
            <span className="eyebrow will-reveal">Contacto</span>
            <h2 className="contact__title will-reveal">
              Creemos algo <em>memorable.</em>
            </h2>
            <p className="contact__sub will-reveal">
              Escríbeme por el canal que prefieras — respondo personalmente. Si lo tuyo es ir al
              grano, WhatsApp es el camino más corto.
            </p>

            <div className="contact__channels">
              <a
                className="channel will-reveal"
                href={whatsappUrl('Hola Claudia, me gustaría trabajar contigo.')}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp />
                <span>
                  <small>WhatsApp</small>
                  <strong>Respuesta directa</strong>
                </span>
              </a>
              <a className="channel will-reveal" href={`mailto:${SITE.email}`}>
                <Mail />
                <span>
                  <small>Correo</small>
                  <strong>{SITE.email}</strong>
                </span>
              </a>
              <a className="channel will-reveal" href={SITE.instagram} target="_blank" rel="noreferrer">
                <Instagram />
                <span>
                  <small>Instagram</small>
                  <strong>Mi día a día</strong>
                </span>
              </a>
              <a className="channel will-reveal" href={SITE.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn />
                <span>
                  <small>LinkedIn</small>
                  <strong>Perfil profesional</strong>
                </span>
              </a>
            </div>
          </div>

          <form className="contact__form will-reveal" onSubmit={onSubmit} noValidate>
            <div className={`field ${errors.nombre ? 'has-error' : ''}`}>
              <label htmlFor="f-nombre">
                Nombre <em>*</em>
              </label>
              <input
                id="f-nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="¿Cómo te llamas?"
              />
              {errors.nombre && <p className="field__error">{errors.nombre}</p>}
            </div>

            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="f-email">
                Correo <em>*</em>
              </label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
              />
              {errors.email && <p className="field__error">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="f-interes">Me interesa</label>
              <select id="f-interes" name="interes" defaultValue={SERVICES[0].name}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Otro">Otro / aún no lo sé</option>
              </select>
            </div>

            <div className={`field ${errors.mensaje ? 'has-error' : ''}`}>
              <label htmlFor="f-mensaje">
                Mensaje <em>*</em>
              </label>
              <textarea
                id="f-mensaje"
                name="mensaje"
                placeholder="Cuéntame sobre tu proyecto, tu marca o tu idea…"
              />
              {errors.mensaje && <p className="field__error">{errors.mensaje}</p>}
            </div>

            {sent ? (
              <p className="form__status" role="status">
                <Check /> Se abrió tu correo con el mensaje listo. ¡Gracias por escribir!
              </p>
            ) : (
              <button className="btn btn--light" type="submit">
                Enviar mensaje <ArrowRight />
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
