import React, { useState } from 'react';

interface Category {
  _id: string;
  name: string;
}

interface FilterSortProps {
  onFilterChange: (filters: Record<string, any>) => void;
  onSortChange: (sortBy: string) => void;
  categories: Category[];
}

const FilterSortComponent: React.FC<FilterSortProps> = ({ onFilterChange, onSortChange, categories }) => {
  const [filters, setFilters] = useState<Record<string, any>>({ category: [] });
  const [sortBy, setSortBy] = useState<string>('Most Recent');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    if (selectedCategory && !filters.category.includes(selectedCategory)) {
      const updatedCategories = [...filters.category, selectedCategory];
      const updatedFilters = { ...filters, category: updatedCategories };
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
    }
  };

  const removeCategory = (category: string) => {
    const updatedCategories = filters.category.filter((c: string) => c !== category);
    const updatedFilters = { ...filters, category: updatedCategories };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllCategories = () => {
    const updatedFilters = { ...filters, category: [] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  return (
    <div className="mb-6 border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>

      {/* Sort By Dropdown */}
      <label htmlFor="sort-by" className="block mb-2">Sort by:</label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={handleSortChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="Most Recent">Most Recent</option>
        <option value="Most Viewed">Most Viewed</option>
        <option value="Highest Rated">Highest Rated</option>
        <option value="New Releases">New Releases</option>
      </select>

      {/* Filter by Category */}
      <label htmlFor="categories" className="block mb-2">Categories:</label>
      <select
        id="categories"
        onChange={handleCategoryChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Display selected categories */}
      {filters.category.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Selected Categories:</h4>
          <div className="flex flex-wrap">
            {filters.category.map((categoryId: string) => {
              const category = categories.find(cat => cat._id === categoryId);
              return (
                <span
                  key={categoryId}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  {category?.name}
                  <button
                    onClick={() => removeCategory(categoryId)}
                    className="ml-2 text-blue-700 hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
          <button
            onClick={clearAllCategories}
            className="text-blue-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSortComponent;
