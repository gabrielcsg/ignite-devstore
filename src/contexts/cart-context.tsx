"use client";
import { createContext, useContext, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: number) {
    setCartItems((state) => {
      const item = state.find((item) => item.productId === productId);

      if (item) {
        return state.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { productId, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
