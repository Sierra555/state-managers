'use client';

import { Cart } from '@/api/types';
import { createContext, useContext, useState } from 'react';

const useCartState = (inititalCart: Cart) => useState<Cart>(inititalCart)

type CartState = ReturnType<typeof useCartState>;

export const CartContext = createContext<CartState | null>(null);

export const useCart = () => {
    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error('useCart must be used within CartContextProvider')
    }

    return cart;
}

export const CartContextProvider = ({
    cart: initialCart,
    children 
} : { 
    cart: Cart, 
    children: React.ReactNode 
}) => {
    const [cart, setCart] = useCartState(initialCart);

    return (
        <CartContext.Provider value={[cart, setCart]} >
            {children}
        </CartContext.Provider>
    );
}