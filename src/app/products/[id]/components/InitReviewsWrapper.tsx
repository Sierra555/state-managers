'use client';

import { RootState, setReviews } from "@/app/store/store";
import React, { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { Review } from "@/api/types";

const InitReviewsWrapper = ({ reviews: initialReviews, children }: { reviews: Review[], children: React.ReactNode }) => {
    (function(reviews: Review[]) {    
        const store = useStore<RootState>();
        const initialized = useRef(false);
    
        useEffect(() => {
            if (!initialized.current) {
              store.dispatch(setReviews(initialReviews)); // Dispatch reviews
              initialized.current = true; // Set the initialized flag to true
            }
          }, [initialReviews, store]);  
      }(initialReviews));
  return (
    <>
      {children}
    </>
  );
};

export default InitReviewsWrapper;