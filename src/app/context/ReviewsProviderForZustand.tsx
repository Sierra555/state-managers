'use client';

import { useState, createContext, useContext } from "react";
import { useReviewsStore } from "../hooks/useReviews";
import { Review } from "@/api/types";


const createStoreState = (reviews: Review[]) => useReviewsStore(reviews);

const ReviewsContext = createContext<ReturnType<typeof createStoreState> | null>(null);

export const useReviews = () => {
    const reviews = useContext(ReviewsContext);

    if(!reviews) {
        throw new Error('useReviews must be used within ReviewsProvider')
    }

    return reviews;
}

export const ReviewsProvider = ({ 
    reviews: inititalReviews, 
    children 
} :
{ 
    reviews: Review[], 
    children: React.ReactNode
}) => {
    const [reviewsStore] = useState(() => createStoreState(inititalReviews));

    return (
        <ReviewsContext.Provider value={reviewsStore}>
            {children}
        </ReviewsContext.Provider>
    )
}