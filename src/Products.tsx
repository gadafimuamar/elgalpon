import { useState, useMemo, useCallback } from "react";
import { dictionary, products, Product, Lang } from "./data";

interface ProductsProps {
  lang: Lang;
  onAdd: (id: number) => void;
}

export function Products({ lang, onAdd }: ProductsProps) {
  const [query, setQuery] = useState("");

  const t = dictionary[lang];

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name[lang].toLowerCase().includes(q) ||
        p.desc[lang].toLowerCase().includes(q),
    );
  }, [query]);

  const handleAdd = useCallback(
    (id: number) => {
      onAdd(id);
    },
    [onAdd],
  );

  const renderCard = (p: Product) => (
    <article
      key={p.id}
      className="product-card"
      aria-label={`${p.name[lang]} — $${p.price}`}
    >
      <div className="product-img-wrap">
        {p.tag && (
          <span
            className="product-tag"
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              background: "rgba(74,44,17,0.78)",
              color: "#faedcd",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.25rem 0.7rem",
              borderRadius: "999px",
              backdropFilter: "blur(4px)",
            }}
          >
            {p.tag}
          </span>
        )}
        <img
          className="product-img"
          src={p.img}
          alt={p.name[lang]}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="product-body">
        <div>
          <h3 className="product-name">{p.name[lang]}</h3>
          <p className="product-desc">{p.desc[lang]}</p>
        </div>

        <div className="product-footer">
          <span className="product-price">${p.price.toLocaleString()}</span>
          <button
            className="btn-add"
            onClick={() => handleAdd(p.id)}
            aria-label={`Agregar ${p.name[lang]} al carrito`}
          >
            {t.addBtn}
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="productos"
      className="section"
      style={{ paddingTop: "3rem", paddingBottom: "4rem" }}
      aria-labelledby="products-title"
    >
      {/* label + title */}
      <div className="section-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
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
          {t.sectionProductosLabel}
        </span>
        <h2
          id="products-title"
          className="section-title"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            color: "#4a2c11",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem",
          }}
        >
          {t.sectionProductosTitle}
        </h2>
        <p
          className="section-sub"
          style={{
            color: "#6c757d",
            maxWidth: 520,
            margin: "0.4rem auto 0",
            fontSize: "1.02rem",
          }}
        >
          {t.sectionProductosSub}
        </p>
      </div>

      {/* search */}
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto 2.2rem",
          position: "relative",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#7a4a21",
            opacity: 0.6,
          }}
        >
          <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "es" ? "Buscar alfajores..." : "Search alfajores..."}
          aria-label={lang === "es" ? "Buscar productos" : "Search products"}
          style={{
            width: "100%",
            padding: "0.75rem 1rem 0.75rem 2.6rem",
            border: "1.5px solid #e3d6c4",
            borderRadius: "999px",
            fontSize: "0.95rem",
            background: "#fff",
            color: "#4a2c11",
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#d4a373";
            e.target.style.boxShadow = "0 0 0 3px rgba(212,163,115,0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e3d6c4";
            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            style={{
              position: "absolute",
              right: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#6c757d",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              padding: "0.1rem",
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* grid */}
      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "1.75rem",
        }}
        role="list"
      >
        {result.map(renderCard)}
      </div>

      {result.length === 0 && (
        <p
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: "#6c757d",
            padding: "2rem 0",
            fontSize: "1rem",
          }}
        >
          {lang === "es"
            ? "No encontramos alfajores con ese nombre."
            : "We couldn't find any alfajores matching that name."}
        </p>
      )}
    </section>
  );
}
