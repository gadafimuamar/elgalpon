import { dictionary, Lang } from "./data";

interface AboutProps {
  lang: Lang;
}

export function About({ lang }: AboutProps) {
  const t = dictionary[lang];
  const statsObj = {
    es: { cadaDia: "350+", anios: "6", puntaje: "4.9", clientes: "2.400+" },
    en: { cadaDia: "350+", anios: "6", puntaje: "4.9", clientes: "2.400+" },
  };

  const st = statsObj[lang];

  return (
    <section
      id="nosotros"
      className="section"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
      aria-labelledby="about-title"
    >
      <div
        className="section-header"
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: 600,
          margin: "0 auto 3rem",
        }}
      >
        <span
          className="section-label"
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7a4a21",
            marginBottom: "0.4rem",
          }}
        >
          {t.sectionNosotrosLabel}
        </span>
        <h2
          id="about-title"
          className="section-title"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 800,
            color: "#4a2c11",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem",
          }}
        >
          {t.sectionNosotrosTitle}
        </h2>
        <p
          className="section-sub"
          style={{
            color: "#6c757d",
            margin: "0.4rem auto 0",
            fontSize: "1.02rem",
          }}
        >
          {t.sectionNosotrosSub}
        </p>
      </div>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* text block */}
        <div
          className="about-text"
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            lineHeight: 1.7,
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            En <strong style={{ color: "#4a2c11" }}>El Galpón</strong> elaboramos cada alfajor
            como si fuera para nuestra propia familia. Usamos{" "}
            <strong style={{ color: "#4a2c11" }}>masa cocinada a fuego lento</strong>,
            {lang === "es" ? "generosos" : "generous"} {" "}
            <strong style={{ color: "#4a2c11" }}>dulce de leche</strong> de vaca lechera y
            coberturas de chocolate de alta pureza.
          </p>
          <p style={{ marginBottom: "1.25rem" }}>
            Nacimos en el corazón de{" "}
            <strong style={{ color: "#4a2c11" }}>Córdoba</strong> y desde el primer día
            priorizamos la calidad por encima de la velocidad. Cada pedido se empaqueta a mano
            y se despacha con cuidado para que llegue en su máxima frescura.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              paddingTop: "0.5rem",
              borderTop: "1px solid #e3d6c4",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#faedcd",
                padding: "0.35rem 0.8rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4a2c11",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L3 9h7l3-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              {lang === "es" ? "100% artesanal" : "100% handcrafted"}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#faedcd",
                padding: "0.35rem 0.8rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4a2c11",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22s8-4.5 8-10a8 8 0 00-16 0c0 5.5 8 10 8 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {lang === "es" ? "Ingredientes puros" : "Pure ingredients"}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#faedcd",
                padding: "0.35rem 0.8rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4a2c11",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3h18M3 9h18M3 15h18M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {lang === "es" ? "Sin conservantes" : "No preservatives"}
            </span>
          </div>
        </div>

        {/* stats */}
        <div
          className="stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          role="list"
          aria-label={lang === "es" ? "Números clave" : "Key figures"}
        >
          {[
            { key: "cadaDia", label: t.statCadaDia },
            { key: "anios", label: t.statAnos },
            { key: "puntaje", label: t.statPuntaje },
            { key: "clientes", label: t.statClientes },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="stat-card"
              role="listitem"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "1.3rem 1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                className="stat-number"
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  color: "#4a2c11",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                {st[key as keyof typeof st]}
              </div>
              <div
                className="stat-label"
                style={{
                  fontSize: "0.8rem",
                  color: "#6c757d",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
