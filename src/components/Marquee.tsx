import { Asterisk } from './icons'

const WORDS = [
  'Estrategia',
  'Contenido',
  'Pilates',
  'Wellness',
  'Eventos',
  'Experiencias',
  'Marca Personal',
  'Dirección Creativa',
]

export default function Marquee() {
  const row = (hidden: boolean) => (
    <div className="marquee__row" aria-hidden={hidden}>
      {WORDS.map((w) => (
        <span key={w} className="marquee__item">
          {w}
          <Asterisk />
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
