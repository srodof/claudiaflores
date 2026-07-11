// ── Datos de contacto y redes ──────────────────────────────────────────────
// TODO: reemplazar con los datos reales de Claudia antes de publicar.
export const SITE = {
  name: 'Claudia Andrea Flores',
  shortName: 'Claudia Flores',
  roles: ['Consultora Creativa', 'Coach de Pilates', 'Creadora de Experiencias'],
  email: 'hola@claudiaflores.com',
  whatsapp: '59170000000', // solo dígitos, con código de país
  instagram: 'https://instagram.com/claudiaflores',
  linkedin: 'https://linkedin.com/in/claudiaflores',
  tiktok: 'https://tiktok.com/@claudiaflores',
} as const

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`
