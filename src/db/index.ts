import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";

let db: SqlJsDatabase | null = null;
let dbBuffer: Uint8Array | null = null;
const dbPath = "./data/orders.sqlite";

// Inicializar sql.js una sola vez
let SQL: Awaited<ReturnType<typeof initSqlJs>> | null = null;
let initPromise: Promise<Awaited<ReturnType<typeof initSqlJs>>> | null = null;

async function getSQL(): Promise<Awaited<ReturnType<typeof initSqlJs>>> {
  if (SQL) return SQL;
  if (!initPromise) {
    initPromise = initSqlJs({
      locateFile: (file: string) => {
        // En navegador (Vite), el WASM se sirve desde /node_modules/ por Vite
        if (typeof window !== "undefined" && window.location && window.location.protocol !== "file:") {
          return `/node_modules/sql.js/dist/${file}`;
        }
        // En Bun/Node: calcular ruta desde import.meta.url
        try {
          const url = new URL(import.meta.url);
          let base: string;
          if (url.protocol === "file:") {
            const parts = url.pathname.split("/").filter(Boolean);
            base = "/" + parts.slice(0, parts.length - 3).join("/");
          } else {
            base = "";
          }
          if (base) {
            return `${base}/node_modules/sql.js/dist/${file}`;
          }
        } catch {
          // fallback
        }
        return `/node_modules/sql.js/dist/${file}`;
      },
    });
  }
  SQL = await initPromise;
  return SQL!;
}

// Detectar si tenemos acceso a filesystem (Node/Bun)
function hasFs(): boolean {
  try {
    // Usar createRequire para no disparar dep0018 en Node v22+
    const createRequire = globalThis.require?.constructor?.name === "require"
      ? globalThis.require
      : typeof module !== "undefined" && typeof (module as unknown as { createRequire?: (url: string) => NodeRequire })["createRequire"] === "function"
        ? (module as unknown as { createRequire: (url: string) => NodeRequire }).createRequire(import.meta.url)
        : null;
    if (!createRequire) return false;
    const fs = createRequire("fs");
    if (fs && typeof fs.existsSync === "function" && typeof fs.readFileSync === "function") {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getFs(): { existsSync: typeof import("fs").existsSync; readFileSync: typeof import("fs").readFileSync; writeFileSync: typeof import("fs").writeFileSync; mkdirSync: typeof import("fs").mkdirSync; dirname: typeof import("path").dirname; unlinkSync: typeof import("fs").unlinkSync } | null {
  if (!hasFs()) return null;
  try {
    const createRequire = globalThis.require?.constructor?.name === "require"
      ? globalThis.require
      : typeof module !== "undefined" && typeof (module as unknown as { createRequire?: (url: string) => NodeRequire })["createRequire"] === "function"
        ? (module as unknown as { createRequire: (url: string) => NodeRequire }).createRequire(import.meta.url)
        : null;
    if (!createRequire) return null;
    const fs = createRequire("fs");
    const path = createRequire("path");
    return {
      existsSync: fs.existsSync.bind(fs),
      readFileSync: fs.readFileSync.bind(fs),
      writeFileSync: fs.writeFileSync.bind(fs),
      mkdirSync: fs.mkdirSync.bind(fs),
      dirname: path.dirname.bind(path),
      unlinkSync: fs.unlinkSync.bind(fs),
    };
  } catch {
    return null;
  }
}

const fs = getFs();

async function loadDb(): Promise<SqlJsDatabase> {
  if (db) return db;

  // Si hay buffer en memoria, usarlo
  if (dbBuffer) {
    const sql = await getSQL();
    db = new sql.Database(dbBuffer);
    return db;
  }

  // Intentar cargar desde archivo (solo si hay fs)
  if (fs) {
    try {
      if (fs.existsSync(dbPath)) {
        const buf = fs.readFileSync(dbPath);
        const sql = await getSQL();
        db = new sql.Database(buf);
        dbBuffer = new Uint8Array(buf);
        return db;
      }
    } catch {
      // ignorar
    }
  }

  // Crear DB vacía
  const sql = await getSQL();
  db = new sql.Database();
  return db;
}

// Guardar DB: en memoria + archivo si hay filesystem
function saveDb(): void {
  if (!db) return;
  const exported = db.export();
  dbBuffer = exported;
  if (fs) {
    try {
      const dir = fs.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dbPath, exported);
    } catch {
      // ignorar
    }
  }
}

// Crear tablas si no existen
async function createTables(database: SqlJsDatabase): Promise<void> {
  database.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      delivery TEXT NOT NULL,
      address TEXT,
      payment TEXT NOT NULL,
      items_json TEXT NOT NULL,
      total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pendiente'
    )
  `);
  database.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      read INTEGER NOT NULL DEFAULT 0
    )
  `);
  database.run(`CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)`);
  database.run(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
  database.run(`CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(read)`);
}

// Inicializar DB completa
export async function initDb(): Promise<SqlJsDatabase> {
  const database = await loadDb();
  await createTables(database);
  saveDb();
  return database;
}

// Obtener DB lista para usar
let readyPromise: Promise<SqlJsDatabase> | null = null;
export async function getDbAsync(): Promise<SqlJsDatabase> {
  if (db) return db;
  if (!readyPromise) {
    readyPromise = initDb();
  }
  await readyPromise;
  if (!db) throw new Error("DB no inicializada");
  return db;
}

// Tipos
export type OrderItem = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

export type Order = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  delivery: string;
  address: string | null;
  payment: string;
  items: OrderItem[];
  total: number;
  status: string;
};

export type ContactMessage = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
};

// ============ ORDERS (async) ==============

export async function createOrder(opts: {
  name: string;
  email: string;
  delivery: string;
  address: string | null;
  payment: string;
  items: OrderItem[];
  total: number;
}): Promise<Order> {
  const database = await getDbAsync();
  const itemsJson = JSON.stringify(opts.items);
  database.run(
    `INSERT INTO orders (name, email, delivery, address, payment, items_json, total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [opts.name, opts.email, opts.delivery, opts.address ?? null, opts.payment, itemsJson, opts.total],
  );
  const result = database.exec(`SELECT last_insert_rowid() AS id`);
  const id = (result[0]?.values[0]?.[0] as number) ?? 0;
  saveDb();
  const order = await getOrderById(id);
  if (!order) throw new Error("No se pudo crear el pedido");
  return order;
}

export async function getOrderById(id: number): Promise<Order | null> {
  const database = await getDbAsync();
  const result = database.exec(
    `SELECT id, created_at, name, email, delivery, address, payment, items_json, total, status
     FROM orders WHERE id = ?`,
    [id],
  );
  if (!result || result.length === 0 || result[0].values.length === 0) return null;
  const row = result[0].values[0];
  const cols = result[0].columns;
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < cols.length; i++) obj[cols[i]] = row[i];
  return mapOrderRow(obj);
}

export async function getAllOrders(): Promise<Order[]> {
  const database = await getDbAsync();
  const result = database.exec(
    `SELECT id, created_at, name, email, delivery, address, payment, items_json, total, status
     FROM orders ORDER BY created_at DESC`,
  );
  if (!result || result.length === 0) return [];
  return result[0].values.map((row: unknown[]) => {
    const cols = result[0].columns;
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < cols.length; i++) obj[cols[i]] = row[i];
    return mapOrderRow(obj);
  });
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  const database = await getDbAsync();
  database.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
  saveDb();
}

export async function deleteOrder(id: number): Promise<void> {
  const database = await getDbAsync();
  database.run(`DELETE FROM orders WHERE id = ?`, [id]);
  saveDb();
}

export function mapOrderRow(row: Record<string, unknown>): Order {
  return {
    id: row.id as number,
    createdAt: row.created_at as string,
    name: row.name as string,
    email: row.email as string,
    delivery: row.delivery as string,
    address: (row.address as string) ?? null,
    payment: row.payment as string,
    items: JSON.parse(row.items_json as string) as OrderItem[],
    total: row.total as number,
    status: row.status as string,
  };
}

// ============ CONTACT MESSAGES (async) ==============

export async function createContactMessage(opts: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const database = await getDbAsync();
  database.run(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    [opts.name, opts.email, opts.message],
  );
  const result = database.exec(`SELECT last_insert_rowid() AS id`);
  const id = (result[0]?.values[0]?.[0] as number) ?? 0;
  saveDb();
  const msg = await getContactMessageById(id);
  if (!msg) throw new Error("No se pudo crear el mensaje");
  return msg;
}

export async function getContactMessageById(id: number): Promise<ContactMessage | null> {
  const database = await getDbAsync();
  const result = database.exec(
    `SELECT id, created_at, name, email, message, read FROM contact_messages WHERE id = ?`,
    [id],
  );
  if (!result || result.length === 0 || result[0].values.length === 0) return null;
  const row = result[0].values[0];
  const cols = result[0].columns;
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < cols.length; i++) obj[cols[i]] = row[i];
  return mapMessageRow(obj);
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  const database = await getDbAsync();
  const result = database.exec(
    `SELECT id, created_at, name, email, message, read FROM contact_messages ORDER BY created_at DESC`,
  );
  if (!result || result.length === 0) return [];
  return result[0].values.map((row: unknown[]) => {
    const cols = result[0].columns;
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < cols.length; i++) obj[cols[i]] = row[i];
    return mapMessageRow(obj);
  });
}

export async function markMessageRead(id: number): Promise<void> {
  const database = await getDbAsync();
  database.run(`UPDATE contact_messages SET read = 1 WHERE id = ?`, [id]);
  saveDb();
}

export async function markAllMessagesRead(): Promise<void> {
  const database = await getDbAsync();
  database.run(`UPDATE contact_messages SET read = 1`);
  saveDb();
}

export async function deleteContactMessage(id: number): Promise<void> {
  const database = await getDbAsync();
  database.run(`DELETE FROM contact_messages WHERE id = ?`, [id]);
  saveDb();
}

export function mapMessageRow(row: Record<string, unknown>): ContactMessage {
  return {
    id: row.id as number,
    createdAt: row.created_at as string,
    name: row.name as string,
    email: row.email as string,
    message: row.message as string,
    read: Boolean(row.read),
  };
}

// ============ LIMPIAR ==============

export async function resetDatabase(): Promise<void> {
  if (db) {
    db.close();
    db = null;
  }
  dbBuffer = null;
  if (fs && fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath);
    } catch {
      // ignorar
    }
  }
}
