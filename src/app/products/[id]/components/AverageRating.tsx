"use client";

import { Review } from "@/api/types";
import { reviewsAtom } from "@/app/jotaiStore/atoms";
import { useAtomValue, useStore } from "jotai";
import { useRef } from "react";

// import { useReviews } from "@/app/store/store";
// import { useReviews } from "@/app/context/ReviewsProviderForZustand";
// import { useReviews } from "@/app/context/ReviewsContext";

export default function AverageRating({
  reviews: initReviews
} : {
  reviews: Review[],
}) {
  // const [reviews] = useReviews(); //context api
  //  const reviews = useReviews();
  // const reviews = useReviews()(state => state.reviews); //zustand

  const store = useStore();
  const initialized = useRef(false);
  
  if(!initialized.current) {
    store.set(reviewsAtom, initReviews);
    initialized.current = true;
  }

  const reviews = useAtomValue(reviewsAtom, {store})

  return (
    <>
      {reviews && reviews?.length && (
        <div className="mt-4 font-light text-white">
          Average Rating:{" "}
          {(
            reviews?.reduce((a, b) => a + b.rating, 0) / reviews?.length
          ).toFixed(1)}
        </div>
      )}
    </>
  );
}
