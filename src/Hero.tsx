import { dictionary, Lang } from "./data";
import { AlfajorRico } from "./alfajor-rico";

interface HeroProps {
  lang: Lang;
  onViewMenu: () => void;
  onAbout: () => void;
}

export function Hero({ lang, onViewMenu, onAbout }: HeroProps) {
  const t = dictionary[lang];
  return (
    <section
      id="inicio"
      className="hero"
      aria-label="Presentación"
      style={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: `linear-gradient(
          180deg,
          rgba(74,44,17,0.2) 0%,
          rgba(74,44,17,0.55) 55%,
          rgba(74,44,17,0.9) 100%
        ),
        url('https://upload.wikimedia.org/wikipedia/commons/6/6a/Alfajores-de-maicena-biscuits-recipe.jpg')
          center / cover no-repeat`,
      }}
    >
      {/* shimmer overlay */}
      <div
        className="hero-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 60% at 28% 18%, rgba(212,163,115,0.25), transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Alfajor de caca rico — gran elemento gráfico centrado */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "clamp(80px, 20vw, 180px)",
            height: "clamp(80px, 20vw, 180px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 25px rgba(212,163,115,0.3))",
            animation: "alfajorFloat 4.5s ease-in-out infinite",
          }}
        >
          <AlfajorRico />
        </div>
      </div>

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 1.25rem 4rem",
          textAlign: "center",
          color: "#faedcd",
        }}
      >
        {/* badge */}
        <div
          className="hero-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(212,163,115,0.18)",
            border: "1px solid rgba(212,163,115,0.5)",
            color: "#faedcd",
            fontSize: "0.8rem",
            fontWeight: 700,
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            marginBottom: "1.5rem",
            backdropFilter: "blur(4px)",
            letterSpacing: "0.04em",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#d4a373",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(212,163,115,0.7)",
            }}
          />
          {t.heroBadge}
        </div>

        {/* title */}
        <h1
          className="hero-title"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#faedcd",
            marginBottom: "1.2rem",
          }}
        >
          {t.heroTitle1}{" "}
          <span
            className="highlight"
            style={{
              background:
                "linear-gradient(120deg, #d4a373 0%, #f3d9a8 60%, #fff3dc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t.heroTitle2}
          </span>
        </h1>

        {/* subtitle */}
        <p
          className="hero-sub"
          style={{
            fontSize: "1.1rem",
            color: "rgba(250,234,208,0.85)",
            maxWidth: 520,
            margin: "0 auto 2rem",
          }}
        >
          {t.heroSub}
        </p>

        {/* CTAs */}
        <div
          className="hero-actions"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            className="btn-primary"
            onClick={onViewMenu}
            style={{
              background: "#d4a373",
              color: "#4a2c11",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.85rem 2rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 6px 18px rgba(212,163,115,0.45)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e6b07d";
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(212,163,115,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#d4a373";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(212,163,115,0.45)";
            }}
          >
            {t.heroCta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="btn-secondary"
            onClick={onAbout}
            style={{
              background: "transparent",
              color: "#faedcd",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.85rem 2rem",
              borderRadius: "999px",
              border: "1.5px solid rgba(250,234,208,0.5)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(250,234,208,0.1)";
              e.currentTarget.style.borderColor = "#faedcd";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(250,234,208,0.5)";
            }}
          >
            {t.heroSecondary}
          </button>
        </div>

        {/* scroll cue */}
        <div
          className="hero-scroll-cue"
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(250,234,208,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            animation: "float 2.4s ease-in-out infinite",
          }}
        >
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* invisible anchor for anchor links */}
      <span id="scroll-anchor" />
    </section>
  );
}
