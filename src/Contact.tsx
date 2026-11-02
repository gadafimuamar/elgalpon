import { useState } from "react";
import { dictionary, Lang } from "./data";
import { createContactMessage, type ContactMessage } from "./db";

interface ContactProps {
  lang: Lang;
  onSent: (msg: ContactMessage) => void;
}

export function Contact({ lang, onSent }: ContactProps) {
  const t = dictionary[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentId, setSentId] = useState<number | null>(null);

  const valid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length >= 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    try {
      const msg = await createContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
      setSentId(msg.id);
      onSent(msg);
    } catch (err) {
      console.error("Error al guardar el mensaje:", err);
    }
    setLoading(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contacto"
      className="section"
      style={{ paddingTop: "3rem", paddingBottom: "4rem" }}
      aria-labelledby="contact-title"
    >
      {/* label + título */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 580,
          margin: "0 auto 2.5rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7a4a21",
            marginBottom: "0.5rem",
          }}
        >
          {lang === "es" ? "Contacto" : "Get in touch"}
        </span>
        <h2
          id="contact-title"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: "#4a2c11",
            letterSpacing: "-0.01em",
            marginBottom: "0.6rem",
            lineHeight: 1.2,
          }}
        >
          {lang === "es" ? "¿Nos escribes?" : "Write to us"}
        </h2>
        <p
          style={{
            color: "#6c757d",
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: 500,
            margin: "0.4rem auto 0",
          }}
        >
          {lang === "es"
            ? "Comprame un alfajor, pedí una caja personalizada o cuéntame una idea. Te respondemos rápido."
            : "Order a box of alfajores, ask for a custom combo or just say hi. We reply fast."}
        </p>
      </div>

      <div
        className="contact-card"
        style={{
          background: "#fff",
          border: "1px solid #e3d6c4",
          borderRadius: "2px",
          padding: "1.5rem 1.5rem 1.7rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {sentId !== null ? (
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 0",
              color: "#3e7d4f",
              fontWeight: 700,
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#3e7d4f" strokeWidth="2" />
              <path
                d="M7 12l3 3 7-7"
                stroke="#3e7d4f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={{ margin: "0.6rem 0 0", fontSize: "0.95rem", color: "#4a2c11" }}>
              {lang === "es" ? "¡Mensaje guardado correctamente!" : "Message saved successfully!"}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#6c757d",
                marginTop: "0.4rem",
              }}
            >
              {lang === "es"
                ? `ID: ${sentId} — Lo revisaremos pronto.`
                : `ID: ${sentId} — We'll get back to you soon.`}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <label
                htmlFor="contactName"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#4a2c11",
                }}
              >
                {t.labelNombre} *
              </label>
              <input
                id="contactName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.placeholderNombre}
                required
                style={{
                  padding: "0.55rem 0.8rem",
                  border: "1px solid #e3d6c4",
                  borderRadius: "2px",
                  fontSize: "0.9rem",
                  background: "#fffcf5",
                  color: "#4a2c11",
                  outline: "none",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  width: "100%",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#d4a373";
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,163,115,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e3d6c4";
                  e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <label
                htmlFor="contactEmail"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#4a2c11",
                }}
              >
                {t.labelEmail} *
              </label>
              <input
                id="contactEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholderEmail}
                required
                style={{
                  padding: "0.55rem 0.8rem",
                  border: "1px solid #e3d6c4",
                  borderRadius: "2px",
                  fontSize: "0.9rem",
                  background: "#fffcf5",
                  color: "#4a2c11",
                  outline: "none",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  width: "100%",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#d4a373";
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,163,115,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e3d6c4";
                  e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <label
                htmlFor="contactMessage"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#4a2c11",
                }}
              >
                {t.labelMensaje} *
              </label>
              <textarea
                id="contactMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholderMensaje}
                required
                rows={4}
                style={{
                  padding: "0.55rem 0.8rem",
                  border: "1px solid #e3d6c4",
                  borderRadius: "2px",
                  fontSize: "0.9rem",
                  background: "#fffcf5",
                  color: "#4a2c11",
                  outline: "none",
                  resize: "vertical",
                  minHeight: 100,
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  fontFamily: "inherit",
                  width: "100%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#d4a373";
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,163,115,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e3d6c4";
                  e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!valid || loading}
              style={{
                background: loading ? "#7a4a21" : "#4a2c11",
                color: "#fff",
                border: "none",
                padding: "0.6rem 1.4rem",
                borderRadius: "2px",
                fontSize: "0.88rem",
                fontWeight: 700,
                cursor: valid ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
                opacity: valid ? 1 : 0.5,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (valid && !loading) {
                  e.currentTarget.style.background = "#7a4a21";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = loading ? "#7a4a21" : "#4a2c11";
              }}
            >
              {loading && (
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    marginRight: "0.5rem",
                    verticalAlign: "middle",
                    position: "relative",
                  }}
                />
              )}
              {t.btnEnviar}
            </button>

            <p
              style={{
                margin: "0",
                fontSize: "0.78rem",
                color: "#6c757d",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22s8-4.5 8-10a8 8 0 00-16 0c0 5.5 8 10 8 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 8v4M12 16h0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {lang === "es"
                ? "Se guarda automáticamente en nuestra base de datos"
                : "Automatically saved to our database"}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
