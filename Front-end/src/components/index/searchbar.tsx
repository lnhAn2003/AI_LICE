// src/components/index/SearchBar.tsx

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400"
      />
      <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-gray-300" />
    </div>
  );
};

export default SearchBar;
