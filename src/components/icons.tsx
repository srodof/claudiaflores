import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
)

export const Asterisk = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      d="M12 2c.9 5.2 4.1 8.4 9.3 9.3v1.4C16.1 13.6 12.9 16.8 12 22h-1.4c-.9-5.2-4.1-8.4-9.3-9.3v-1.4C6.5 10.4 9.7 7.2 10.6 2H12z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

export const Spark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
)

export const Wave = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5 0" />
    <path d="M2 18c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5 0" opacity=".45" />
  </svg>
)

export const Bloom = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="2.4" />
    <path d="M12 9.6c0-3.5 1.6-5.6 4-5.6-.2 2.9-1.8 4.9-4 5.6zM12 9.6c0-3.5-1.6-5.6-4-5.6.2 2.9 1.8 4.9 4 5.6zM14.4 12c3.5 0 5.6 1.6 5.6 4-2.9-.2-4.9-1.8-5.6-4zM9.6 12c-3.5 0-5.6 1.6-5.6 4 2.9-.2 4.9-1.8 5.6-4zM12 14.4c0 3.5 1.6 5.6 4 5.6-.2-2.9-1.8-4.9-4-5.6z" />
  </svg>
)

export const LinkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9.5 14.5l5-5" />
    <path d="M13.5 6.5l1.6-1.6a4 4 0 015.6 5.6l-1.6 1.6M10.5 17.5l-1.6 1.6a4 4 0 01-5.6-5.6l1.6-1.6" />
  </svg>
)

export const Camera = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M8.5 7l1.2-2.4A1 1 0 0110.6 4h2.8a1 1 0 01.9.6L15.5 7" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
)

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
)

export const People = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5c.6-3.4 2.7-5.2 5.5-5.2s4.9 1.8 5.5 5.2M16 5.2a3.2 3.2 0 010 5.9M17.8 14.6c1.9.7 3.1 2.3 3.5 4.9" />
  </svg>
)

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a9.9 9.9 0 00-8.5 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.8 6.8 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.3 0-.4.1-.5s.3-.3.4-.5a1.7 1.7 0 00.2-.4.5.5 0 000-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.1 5 5 0 001.1 2.7 11.4 11.4 0 004.4 3.8 14.5 14.5 0 001.5.6 3.6 3.6 0 001.6.1 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.6-.3z" />
  </svg>
)

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M6.5 8.8H3.3V21h3.2V8.8zM4.9 3a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM13 8.8H9.9V21H13v-6.3c0-1.8.8-2.9 2.3-2.9s2.1 1 2.1 2.9V21h3.2v-7.1c0-3.3-1.8-5.3-4.4-5.3A3.9 3.9 0 0013 10.4V8.8z" />
  </svg>
)

export const TikTok = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.6 3c.4 2.3 1.9 3.8 4.4 4v3.1a7.4 7.4 0 01-4.4-1.4v6.5a6.1 6.1 0 11-6.1-6.1c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 101.9 2.8V3h3.2z" />
  </svg>
)

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)
