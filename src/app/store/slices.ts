import { Cart, Review } from "@/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StateType = {
    cart: Cart;
    reviews: Review[] | null;
}

const initialState: StateType = {
    cart: {
        products: [],
    },
    reviews: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload
        }
    }
});

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload
        }
    }
})