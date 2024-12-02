// src/components/thread/sort.tsx
import React from 'react';

interface SortProps {
  sortBy: string;
  onSortChange: (sortOption: string) => void;
}

const Sort: React.FC<SortProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center mb-6">
      <label
        htmlFor="sort-by"
        className="mr-2 text-gray-700 dark:text-gray-300"
      >
        Sort by:
      </label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="Latest">Latest</option>
        <option value="Most Replies">Most Replies</option>
        <option value="Most Views">Most Views</option>
        <option value="Trending">Trending</option>
      </select>
    </div>
  );
};

export default Sort;
