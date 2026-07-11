# Claudia Andrea Flores — Plataforma de marca personal

Web editorial premium para la marca personal de Claudia Andrea Flores:
**Consultora Creativa · Coach de Pilates · Creadora de Experiencias.**

## Stack

- **React 19 + TypeScript + Vite**
- **GSAP + ScrollTrigger** — animaciones de entrada, parallax, contadores y scroll horizontal
- **React Router** — páginas independientes por línea de negocio
- Sin backend: el formulario abre el cliente de correo con el mensaje pre-cargado

## Correr en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ listo para producción
```

El deploy funciona en cualquier hosting estático. Para Vercel ya está incluido
`vercel.json` con el rewrite de SPA.

## Arquitectura

| Ruta | Contenido |
|---|---|
| `/` | Home: Hero, Sobre mí, ¿Cómo podemos trabajar juntos?, Quiz, Proyectos, Contacto |
| `/servicios/consultoria-creativa` | Consultoría Creativa |
| `/servicios/sculpt-by-clau` | Sculpt by Clau |
| `/servicios/flore-house` | Floré House of Experiences |
| `/servicios/media-kit` | Colaboraciones & Media Kit |

Las secciones del home tienen anclas (`/#sobre-mi`, `/#servicios`, `/#proyectos`,
`/#contacto`) que funcionan también como deep links.

### Funcionalidades interactivas

- **Hero editorial con foto real** — tipografía gigante detrás del sujeto,
  parallax de profundidad con el mouse (capas `data-depth`) y entrada con máscara.
- **Botones magnéticos** (`.magnetic`) y **tilt 3D** en tarjetas (`.tilt`) —
  hooks en `src/lib/interactions.ts`.
- **Quiz "Encuentra tu punto de partida"** — 3 preguntas que recomiendan la línea
  de negocio ideal y llevan a su página (o a WhatsApp con mensaje pre-cargado).
- **Galería de proyectos con scroll horizontal** (pin + scrub en desktop,
  swipe nativo en móvil).
- **Contadores animados, marquee, cursor editorial, preloader** (una vez por sesión).
- **Botón flotante de WhatsApp** con mensaje pre-cargado.
- Todo respeta `prefers-reduced-motion` (los contenidos se muestran sin animar).

## Dónde editar el contenido

Todo el contenido vive en `src/data/`:

- **`site.ts`** — ⚠️ datos de contacto PLACEHOLDER: email, número de WhatsApp,
  Instagram, LinkedIn, TikTok. **Reemplazar antes de publicar.**
- **`services.ts`** — las 4 líneas de negocio: textos, qué incluye, y el `cta.href`
  donde deben enlazarse los **PDF reales de brochures/media kit** (hoy apuntan a `#`).
- **`projects.ts`** — proyectos destacados (descripciones provisionales).

Fotografías: el hero y el "Sobre mí" ya usan la foto profesional real de Claudia
(extraída de claudia.swiitchad.com y optimizada a WebP en `src/assets/photos/`;
`Claudia-Cover.png` es el original en alta). Los assets restantes de ese sitio
(logos, firma, badge) eran dummy de la plantilla WordPress y NO se usaron.

Otros pendientes de contenido real:

- **Fotos de proyectos**: hoy usan gradientes + monograma como placeholder.
- **Métricas del "Sobre mí"** (`src/sections/About.tsx`): 3+ años (dato del sitio
  actual) / 7+ proyectos / 4 líneas — confirmar con Claudia.

## QA visual

`?flat` como query param (`http://localhost:5173/?flat`) compacta las alturas de
viewport para poder capturar la página completa en un screenshot largo.
