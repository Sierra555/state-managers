"use client";
import Link from "next/link";

import CartPopup from "./CartPopup";
import { type Cart } from "@/api/types";
import { useState, useRef } from "react";
import { useStore, useAtomValue } from "jotai";
import { cartAtom } from "../jotaiStore/atoms";

// import { useCart } from "@/app/context/CartContext"; 
// import { useCart } from "../store/store";
// import { useCart } from "../context/CartProviderForZustand";

export default function Header({
  cart: initCart,
  clearCartAction,
}: {
  cart: Cart,
  clearCartAction: () => Promise<Cart>;
}) {
  const [showCart, setShowCart] = useState(false);
  // const [cart] = useCart(); //context api
  // const cart = useCart();  //redux 
  // const cart = useCart()(state => state.cart); //zustand
  const initialized = useRef(false);
  const store = useStore()
  
  if(!initialized.current) {
    store.set(cartAtom, initCart);
    initialized.current = true;
  }

  const cart = useAtomValue(cartAtom, {store});
  
  return (
    <header className="mx-2 flex items-center justify-between p-4 bg-gradient-radial mb-10 shadow-lg shadow-white rounded-b-2xl">
      <Link href="/">
        <h1 className="text-3xl font-bold leading-10 text-gray-100">
          Donuts &amp; Dragoons Store
        </h1>
      </Link>
      <div
        className="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-full"
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        <span className="text-xl font-bold leading-10 text-gray-100">
          {cart.products.length}
        </span>
        {showCart && (
          <CartPopup clearCartAction={clearCartAction} />
        )}
      </div>
    </header>
  );
}
