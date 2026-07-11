import { whatsappUrl } from '../data/site'
import { WhatsApp } from './icons'

export default function WhatsAppFab() {
  return (
    <a
      className="fab-whatsapp"
      href={whatsappUrl('Hola Claudia, vi tu página web y me gustaría conversar contigo.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <WhatsApp />
    </a>
  )
}
