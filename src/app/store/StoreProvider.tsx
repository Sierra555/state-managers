'use client'

import { Provider } from "react-redux";
import { createStore, setCart } from "./store";
import { Cart, Review } from "@/api/types";
import { useRef } from "react";

const StoreProvider = ({cart, children} : {cart: Cart, children: React.ReactNode}) => {
  const storeRef = useRef<ReturnType<typeof createStore>| null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();
    storeRef.current?.dispatch(setCart(cart));
  }
    
  return (
    <Provider store={storeRef.current!}>
        {children}
    </Provider>
  );
};

export default StoreProvider;