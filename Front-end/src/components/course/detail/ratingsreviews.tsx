import React, { useState } from 'react';
import { Rating } from '../../../types/course';

interface RatingsReviewsProps {
  averageRating: number;
  ratingCount: number;
  ratings: Rating[];
  onAddRating?: (rating: number) => void; // Callback for adding a rating
}

const RatingsReviews: React.FC<RatingsReviewsProps> = ({
  averageRating,
  ratingCount,
  ratings,
  onAddRating,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  const avgStars = Math.round(averageRating);

  const handleMouseEnter = (index: number) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(null);
  const handleClick = (index: number) => {
    setUserRating(index);
    if (onAddRating) onAddRating(index); // Call the provided callback
  };

  return (
    <div className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Ratings & Reviews
      </h2>
      <div className="flex items-center mb-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              className={`w-8 h-8 cursor-pointer ${
                hoveredRating !== null
                  ? i < hoveredRating
                    ? 'text-yellow-400 dark:text-yellow-300'
                    : 'text-gray-400'
                  : userRating !== null
                  ? i < userRating
                    ? 'text-yellow-400 dark:text-yellow-300'
                    : 'text-gray-400'
                  : i < avgStars
                  ? 'text-yellow-400 dark:text-yellow-300'
                  : 'text-gray-400'
              }`}
              fill="currentColor"
              onMouseEnter={() => handleMouseEnter(i + 1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(i + 1)}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.363 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.359-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.783.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.363-1.118L2.171 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z"></path>
            </svg>
          ))}
        {ratingCount > 0 ? (
          <>
            <span className="ml-3 text-gray-800 dark:text-gray-200 text-xl font-semibold">
              {averageRating.toFixed(1)} / 5
            </span>
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
              ({ratingCount} ratings)
            </span>
          </>
        ) : (
          <span className="ml-3 text-gray-600 dark:text-gray-400 text-lg italic">
            No ratings yet
          </span>
        )}
      </div>
      <div className="space-y-4">
        {ratingCount > 0 ? (
          ratings.map((rating) => (
            <div key={rating._id} className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="font-medium text-gray-800 dark:text-gray-100 mr-2">
                  User: {rating.userId}
                </div>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < rating.rating
                          ? 'text-yellow-400 dark:text-yellow-300'
                          : 'text-gray-400'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.363 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.359-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.783.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.363-1.118L2.171 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z"></path>
                    </svg>
                  ))}
              </div>
              {rating.comment && (
                <p className="text-gray-700 dark:text-gray-300">{rating.comment}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">
            Be the first to leave a rating or review!
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingsReviews;
