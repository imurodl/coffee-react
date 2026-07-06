import { describe, it, expect } from "vitest";
import { addToCart, removeFromCart, deleteFromCart } from "./cart";
import { CartItem } from "./types/search";

const item = (id: string, quantity = 1): CartItem => ({
  _id: id,
  quantity,
  price: 10,
  image: "x.png",
  name: "Coffee " + id,
});

describe("addToCart", () => {
  it("appends a new item", () => {
    const result = addToCart([], item("a"));
    expect(result).toEqual([item("a")]);
  });

  it("increments quantity of an existing item", () => {
    const result = addToCart([item("a", 2)], item("a"));
    expect(result).toEqual([item("a", 3)]);
  });

  it("does not mutate the original array", () => {
    const original = [item("a", 1)];
    addToCart(original, item("a"));
    expect(original[0].quantity).toBe(1);
  });

  it("keeps other items untouched", () => {
    const result = addToCart([item("a", 1), item("b", 5)], item("a"));
    expect(result).toEqual([item("a", 2), item("b", 5)]);
  });
});

describe("removeFromCart", () => {
  it("decrements quantity when more than one", () => {
    const result = removeFromCart([item("a", 3)], item("a"));
    expect(result).toEqual([item("a", 2)]);
  });

  it("removes the item when quantity reaches zero", () => {
    const result = removeFromCart([item("a", 1), item("b", 2)], item("a"));
    expect(result).toEqual([item("b", 2)]);
  });

  it("returns the cart unchanged when the item is absent (no crash)", () => {
    const cart = [item("a", 1)];
    expect(removeFromCart(cart, item("zzz"))).toEqual(cart);
  });
});

describe("deleteFromCart", () => {
  it("removes the item regardless of quantity", () => {
    const result = deleteFromCart([item("a", 9), item("b", 1)], item("a"));
    expect(result).toEqual([item("b", 1)]);
  });

  it("is a no-op for an absent item", () => {
    const cart = [item("a", 1)];
    expect(deleteFromCart(cart, item("zzz"))).toEqual(cart);
  });
});
