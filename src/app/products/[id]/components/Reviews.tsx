"use client";
import { useRef, useState } from "react";

import { Review } from "@/api/types";
import { useAtom, useStore } from "jotai";
import { reviewsAtom } from "@/app/jotaiStore/atoms";
// import { useReviews } from "@/app/context/ReviewsProviderForZustand";
// import { setReviews, useReviews } from "@/app/store/store";
// import { useDispatch } from "react-redux";
// import { useReviews } from "@/app/context/ReviewsContext";

export default function Reviews({
  reviews: initReviews,
  addReviewAction,
}: {
  reviews: Review[],
  addReviewAction: (text: string, rating: number) => Promise<Review[]>;
}) {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // const [reviews, setReviews] = useReviews(); //context
  // const reviews = useReviews(); //redux
  // const dispatch = useDispatch(); //redux
  // const { reviews, setReviews } = useReviews()();
  const store = useStore();
  const initialized = useRef(false);
  
  if(!initialized.current) {
    store.set(reviewsAtom, initReviews);
    initialized.current = true;
  }

  const [reviews, setReviews] = useAtom(reviewsAtom, {store: useStore()})

  return (
    <>
      {reviews?.map((review, index) => (
        <div key={index} className="p-5">
          <div className="my-1 text-md leading-5 text-gray-300">
            {review.rating} stars
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-300 font-light italic">
            {review.text}
          </div>
        </div>
      ))}
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          setReviews(await addReviewAction(reviewText, reviewRating)) //context api zustand jotai
          // dispatch(setReviews(await addReviewAction(reviewText, reviewRating))) //redux
          setReviewText("");
          setReviewRating(5);
        }}
      >
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="review-text">Review</label>
          <input
            id="review-text"
            className="p-2 border border-gray-300 rounded-md bg-transparent text-white flex-grow"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <label htmlFor="review-rating">Rating</label>
          <input
            id="review-rating"
            className="p-2 border border-gray-300 rounded-md bg-transparent text-white"
            type="number"
            min={1}
            max={5}
            value={reviewRating}
            onChange={(e) => setReviewRating(+e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={!reviewText}
            className="mt-6 px-8 py-2 text-lg font-bold text-white bg-blue-800 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={async () => {}}
          >
            Submit Review
          </button>
        </div>
      </form>
    </>
  );
}
