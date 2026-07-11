import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { SERVICES } from '../data/services'
import { Instagram, LinkedIn, TikTok, Mail } from './icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wordmark" aria-hidden>
        Claudia <em>Andrea</em> Flores
      </div>
      <div className="container footer__grid">
        <div className="footer__social">
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn />
          </a>
          <a href={SITE.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TikTok />
          </a>
          <a href={`mailto:${SITE.email}`} aria-label="Correo">
            <Mail />
          </a>
        </div>

        <nav className="footer__links" aria-label="Líneas de negocio">
          {SERVICES.map((s) => (
            <Link key={s.id} to={`/servicios/${s.slug}`}>
              {s.shortName}
            </Link>
          ))}
        </nav>

        <p className="footer__note">
          © {new Date().getFullYear()} {SITE.name}. Hecho con intención.
        </p>
      </div>
    </footer>
  )
}
