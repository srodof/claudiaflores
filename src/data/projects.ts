export interface Project {
  id: string
  title: string
  category: string
  description: string
  year: string
  gradient: string
  monogram: string
}

// TODO: reemplazar descripciones y añadir fotografías reales de cada proyecto.
export const PROJECTS: Project[] = [
  {
    id: 'pilates-festival',
    title: 'Pilates Festival Experience',
    category: 'Floré House · Evento',
    description: 'Un festival que reunió a la comunidad wellness alrededor del movimiento, la música y las marcas.',
    year: '2025',
    gradient: 'linear-gradient(150deg, #C08A6B 0%, #8A4E3B 55%, #4E2A22 100%)',
    monogram: 'PF',
  },
  {
    id: 'pilates-night-club',
    title: 'Pilates Night Club',
    category: 'Floré House · Experiencia',
    description: 'Pilates de noche, luces y energía: un formato inédito que convirtió una clase en un evento.',
    year: '2025',
    gradient: 'linear-gradient(150deg, #6E5A7E 0%, #3E3350 55%, #1E1830 100%)',
    monogram: 'NC',
  },
  {
    id: 'prowell',
    title: 'Prowell',
    category: 'Wellness Corporativo',
    description: 'Programa de bienestar y movimiento diseñado para equipos de alto rendimiento.',
    year: '2024',
    gradient: 'linear-gradient(150deg, #7E8E6B 0%, #55663F 55%, #2C3520 100%)',
    monogram: 'PW',
  },
  {
    id: 'cofi',
    title: 'Cofi',
    category: 'Contenido & Campaña',
    description: 'Dirección creativa y contenido para una marca que quería contar su historia de otra forma.',
    year: '2024',
    gradient: 'linear-gradient(150deg, #A98363 0%, #6E4E33 55%, #3A2718 100%)',
    monogram: 'CO',
  },
  {
    id: 'realme',
    title: 'Realme',
    category: 'Colaboración con marca',
    description: 'Campaña de influencia y contenido nativo para el lanzamiento de producto en el mercado local.',
    year: '2024',
    gradient: 'linear-gradient(150deg, #8B8FA3 0%, #4E5468 55%, #23273A 100%)',
    monogram: 'RE',
  },
  {
    id: 'sante',
    title: 'Sante',
    category: 'Estrategia & Contenido',
    description: 'Estrategia de contenido y producción audiovisual para posicionar una marca de bienestar.',
    year: '2023',
    gradient: 'linear-gradient(150deg, #C9A96A 0%, #8F6F3B 55%, #4A3618 100%)',
    monogram: 'SA',
  },
  {
    id: 'tigo-business',
    title: 'Tigo Business',
    category: 'Activación corporativa',
    description: 'Experiencia de bienestar corporativo para una de las marcas más grandes de la región.',
    year: '2023',
    gradient: 'linear-gradient(150deg, #4E7A8A 0%, #2E4E5C 55%, #14262E 100%)',
    monogram: 'TB',
  },
]
