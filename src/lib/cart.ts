import { CartItem } from "./types/search";

// Pure cart reducers — no React/localStorage side effects, so they're unit-testable.
// Each returns a new array; the original is never mutated.

export const addToCart = (items: CartItem[], input: CartItem): CartItem[] => {
  const exist = items.find((item) => item._id === input._id);
  if (exist) {
    return items.map((item) =>
      item._id === input._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { ...input }];
};

export const removeFromCart = (
  items: CartItem[],
  input: CartItem
): CartItem[] => {
  const exist = items.find((item) => item._id === input._id);
  if (!exist) return items; // nothing to remove
  if (exist.quantity === 1) {
    return items.filter((item) => item._id !== input._id);
  }
  return items.map((item) =>
    item._id === input._id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

export const deleteFromCart = (
  items: CartItem[],
  input: CartItem
): CartItem[] => items.filter((item) => item._id !== input._id);
