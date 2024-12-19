"use client";

import { type Cart } from "@/api/types";
import { useSetAtom, useStore } from "jotai";
import { cartAtom } from "../jotaiStore/atoms";
// import { useCart } from "../context/CartContext";
// import { useDispatch } from "react-redux";
// import { setCart } from "../store/store";
// import { useCart } from "../context/CartProviderForZustand";

export default function AddToCart({
  addToCartAction, 
}: {
  addToCartAction: () => Promise<Cart>;
}) {
  // const [, setCart] = useCart(); //context api
  // const dispatch = useDispatch(); //redux
  // const setCart = useCart()(state => state.setCart);
  const setCart = useSetAtom(cartAtom, {store: useStore()});


  return (
    <button
      className="mt-6 px-8 py-2 text-lg font-bold text-white bg-blue-800 rounded-lg"
      // onClick={async() => dispatch(setCart(await addToCartAction()))} //redux
      onClick={async() => setCart(await addToCartAction())} //context, zustand, jotai
    >
      Add To Cart
    </button>
  );
}
