import { dictionary } from "./data";
import { AlfajorMark } from "./food-art";
import type { Lang } from "./data";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const t = dictionary[lang];

  const socials = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 18c0 2-2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 7c1.5-1.5 4-2 5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 2h-3v0H9v0H6v0h0v0h0v0H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-3z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M16 13H8M16 17H8M10 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <footer role="contentinfo">
      <div className="footer-inner">
        <div className="footer-col">
          <a
            href="#"
            className="footer-brand"
            aria-label={t.footerMarca}
            onClick={(e) => e.preventDefault()}
          >
            <AlfajorMark size={26} color="#faedcd" bgColor="#7a4a21" />
            <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#faedcd" }}>
              {t.footerMarca}
            </span>
          </a>
          <p style={{ marginTop: "0.7rem", maxWidth: "260px" }}>{t.footerDesc}</p>
        </div>

        <div className="footer-col">
          <h4>{t.footerHorarios}</h4>
          <p>{t.footerHorarioText}</p>
        </div>

        <div className="footer-col">
          <h4>{t.footerContacto}</h4>
          <p>{t.footerUbi}</p>
          <p>{t.footerTel}</p>
          <div className="social-links" style={{ marginTop: "1rem" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-link"
                aria-label={s.label}
                onClick={(e) => e.preventDefault()}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Encuéntranos</h4>
          <a href="#productos" onClick={(e) => e.preventDefault()}>
            Ver catálogo
          </a>
          <a href="#contacto" onClick={(e) => e.preventDefault()}>
            Contacto
          </a>
          <a href="#nosotros" onClick={(e) => e.preventDefault()}>
            Sobre nosotros
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        {t.footerCopy}
      </div>
    </footer>
  );
}
