'use client';

import { useState, createContext, useContext } from "react";
import { useCartStore } from "../hooks/useCart";
import { Cart } from "@/api/types";

const createStoreState = (cart: Cart) => useCartStore(cart);

const CartContext = createContext<ReturnType<typeof createStoreState> | null>(null);

export const useCart = () => {
    const cart = useContext(CartContext)
  if(!cart) {
    throw new Error('useCart must be used within CartProvider')
  };

  return cart;
}

export const CartProvider = ({ 
  cart: initialCart, 
  children
} : { 
  cart: Cart, 
  children: React.ReactNode 
}) => {
  const [cartStore] = useState(() => createStoreState(initialCart));

  return (
    <CartContext.Provider value={cartStore} >
        {children}
    </CartContext.Provider>
  );
}
