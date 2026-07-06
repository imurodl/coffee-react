import { useState } from "react";
import { CartItem } from "../../lib/types/search";
import { addToCart, removeFromCart, deleteFromCart } from "../../lib/cart";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const persist = (cartUpdate: CartItem[]) => {
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onAdd = (input: CartItem) => persist(addToCart(cartItems, input));

  const onRemove = (input: CartItem) => persist(removeFromCart(cartItems, input));

  const onDelete = (input: CartItem) => persist(deleteFromCart(cartItems, input));

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
