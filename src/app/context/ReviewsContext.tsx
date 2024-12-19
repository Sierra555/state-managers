'use client';

import { createContext, useContext, useState } from "react";
import { type Review } from "@/api/types";

const useReviewsState = (inititalReviews: Review[]) => useState<Review[]>(inititalReviews);

type ReviewsContextType = ReturnType<typeof useReviewsState>

const ReviewsContext = createContext<ReviewsContextType | null>(null);

export const useReviews = () => {
    const reviews = useContext(ReviewsContext);

    if (!reviews) {
        throw new Error('useReviews must be used within ReviewsContextProvider')
    }

   return reviews;
}

export const ReviewsContextProvider = ({ 
    reviews: initialReviews, 
    children
} : { 
    reviews: Review[], 
    children: React.ReactNode 
}) => {
    const [reviews, setReviews] = useReviewsState(initialReviews);

    return (
        <ReviewsContext.Provider value={[reviews, setReviews]}>
            {children}
        </ReviewsContext.Provider>
    );
};
