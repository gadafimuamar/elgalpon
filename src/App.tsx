import { useState, useCallback, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Products } from "./Products";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Toast } from "./Toast";
import { Cart, type CartItem } from "./Cart";
import { dictionary, Lang } from "./data";
import { initDb } from "./db";
import "./index.css";

function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Inicializar la base de datos al montar
  useEffect(() => {
    initDb()
      .then(() => setDbReady(true))
      .catch((err) => setDbError(err instanceof Error ? err.message : "Error al inicializar la base de datos"));
  }, []);

  const addToCart = useCallback((id: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { id, qty: 1 }];
    });
    setToastVisible(true);
    setToastMsg(dictionary[lang].toastAgregado);
    setTimeout(() => setToastVisible(false), 2200);
  }, [lang]);

  const showCartToast = useCallback(() => {
    if (cart.length > 0) {
      setToastVisible(true);
      setToastMsg(dictionary[lang].toastCarrito);
      setTimeout(() => setToastVisible(false), 1800);
    }
  }, [cart, lang]);

  const handleNavigate = useCallback((href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1) || "inicio";
      const el = document.getElementById(id || "inicio");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  }, []);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // Estado de carga de DB
  if (dbError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fefae0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          color: "#4a2c11",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          {dictionary[lang].errorDb || "Error al cargar la base de datos"}
        </h1>
        <p style={{ color: "#6c757d", marginBottom: "1rem" }}>{dbError}</p>
        <button
          onClick={() => {
            setDbError(null);
            setDbReady(false);
            import("./db").then(({ initDb }) => initDb().then(() => setDbReady(true)).catch(() => {}));
          }}
          style={{
            background: "#4a2c11",
            color: "#fff",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {dictionary[lang].retry || "Reintentar"}
        </button>
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fefae0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(212,163,115,0.3)",
            borderTopColor: "#d4a373",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#4a2c11", fontWeight: 600 }}>
          {dictionary[lang].cargando || "Cargando..."}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fefae0",
        minHeight: "100vh",
      }}
    >
      <Navbar
        cartCount={totalItems}
        onToggleCart={showCartToast}
        onNavigate={handleNavigate}
        lang={lang}
        onLangChange={setLang}
      />

      <main>
        <Hero
          lang={lang}
          onViewMenu={() => handleNavigate("#productos")}
          onAbout={() => handleNavigate("#nosotros")}
        />
        <Products lang={lang} onAdd={addToCart} />
        <About lang={lang} />
        <Contact lang={lang} onSent={() => {}} />
      </main>

      <Footer lang={lang} />

      {/* Cart drawer */}
      <Cart
        items={cart}
        onUpdate={setCart}
        lang={lang}
        onClose={() => {}}
        onCreateOrder={() => {
          // Pedido guardado en DB — el componente muestra el ID
        }}
      />

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} lang={lang} />

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
