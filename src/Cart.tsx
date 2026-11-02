import { useState, useCallback } from "react";
import { dictionary, products, Product, Lang } from "./data";
import { createOrder, type OrderItem } from "./db";

export interface CartItem {
  id: number;
  qty: number;
}

interface CartProps {
  items: CartItem[];
  onUpdate: (items: CartItem[]) => void;
  lang: Lang;
  onClose: () => void;
  onCreateOrder?: (orderId: number) => void;
}

export function Cart({ items, onUpdate, lang, onClose, onCreateOrder }: CartProps) {
  const t = dictionary[lang];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState<"cash" | "transfer">("cash");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);

  const prods: Product[] = products;

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => {
    const p = prods.find((pr) => pr.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  const changeQty = useCallback(
    (id: number, delta: number) => {
      onUpdate(
        items
          .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
          .filter((i) => i.qty > 0),
      );
    },
    [items, onUpdate],
  );

  const removeItem = useCallback(
    (id: number) => {
      onUpdate(items.filter((i) => i.id !== id));
    },
    [items, onUpdate],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      const orderItems: OrderItem[] = items.map((i) => {
        const p = prods.find((pr) => pr.id === i.id)!;
        return {
          id: i.id,
          nombre: p.name[lang],
          precio: p.price,
          cantidad: i.qty,
        };
      });
      const orderTotal = orderItems.reduce((s, it) => s + it.precio * it.cantidad, 0);
      const order = await createOrder({
        name: name.trim(),
        email: email.trim(),
        delivery,
        address: delivery === "delivery" ? address.trim() : null,
        payment,
        items: orderItems,
        total: orderTotal,
      });
      setOrderId(order.id);
      onCreateOrder?.(order.id);
      setName("");
      setEmail("");
      setDelivery("delivery");
      setPayment("cash");
      setAddress("");
      onUpdate([]);
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err) {
      console.error("Error al guardar el pedido:", err);
    }
      };

  const isEmpty = items.length === 0;

  return (
    <div
      className="cart-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
        zIndex: 60,
        display: "flex",
        justifyContent: "flex-end",
        opacity: isEmpty ? 0 : 1,
        pointerEvents: isEmpty ? "none" : "auto",
        transition: "opacity 0.25s ease",
      }}
      onClick={onClose}
      aria-hidden={isEmpty}
    >
      {/* overlay */}
      <div style={{ width: "100%" }} />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal={true}
        aria-label={t.cartTitle}
        className="cart-drawer"
        style={{
          width: "min(420px, 100%)",
          height: "100%",
          background: "#fff",
          boxShadow: "-12px 0 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          transform: isEmpty ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          padding: "1.25rem 1.25rem 1.5rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <h2 style={{ color: "#4a2c11", fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
            {t.cartTitle}
            {totalItems > 0 && (
              <span
                style={{
                  background: "#d4a373",
                  color: "#4a2c11",
                  borderRadius: "999px",
                  padding: "0.1rem 0.6rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginLeft: "0.5rem",
                }}
              >
                {totalItems}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.6rem",
              color: "#6c757d",
              cursor: "pointer",
              lineHeight: 1,
              padding: "0.2rem",
            }}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        {/* empty state */}
        {isEmpty && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#6c757d",
              textAlign: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 3h18l-1.5 19H4.5L3 3z"
                stroke="#7a4a21"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="14" r="2" stroke="#7a4a21" strokeWidth="2" />
              <circle cx="18" cy="14" r="2" stroke="#7a4a21" strokeWidth="2" />
              <path d="M9 10V6M18 10V6" stroke="#7a4a21" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ margin: 0 }}>{t.emptyCart}</p>
          </div>
        )}

        {/* items */}
        {!isEmpty && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              overflowY: "auto",
              flex: 1,
            }}
          >
            {items.map((item) => {
              const p = prods.find((pr) => pr.id === item.id);
              if (!p) return null;
              return (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    padding: "0.85rem 0",
                    borderBottom: "1px solid #f0e7d8",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name[lang]}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                      flexShrink: 0,
                      background: "#f3e7d3",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        color: "#4a2c11",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name[lang]}
                    </p>
                    <p
                      style={{
                        margin: "0.15rem 0 0",
                        fontSize: "0.8rem",
                        color: "#6c757d",
                      }}
                    >
                      {lang === "es" ? `$${p.price} c/u` : `$${p.price} each`}
                    </p>
                  </div>
                  <div
                    className="cart-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      aria-label="Quitar uno"
                      style={{
                        background: "#e9ecef",
                        border: "none",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontWeight: 700,
                        color: "#4a2c11",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: 22,
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#4a2c11",
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      aria-label="Agregar uno"
                      style={{
                        background: "#e9ecef",
                        border: "none",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontWeight: 700,
                        color: "#4a2c11",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={lang === "es" ? "Eliminar" : "Remove"}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#b08458",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      padding: "0 0.2rem",
                      lineHeight: 1,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c0392b")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b08458")}
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* footer / checkout */}
        <div
          style={{
            borderTop: "2px dashed #e3d6c4",
            paddingTop: "1rem",
            marginTop: "0.5rem",
          }}
        >
          {!isEmpty && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span style={{ color: "#6c757d", fontSize: "0.95rem" }}>{t.totalLabel}</span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#4a2c11",
                  fontSize: "1.35rem",
                }}
              >
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          )}

          {isEmpty ? (
            <button
              onClick={onClose}
              style={{
                background: "#7a4a21",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.95rem",
                width: "100%",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#4a2c11")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#7a4a21")}
            >
              {lang === "es" ? "Completar pedido" : "Complete order"}
            </button>
          ) : orderId !== null ? (
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem 0",
                color: "#3e7d4f",
                fontWeight: 700,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                {lang === "es" ? "Pedido guardado correctamente" : "Order saved successfully"}
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#6c757d",
                  marginTop: "0.4rem",
                }}
              >
                {lang === "es" ? `Nro. de pedido: ${orderId} — Te contactaremos pronto.` : `Order #${orderId} — We'll contact you soon.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label
                    htmlFor="cartName"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#4a2c11",
                    }}
                  >
                    {t.labelNombre}
                  </label>
                  <input
                    id="cartName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "es" ? "Tu nombre" : "Your name"}
                    style={{
                      padding: "0.55rem 0.7rem",
                      border: "1.5px solid #e3d6c4",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      background: "#fdf9f0",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#d4a373")}
                    onBlur={(e) => (e.target.style.borderColor = "#e3d6c4")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label
                    htmlFor="cartEmail"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#4a2c11",
                    }}
                  >
                    {t.labelEmail}
                  </label>
                  <input
                    id="cartEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "es" ? "tu@email.com" : "you@email.com"}
                    style={{
                      padding: "0.55rem 0.7rem",
                      border: "1.5px solid #e3d6c4",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      background: "#fdf9f0",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#d4a373")}
                    onBlur={(e) => (e.target.style.borderColor = "#e3d6c4")}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label
                  htmlFor="cartDelivery"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4a2c11",
                  }}
                >
                  {lang === "es" ? "Tipo de entrega" : "Delivery method"}
                </label>
                <select
                  id="cartDelivery"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value as "delivery" | "pickup")}
                  style={{
                    padding: "0.55rem 0.7rem",
                    border: "1.5px solid #e3d6c4",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    background: "#fdf9f0",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <option value="delivery">
                    {lang === "es" ? "Delivery a domicilio" : "Home delivery"}
                  </option>
                  <option value="pickup">
                    {lang === "es" ? "Retiro en local" : "In-store pickup"}
                  </option>
                </select>
              </div>

              {delivery === "delivery" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label
                    htmlFor="cartAddress"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#4a2c11",
                    }}
                  >
                    {lang === "es" ? "Dirección de entrega" : "Delivery address"}
                  </label>
                  <input
                    id="cartAddress"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === "es" ? "Calle 123, Barrio..." : "123 Street, Neighborhood..."}
                    style={{
                      padding: "0.55rem 0.7rem",
                      border: "1.5px solid #e3d6c4",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      background: "#fdf9f0",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#d4a373")}
                    onBlur={(e) => (e.target.style.borderColor = "#e3d6c4")}
                  />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label
                  htmlFor="cartPayment"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4a2c11",
                  }}
                >
                  {lang === "es" ? "Método de pago" : "Payment method"}
                </label>
                <select
                  id="cartPayment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value as "cash" | "transfer")}
                  style={{
                    padding: "0.55rem 0.7rem",
                    border: "1.5px solid #e3d6c4",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    background: "#fdf9f0",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <option value="cash">
                    {lang === "es" ? "Efectivo al recibir" : "Cash on delivery"}
                  </option>
                  <option value="transfer">
                    {lang === "es" ? "Transferencia bancaria" : "Bank transfer"}
                  </option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  background: "#d4a373",
                  color: "#4a2c11",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "background 0.2s ease, transform 0.15s ease",
                  marginTop: "0.2rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e0a878";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d4a373";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {lang === "es" ? "Confirmar pedido" : "Confirm order"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
