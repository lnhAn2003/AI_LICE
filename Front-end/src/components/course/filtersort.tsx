// src/components/course/filtersort.tsx
import React, { useState } from 'react';
import { FaRedo } from 'react-icons/fa';
import { Category } from '../../types/course';

interface FilterSortProps {
    onFilterChange: (filters: Record<string, any>) => void;
    onSortChange: (sortBy: string) => void;
    courseCategories: Category[];
}

const FilterSortComponent: React.FC<FilterSortProps> = ({
    onFilterChange,
    onSortChange,
    courseCategories,
}) => {
    const initialFilters: Record<string, any> = {
        keyword: '',
        categories: [] as string[],
        tags: [] as string[],
        rating: '',
        minRatings: '',
        dateRange: '',
    };

    const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
    const [showSections, setShowSections] = useState<Record<string, boolean>>({
        keyword: true,
        categories: false,
        tags: false,
        rating: false,
        minRatings: false,
        dateRange: false,
    });

    const toggleSection = (section: string) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleResetFilters = () => {
        setFilters(initialFilters);
        onFilterChange(initialFilters);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        const updatedFilters = { ...filters, keyword };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        if (selectedCategory && !filters.categories.includes(selectedCategory)) {
            const updatedCategories = [...filters.categories, selectedCategory];
            const updatedFilters = { ...filters, categories: updatedCategories };
            setFilters(updatedFilters);
            onFilterChange(updatedFilters);
        }
    };

    const removeCategory = (categoryId: string) => {
        const updatedCategories = filters.categories.filter((cat: string) => cat !== categoryId);
        const updatedFilters = { ...filters, categories: updatedCategories };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const tagsArray = input
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '');
        const updatedFilters = { ...filters, tags: tagsArray };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rating = e.target.value;
        const updatedFilters = { ...filters, rating };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleMinRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minRatings = e.target.value;
        const updatedFilters = { ...filters, minRatings };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dateRange = e.target.value;
        const updatedFilters = { ...filters, dateRange };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="dark:bg-gray-800 border border-gray-500 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-800 dark:text-gray-100 font-semibold">Filters</h2>
                <button
                    onClick={handleResetFilters}
                    className="flex items-center bg-red-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <FaRedo className="w-4 h-4" />
                </button>
            </div>

            {/* Keyword Search */}
            <div className="mb-4 text-gray-800 dark:text-gray-100">
                <button
                    type="button"
                    className="w-full text-left flex justify-between items-center font-medium focus:outline-none"
                    onClick={() => toggleSection('keyword')}
                >
                    Keyword Search
                </button>
                {showSections.keyword && (
                    <div className="mt-2">
                        <input
                            type="text"
                            value={filters.keyword}
                            onChange={handleKeywordChange}
                            className="w-full dark:text-gray-100 p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                            placeholder="Search courses..."
                        />
                    </div>
                )}
            </div>

            {/* Categories */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => toggleSection('categories')}
                    className="w-full text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
                >
                    Categories
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {showSections.categories && (
                    <div className="mt-2">
                        <select
                            onChange={handleCategoryChange}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select a category</option>
                            {courseCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {/* Selected Categories */}
                        {filters.categories.length > 0 && (
                            <div className="mt-2 flex flex-wrap">
                                {filters.categories.map((catId: string) => {
                                    const category = courseCategories.find((c) => c._id === catId);
                                    return (
                                        <span
                                            key={catId}
                                            className="bg-gray-600 text-blue-300 px-2 py-1 rounded-full mr-2 mb-2 flex items-center text-sm"
                                        >
                                            {category?.name}
                                            <button
                                                onClick={() => removeCategory(catId)}
                                                className="ml-1 text-blue-300 hover:text-red-400 focus:outline-none"
                                                aria-label={`Remove category ${category?.name}`}
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => toggleSection('tags')}
                    className="w-full text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
                >
                    Tags
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {showSections.tags && (
                    <div className="mt-2">
                        <input
                            type="text"
                            onChange={handleTagChange}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-purple-400 focus:outline-none"
                            placeholder="Enter tags separated by commas"
                        />
                        {filters.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap">
                                {filters.tags.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-purple-600 text-purple-300 px-2 py-1 rounded-full mr-2 mb-2 flex items-center text-sm"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => {
                                                const updatedTags = filters.tags.filter((t: any, i: number) => i !== index);
                                                const updatedFilters = { ...filters, tags: updatedTags };
                                                setFilters(updatedFilters);
                                                onFilterChange(updatedFilters);
                                            }}
                                            className="ml-1 text-purple-300 hover:text-red-400 focus:outline-none"
                                            aria-label={`Remove tag ${tag}`}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Minimum Rating */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => toggleSection('rating')}
                    className="w-full text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
                >
                    Minimum Rating
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {showSections.rating && (
                    <div className="mt-2">
                        <select
                            onChange={handleRatingChange}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                        >
                            <option value="">Select rating</option>
                            <option value="1">1 ★ & up</option>
                            <option value="2">2 ★ & up</option>
                            <option value="3">3 ★ & up</option>
                            <option value="4">4 ★ & up</option>
                            <option value="5">5 ★</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Minimum Ratings Count */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => toggleSection('minRatings')}
                    className="w-full text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
                >
                    Minimum Ratings Count
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {showSections.minRatings && (
                    <div className="mt-2">
                        <input
                            type="number"
                            min="0"
                            onChange={handleMinRatingsChange}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Minimum number of ratings"
                        />
                    </div>
                )}
            </div>

            {/* Release Date (Example) */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => toggleSection('dateRange')}
                    className="w-full text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
                >
                    Release Date
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {showSections.dateRange && (
                    <div className="mt-2">
                        <select
                            onChange={handleDateRangeChange}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-1 focus:ring-teal-400 focus:outline-none"
                        >
                            <option value="">Select release date</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                            <option value="Last Year">Last Year</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Apply Filters */}
            <button
                onClick={() => onFilterChange(filters)}
                className="w-full bg-blue-500 mt-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterSortComponent;
