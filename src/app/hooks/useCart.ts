import { Cart } from "@/api/types";
import { create } from "zustand";

export type CartStore = {
    cart: Cart;
    setCart: ( cart: Cart ) => void;
}

export const useCartStore = (inititalCart: Cart) => create<CartStore>((set) => ({
    cart: inititalCart,
    setCart: (cart: Cart) => set({cart}),
}));