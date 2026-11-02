// @ts-nocheck
import { test, expect } from "bun:test";
import { products, dictionary, stats } from "./data";

test("products tiene 4 items", () => {
  expect(products).toHaveLength(4);
});

test("cada producto tiene name, desc, price, img", () => {
  for (const p of products) {
    expect(p.name).toHaveProperty("es");
    expect(p.name).toHaveProperty("en");
    expect(p.desc).toHaveProperty("es");
    expect(p.desc).toHaveProperty("en");
    expect(typeof p.price).toBe("number");
    expect(p.price > 0).toBe(true);
    expect(typeof p.img).toBe("string");
    expect(p.img.startsWith("http")).toBe(true);
  }
});

test("los precios son números positivos", () => {
  const precios = products.map((p) => p.price);
  expect(precios).toEqual([1500, 1300, 1900, 1300]);
});

test("dictionary tiene las claves es y en", () => {
  expect(dictionary).toHaveProperty("es");
  expect(dictionary).toHaveProperty("en");
});

test("dictionary es tiene logo 'El Galpón'", () => {
  expect(dictionary.es.logo).toBe("El Galpón");
});

test("dictionary en tiene logo 'The Barn'", () => {
  expect(dictionary.en.logo).toBe("The Barn");
});

test("stats tiene las claves es y en", () => {
  expect(stats).toHaveProperty("es");
  expect(stats).toHaveProperty("en");
});

test("stats es tiene valores", () => {
  expect(stats.es.cadaDia).toBe("350+");
  expect(stats.es.anios).toBe("6");
  expect(stats.es.puntaje).toBe("4.9");
  expect(stats.es.clientes).toBe("2.400+");
});
