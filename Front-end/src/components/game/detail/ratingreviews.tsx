// components/game/detail/ratingreviews.tsx

import React from 'react';

interface Review {
  username: string;
  comment: string;
  rating: number;
}

interface RatingsReviewsProps {
  averageRating: number;
  totalRatings: number;
  reviews: Review[];
}

const RatingsReviews: React.FC<RatingsReviewsProps> = ({
  averageRating,
  totalRatings,
  reviews,
}) => {
  const stars = Math.round(averageRating);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Ratings & Reviews
      </h2>
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400 text-2xl">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < stars ? '★' : '☆'}</span>
          ))}
        </div>
        <div className="ml-4 text-gray-700 dark:text-gray-300">
          {averageRating}/5 ({totalRatings} Ratings)
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
          Rate This Game:
        </h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="text-3xl text-gray-400 hover:text-yellow-500 focus:outline-none"
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
          User Reviews:
        </h3>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <strong className="text-gray-800 dark:text-gray-100">
                {review.username}
              </strong>
              <div className="flex text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(review.rating) ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
          </div>
        ))}
        {/* Pagination controls can be added here */}
      </div>
    </section>
  );
};

export default RatingsReviews;