import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  lang: "es" | "en";
}

const durationMs = 2400;

export function Toast({ message, visible, lang }: ToastProps) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShown(false);
      return;
    }
    setShown(true);
    const timer = setTimeout(() => setShown(false), durationMs);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!shown) return null;

  const t = lang === "es" ? "Se ha enviado tu mensaje correctamente." : "Your message has been sent successfully.";

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast"
      style={{
        background: "#4a2c11",
        color: "#faedcd",
        padding: "0.8rem 1.4rem",
        borderRadius: "999px",
        fontSize: "0.9rem",
        fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        border: "1px solid rgba(212,163,115,0.4)",
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: shown ? "translate(-50%, 0)" : "translate(-50%, 20px)",
        opacity: shown ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        zIndex: 200,
        maxWidth: "90vw",
        textAlign: "center",
      }}
    >
      {shown ? message : t}
    </div>
  );
}
