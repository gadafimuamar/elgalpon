// @ts-nocheck
import { test, expect, beforeEach } from "bun:test";
import {
  initDb,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  resetDatabase,
  type OrderItem,
} from "./db";

const dbPath = "./data/test_orders.sqlite";

// Mock fs
const mockFs = {
  existsSync: () => false,
  readFileSync: () => null,
  writeFileSync: () => {},
  mkdirSync: () => {},
  dirname: () => "./data",
  unlinkSync: () => {},
};

beforeEach(async () => {
  // Resetear DB antes de cada test
  await resetDatabase();
});

test("initDb crea las tablas", async () => {
  const db = await initDb();
  expect(db).not.toBeNull();

  const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
  const tablas = result[0]?.values.map((v) => v[0]) || [];
  expect(tablas).toContain("orders");
  expect(tablas).toContain("contact_messages");
});

test("createOrder guarda un pedido", async () => {
  const db = await initDb();

  const items: OrderItem[] = [
    { id: 1, nombre: "Alfajor Negro Clásico", precio: 1500, cantidad: 2 },
    { id: 2, nombre: "Alfajor de Maizena", precio: 1300, cantidad: 1 },
  ];

  const order = await createOrder({
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+54 9 351 123 4567",
    delivery: "delivery",
    address: "Av. San Martín 1420, Córdoba",
    payment: "cash",
    note: "Entregar antes de las 18hs",
    items,
    total: 4300,
  });

  expect(order).not.toBeNull();
  expect(order.id).toBeGreaterThan(0);
  expect(order.name).toBe("Juan Pérez");
  expect(order.email).toBe("juan@email.com");
  expect(order.phone).toBe("+54 9 351 123 4567");
  expect(order.delivery).toBe("delivery");
  expect(order.address).toBe("Av. San Martín 1420, Córdoba");
  expect(order.payment).toBe("cash");
  expect(order.note).toBe("Entregar antes de las 18hs");
  expect(order.items).toHaveLength(2);
  expect(order.items[0].nombre).toBe("Alfajor Negro Clásico");
  expect(order.items[0].precio).toBe(1500);
  expect(order.items[0].cantidad).toBe(2);
  expect(order.total).toBe(4300);
  expect(order.status).toBe("pendiente");
});

test("getAllOrders retorna todos los pedidos", async () => {
  const db = await initDb();

  // Crear varios pedidos
  await createOrder({
    name: "Cliente 1",
    email: "c1@email.com",
    phone: "+54 9 351 111 1111",
    delivery: "pickup",
    address: null,
    payment: "transfer",
    note: null,
    items: [{ id: 1, nombre: "Alfajor Negro", precio: 1500, cantidad: 1 }],
    total: 1500,
  });

  await createOrder({
    name: "Cliente 2",
    email: "c2@email.com",
    phone: "+54 9 351 222 2222",
    delivery: "delivery",
    address: "Calle Falsa 123",
    payment: "cash",
    note: "Urgente",
    items: [{ id: 2, nombre: "Maizena", precio: 1300, cantidad: 3 }],
    total: 3900,
  });

  const orders = await getAllOrders();
  expect(orders).toHaveLength(2);
  expect(orders[0].name).toBe("Cliente 2");
  expect(orders[1].name).toBe("Cliente 1");
});

test("getOrderById retorna el pedido correcto", async () => {
  const db = await initDb();

  const created = await createOrder({
    name: "Test User",
    email: "test@email.com",
    phone: "+54 9 351 999 9999",
    delivery: "delivery",
    address: "Test Address 123",
    payment: "cash",
    note: "Test note",
    items: [{ id: 3, nombre: "Pistacho", precio: 1900, cantidad: 1 }],
    total: 1900,
  });

  const found = await getOrderById(created.id);
  expect(found).not.toBeNull();
  expect(found!.id).toBe(created.id);
  expect(found!.name).toBe("Test User");
});

test("updateOrderStatus actualiza el estado", async () => {
  const db = await initDb();

  const created = await createOrder({
    name: "Status Test",
    email: "status@email.com",
    phone: "+54 9 351 000 0000",
    delivery: "pickup",
    address: null,
    payment: "transfer",
    note: null,
    items: [{ id: 1, nombre: "Test", precio: 1000, cantidad: 1 }],
    total: 1000,
  });

  await updateOrderStatus(created.id, "enviado");
  const updated = await getOrderById(created.id);
  expect(updated!.status).toBe("enviado");
});

test("deleteOrder elimina el pedido", async () => {
  const db = await initDb();

  const created = await createOrder({
    name: "To Delete",
    email: "delete@email.com",
    phone: "+54 9 351 123 4567",
    delivery: "delivery",
    address: "Address",
    payment: "cash",
    note: null,
    items: [{ id: 1, nombre: "Test", precio: 1000, cantidad: 1 }],
    total: 1000,
  });

  await deleteOrder(created.id);
  const deleted = await getOrderById(created.id);
  expect(deleted).toBeNull();

  const orders = await getAllOrders();
  expect(orders).toHaveLength(0);
});

test("items son serializados correctamente en JSON", async () => {
  const db = await initDb();

  const items: OrderItem[] = [
    { id: 1, nombre: "Item 1", precio: 1000, cantidad: 2 },
    { id: 2, nombre: "Item 2", precio: 2000, cantidad: 1 },
    { id: 3, nombre: "Item 3", precio: 500, cantidad: 5 },
  ];

  const order = await createOrder({
    name: "JSON Test",
    email: "json@email.com",
    phone: null,
    delivery: "pickup",
    address: null,
    payment: "cash",
    note: null,
    items,
    total: 6500,
  });

  expect(order.items).toHaveLength(3);
  expect(order.items[0]).toEqual({ id: 1, nombre: "Item 1", precio: 1000, cantidad: 2 });
  expect(order.items[1]).toEqual({ id: 2, nombre: "Item 2", precio: 2000, cantidad: 1 });
  expect(order.items[2]).toEqual({ id: 3, nombre: "Item 3", precio: 500, cantidad: 5 });
});
