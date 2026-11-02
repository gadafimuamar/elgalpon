import { useState, useEffect, useRef, useCallback } from "react";
import { AlfajorMark } from "./food-art";
import { dictionary, Lang } from "./data";

interface NavbarProps {
  cartCount: number;
  onToggleCart: () => void;
  onNavigate: (href: string) => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function Navbar({ cartCount, onToggleCart, onNavigate, lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = dictionary[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  // Close menu on route click
  const closeAndNavigate = useCallback(
    (href: string) => {
      setMenuOpen(false);
      onNavigate(href);
    },
    [onNavigate],
  );

  // Click outside menu to close
  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", outside);
      return () => document.removeEventListener("mousedown", outside);
    }
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scroll" : ""}`} role="banner">
        <div className="navbar-inner">
          {/* Logo */}
          <a
            href="#"
            className="nav-logo"
            aria-label={t.logoTooltip}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#");
            }}
          >
            <AlfajorMark size={30} color="#faedcd" bgColor="#4a2c11" />
            <span>{t.logo}</span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Navegación principal" className="nav-links">
            <a
              href="#inicio"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#inicio");
              }}
            >
              {t.navInicio}
            </a>
            <a
              href="#productos"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#productos");
              }}
            >
              {t.navProductos}
            </a>
            <a
              href="#nosotros"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#nosotros");
              }}
            >
              {t.navNosotros}
            </a>
            <a
              href="#contacto"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#contacto");
              }}
            >
              {t.navContacto}
            </a>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <button
              className="btn-lang"
              onClick={() => onLangChange(lang === "es" ? "en" : "es")}
              aria-label={`Cambiar idioma a ${lang === "es" ? "inglés" : "español"}`}
              title={`Idioma: ${lang === "es" ? "Español" : "English"}`}
              style={{
                background: "transparent",
                border: "1.5px solid rgba(250,234,208,0.4)",
                color: "#faedcd",
                borderRadius: "999px",
                padding: "0.4rem 1rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#faedcd";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(250,234,208,0.4)";
                e.currentTarget.style.color = "#faedcd";
              }}
            >
              {lang === "es" ? t.langEs : t.langEn}
            </button>

            <button
              className="cart-btn"
              onClick={onToggleCart}
              aria-label={`${t.navCarrito}: ${cartCount} artículos`}
              style={{
                background: "rgba(212,163,115,0.18)",
                border: "1px solid rgba(212,163,115,0.5)",
                color: "#faedcd",
                borderRadius: "999px",
                padding: "0.45rem 1rem 0.45rem 0.8rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,163,115,0.32)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212,163,115,0.18)";
                e.currentTarget.style.color = "#faedcd";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 3h18l-1.5 19H4.5L3 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="14" r="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="18" cy="14" r="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 10V6M18 10V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{cartCount}</span>
            </button>

            {/* Hamburger */}
            <button
              className="hamburger"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              data-open={String(menuOpen)}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className="mobile-menu"
        data-open={String(menuOpen)}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Menú de navegación"
      >
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            closeAndNavigate("#inicio");
          }}
        >
          {t.navInicio}
        </a>
        <a
          href="#productos"
          onClick={(e) => {
            e.preventDefault();
            closeAndNavigate("#productos");
          }}
        >
          {t.navProductos}
        </a>
        <a
          href="#nosotros"
          onClick={(e) => {
            e.preventDefault();
            closeAndNavigate("#nosotros");
          }}
        >
          {t.navNosotros}
        </a>
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            closeAndNavigate("#contacto");
          }}
        >
          {t.navContacto}
        </a>

        <div className="mobile-menu-actions">
          <button
            onClick={() => {
              onLangChange(lang === "es" ? "en" : "es");
            }}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(212,163,115,0.4)",
              color: "#faedcd",
              borderRadius: "999px",
              padding: "0.6rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "es" ? t.langEs : t.langEn}
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              onToggleCart();
            }}
            style={{
              background: "rgba(212,163,115,0.2)",
              border: "1px solid rgba(212,163,115,0.5)",
              color: "#faedcd",
              borderRadius: "999px",
              padding: "0.7rem 1.2rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 3h18l-1.5 19H4.5L3 3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="14" r="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="18" cy="14" r="2" stroke="currentColor" strokeWidth="2" />
              <path d="M9 10V6M18 10V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {t.navCarrito}: {cartCount}
          </button>
        </div>
      </div>
    </>
  );
}
