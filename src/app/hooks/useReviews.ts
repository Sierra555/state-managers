import { Review } from '@/api/types';
import { create } from 'zustand';

export type ReviewsStore =  {
    reviews: Review[];
    setReviews: (reviews: Review[]) => void;
}

export const useReviewsStore = (inititalReviews: Review[]) => create<ReviewsStore>((set) => ({
    reviews: inititalReviews,
    setReviews: (reviews: Review[]) => set({reviews}),
}));