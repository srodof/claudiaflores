export type ServiceId = 'consultoria' | 'sculpt' | 'flore' | 'mediakit'

export interface Service {
  id: ServiceId
  number: string
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  audience: string
  includes: { title: string; detail: string }[]
  cta: { label: string; href: string; download?: boolean }
  accent: string
  accentSoft: string
  icon: 'spark' | 'wave' | 'bloom' | 'link'
}

// TODO: enlazar los brochures reales (PDF) en cta.href antes de publicar.
export const SERVICES: Service[] = [
  {
    id: 'consultoria',
    number: '01',
    slug: 'consultoria-creativa',
    name: 'Consultoría Creativa',
    shortName: 'Consultoría',
    tagline: 'Estrategias de contenido y posicionamiento para empresas y marcas personales.',
    description:
      'Acompaño a empresas y marcas personales a encontrar su voz, ordenar su estrategia y convertir el contenido en resultados. Del concepto a la ejecución, con dirección creativa y visión de negocio.',
    audience: 'Para empresas y marcas personales que quieren posicionarse con intención.',
    includes: [
      { title: 'Estrategia de contenido', detail: 'Planes editoriales con objetivos claros y voz propia.' },
      { title: 'Producción de Reels', detail: 'Contenido en video pensado para conectar y convertir.' },
      { title: 'Dirección creativa', detail: 'Concepto, estética y narrativa alineadas a tu marca.' },
      { title: 'Marca personal', detail: 'Posicionamiento estratégico de personas como marcas.' },
      { title: 'Influencer Marketing', detail: 'Campañas con creadores que suman credibilidad.' },
      { title: 'Producción audiovisual', detail: 'Piezas profesionales de principio a fin.' },
    ],
    cta: { label: 'Descargar Brochure', href: '#', download: true },
    accent: '#9A6A2B',
    accentSoft: '#EADFC9',
    icon: 'spark',
  },
  {
    id: 'sculpt',
    number: '02',
    slug: 'sculpt-by-clau',
    name: 'Sculpt by Clau',
    shortName: 'Sculpt',
    tagline: 'Experiencias de movimiento, bienestar y Pilates para personas y empresas.',
    description:
      'Movimiento consciente que transforma. Clases y programas de Pilates diseñados para reconectar cuerpo y mente, desde sesiones privadas hasta programas corporativos de bienestar.',
    audience: 'Para personas y empresas que entienden el bienestar como inversión.',
    includes: [
      { title: 'Clases privadas', detail: 'Sesiones uno a uno adaptadas a tu cuerpo y ritmo.' },
      { title: 'Empresas', detail: 'Programas de movimiento para equipos de trabajo.' },
      { title: 'Workshops', detail: 'Talleres intensivos de técnica y consciencia corporal.' },
      { title: 'Eventos Wellness', detail: 'Sesiones especiales para fechas y celebraciones.' },
      { title: 'Corporate Wellness', detail: 'Bienestar sostenido como cultura de empresa.' },
    ],
    cta: { label: 'Conocer el servicio', href: '#contacto' },
    accent: '#5F7052',
    accentSoft: '#DDE4D3',
    icon: 'wave',
  },
  {
    id: 'flore',
    number: '03',
    slug: 'flore-house',
    name: 'Floré House of Experiences',
    shortName: 'Floré House',
    tagline: 'Eventos y experiencias wellness memorables para marcas y comunidades.',
    description:
      'La casa donde las marcas florecen a través de experiencias. Diseño y producción de eventos que la gente no olvida: del concepto al último detalle sensorial.',
    audience: 'Para marcas y comunidades que quieren dejar huella.',
    includes: [
      { title: 'Eventos', detail: 'Producción integral con identidad y propósito.' },
      { title: 'Activaciones', detail: 'Momentos de marca que generan conversación.' },
      { title: 'Wellness Corporativo', detail: 'Experiencias de bienestar para equipos.' },
      { title: 'Pilates Festival', detail: 'El encuentro de movimiento más grande de la comunidad.' },
      { title: 'Pilates Night Club', detail: 'Movimiento, música y energía en un formato nocturno único.' },
    ],
    cta: { label: 'Ver Brochure', href: '#', download: true },
    accent: '#B0604A',
    accentSoft: '#F0DCD3',
    icon: 'bloom',
  },
  {
    id: 'mediakit',
    number: '04',
    slug: 'media-kit',
    name: 'Colaboraciones & Media Kit',
    shortName: 'Media Kit',
    tagline: 'Alianzas con marcas, creación de contenido y campañas de influencia.',
    description:
      'Una comunidad real y contenido que convierte. Colaboro con marcas que comparten mis valores para crear campañas auténticas, medibles y memorables.',
    audience: 'Para marcas que buscan una voz creíble y contenido con alma.',
    includes: [
      { title: 'Embajadora de marca', detail: 'Alianzas de largo plazo con presencia constante.' },
      { title: 'Creación de contenido', detail: 'Piezas nativas para tus canales y los míos.' },
      { title: 'Campañas', detail: 'Conceptos creativos con resultados medibles.' },
      { title: 'UGC', detail: 'Contenido auténtico listo para tus plataformas.' },
      { title: 'Colaboraciones', detail: 'Formatos flexibles según tu objetivo.' },
    ],
    cta: { label: 'Descargar Media Kit', href: '#', download: true },
    accent: '#7A5A6E',
    accentSoft: '#E7DAE2',
    icon: 'link',
  },
]

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)
