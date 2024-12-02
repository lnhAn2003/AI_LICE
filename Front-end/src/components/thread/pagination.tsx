// src/components/thread/pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  // Determine the range of pages to display
  const siblingCount = 1;
  const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, and siblings

  if (totalPages <= totalPageNumbers) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    pageNumbers.push(1);

    if (showLeftEllipsis) {
      pageNumbers.push('left-ellipsis');
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    if (showRightEllipsis) {
      pageNumbers.push('right-ellipsis');
    }

    pageNumbers.push(totalPages);
  }

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 
          ${currentPage !== 1 && 'hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'}`}
        aria-label="Previous Page"
      >
        Previous
      </button>
      {pageNumbers.map((number, index) =>
        typeof number === 'string' ? (
          <span key={index} className="px-3 py-1 text-gray-500 dark:text-gray-400">
            &hellip;
          </span>
        ) : (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`px-3 py-1 rounded-md 
              ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
              }`}
            aria-current={currentPage === number ? 'page' : undefined}
            aria-label={`Page ${number}`}
          >
            {number}
          </button>
        )
      )}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 
          ${currentPage !== totalPages && 'hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'}`}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
