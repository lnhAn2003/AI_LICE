// src/components/game/filtersort.tsx
import React, { useState } from 'react';

interface FilterSortProps {
    onFilterChange: (filters: Record<string, any>) => void;
    onSortChange: (sortBy: string) => void;
    gameGenres: Category[];
    gameEngines: Category[];
    gamePlatform: string[];
}

interface Category {
    _id: string;
    name: string;
}

const FilterSortComponent: React.FC<FilterSortProps> = ({
    onFilterChange,
    gameGenres,
    gameEngines,
    gamePlatform,
}) => {
    const [filters, setFilters] = useState<Record<string, any>>({
        keyword: '',
        genres: [],
        engines: [],
        platforms: [],
        tags: [],
        rating: '',
        minRatings: '',
        downloads: '',
        gameModes: [],
        releaseDate: '',
        uploader: '',
    });

    const [showSections, setShowSections] = useState<Record<string, boolean>>({
        sortBy: false,
        keyword: false,
        genres: false,
        engines: false,
        platforms: false, 
        tags: false,
        rating: false,
        minRatings: false,
        downloads: false,
        gameModes: false,
        releaseDate: false,
        uploader: false,
    });

    // Toggle section visibility
    const toggleSection = (section: string) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handler functions
    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        const updatedFilters = { ...filters, keyword };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Genre handlers
    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenre = event.target.value;
        if (selectedGenre && !filters.genres.includes(selectedGenre)) {
            const updatedGenres = [...filters.genres, selectedGenre];
            const updatedFilters = { ...filters, genres: updatedGenres };
            setFilters(updatedFilters);
            onFilterChange(updatedFilters);
        }
    };

    const removeGenre = (genre: string) => {
        const updatedGenres = filters.genres.filter((g: string) => g !== genre);
        const updatedFilters = { ...filters, genres: updatedGenres };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Engine handlers
    const handleEngineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEngine = event.target.value;
        if (selectedEngine && !filters.engines.includes(selectedEngine)) {
            const updatedEngines = [...filters.engines, selectedEngine];
            const updatedFilters = { ...filters, engines: updatedEngines };
            setFilters(updatedFilters);
            onFilterChange(updatedFilters);
        }
    };

    const removeEngine = (engine: string) => {
        const updatedEngines = filters.engines.filter((e: string) => e !== engine);
        const updatedFilters = { ...filters, engines: updatedEngines };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Flatform handlers
  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlatform = event.target.value;
    if (selectedPlatform && !filters.platforms.includes(selectedPlatform)) {
      const updatedPlatforms = [...filters.platforms, selectedPlatform];
      const updatedFilters = { ...filters, platforms: updatedPlatforms };
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
    }
  };

  const removePlatform = (platform: string) => {
    const updatedPlatforms = filters.platforms.filter((p: string) => p !== platform);
    const updatedFilters = { ...filters, platforms: updatedPlatforms };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

    // Tag handlers
    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const tagsArray = input
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '');
        const updatedFilters = { ...filters, tags: tagsArray };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Rating handlers
    const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRating = event.target.value;
        const updatedFilters = { ...filters, rating: selectedRating };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Minimum ratings count handler
    const handleMinRatingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minRatings = event.target.value;
        const updatedFilters = { ...filters, minRatings };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Downloads handler
    const handleDownloadsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDownloads = event.target.value;
        const updatedFilters = { ...filters, downloads: selectedDownloads };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Game modes handler
    const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const mode = event.target.value;
        const checked = event.target.checked;
        let updatedGameModes = [...filters.gameModes];

        if (checked) {
            updatedGameModes.push(mode);
        } else {
            updatedGameModes = updatedGameModes.filter((m: string) => m !== mode);
        }

        const updatedFilters = { ...filters, gameModes: updatedGameModes };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Release date handler
    const handleReleaseDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const releaseDate = event.target.value;
        const updatedFilters = { ...filters, releaseDate };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Custom date range handlers
    const handleCustomStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = event.target.value;
        const updatedReleaseDate = { ...filters.releaseDate, start: startDate };
        const updatedFilters = { ...filters, releaseDate: updatedReleaseDate };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleCustomEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = event.target.value;
        const updatedReleaseDate = { ...filters.releaseDate, end: endDate };
        const updatedFilters = { ...filters, releaseDate: updatedReleaseDate };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Uploader handler
    const handleUploaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploader = event.target.value;
        const updatedFilters = { ...filters, uploader };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="dark:bg-gray-700 border border-gray-400 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl text-gray-700 dark:text-white font-bold mb-6 ">Filters</h2>

            {/* Keyword Search */}
            <div className="mb-6 text-gray-800 dark:text-white">
                <button>
                    Keyword Search
                </button>
                <div className="mt-4">
                    <input
                        id="keyword"
                        type="text"
                        value={filters.keyword}
                        onChange={handleKeywordChange}
                        className="w-full dark:text-white  p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search games..."
                    />
                </div>
            </div>

            {/* Categories (Genres) */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('genres')}
                    className="w-full text-left flex justify-between items-center text-gray-700 dark:text-white font-medium focus:outline-none"
                >
                    Categories (Genres)
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.genres ? 'rotate-180' : ''
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
                {showSections.genres && (
                    <div className="mt-4">
                        <select
                            id="genres"
                            onChange={handleGenreChange}
                            className="w-full p-3 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select a genre</option>
                            {gameGenres.map((genre) => (
                                <option key={genre._id} value={genre._id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        {/* Selected Genres */}
                        {filters.genres.length > 0 && (
                            <div className="mt-3 flex flex-wrap">
                                {filters.genres.map((genreId: string) => {
                                    const genre = gameGenres.find((g) => g._id === genreId);
                                    return (
                                        <span
                                            key={genreId}
                                            className="bg-gray-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                                        >
                                            {genre?.name}
                                            <button
                                                onClick={() => removeGenre(genreId)}
                                                className="ml-2 text-blue-700 hover:text-red-500 focus:outline-none"
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

            {/* Categories (Engines) */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('engines')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center font-medium focus:outline-none"
                >
                    Categories (Engines)
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.engines ? 'rotate-180' : ''
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
                {showSections.engines && (
                    <div className="mt-4">
                        <select
                            id="engines"
                            onChange={handleEngineChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option value="">Select an engine</option>
                            {gameEngines.map((engine) => (
                                <option key={engine._id} value={engine._id}>
                                    {engine.name}
                                </option>
                            ))}
                        </select>
                        {/* Selected Engines */}
                        {filters.engines.length > 0 && (
                            <div className="mt-3 flex flex-wrap">
                                {filters.engines.map((engineId: string) => {
                                    const engine = gameEngines.find((e) => e._id === engineId);
                                    return (
                                        <span
                                            key={engineId}
                                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                                        >
                                            {engine?.name}
                                            <button
                                                onClick={() => removeEngine(engineId)}
                                                className="ml-2 text-green-700 hover:text-red-500 focus:outline-none"
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

            {/* Game Flatforms */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('platforms')} // Corrected section name
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center font-medium focus:outline-none"
                >
                    Game Platforms
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.platforms ? 'rotate-180' : ''
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
                {showSections.platforms && (
                    <div className="mt-4">
                        <select
                            id="platforms" 
                            onChange={handlePlatformChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            <option value="">Select a platform</option>
                            {gamePlatform.map((platform) => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </select>
                        {/* Selected Platforms */}
                        {filters.platforms.length > 0 && (
                            <div className="mt-3 flex flex-wrap">
                                {filters.platforms.map((platform: string) => (
                                    <span
                                        key={platform}
                                        className="bg-green-100 text-red-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                                    >
                                        {platform}
                                        <button
                                            onClick={() => removePlatform(platform)} 
                                            className="ml-2 text-red-700 hover:text-red-500 focus:outline-none"
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


            {/* Tags */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('tags')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Tags
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.tags ? 'rotate-180' : ''
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
                    <div className="mt-4">
                        <input
                            id="tags"
                            type="text"
                            onChange={handleTagChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter tags separated by commas"
                        />
                    </div>
                )}
            </div>

            {/* Minimum Rating */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('rating')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Minimum Rating
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.rating ? 'rotate-180' : ''
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
                    <div className="mt-4">
                        <select
                            id="rating"
                            onChange={handleRatingChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('minRatings')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Minimum Ratings Count
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.minRatings ? 'rotate-180' : ''
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
                    <div className="mt-4">
                        <input
                            id="minRatings"
                            type="number"
                            min="0"
                            onChange={handleMinRatingsChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Minimum number of ratings"
                        />
                    </div>
                )}
            </div>

            {/* Downloads */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('downloads')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Downloads
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.downloads ? 'rotate-180' : ''
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
                {showSections.downloads && (
                    <div className="mt-4">
                        <select
                            id="downloads"
                            onChange={handleDownloadsChange}
                            className="w-full text-gray-700 dark:text-white p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        >
                            <option value="">Select download range</option>
                            <option value="1000+">1000+</option>
                            <option value="500-999">500-999</option>
                            <option value="<500">&lt;500</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Game Modes */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('gameModes')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Game Modes
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.gameModes ? 'rotate-180' : ''
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
                {showSections.gameModes && (
                    <div className="mt-4">
                        <div className="flex flex-wrap">
                            {['Single Player', 'Multiplayer', 'Both'].map((mode) => (
                                <label key={mode} className="flex items-center mr-4 mb-2">
                                    <input
                                        type="checkbox"
                                        value={mode}
                                        onChange={handleGameModeChange}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-white">{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Release Date */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('releaseDate')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Release Date
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.releaseDate ? 'rotate-180' : ''
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
                {showSections.releaseDate && (
                    <div className="mt-4">
                        <select
                            id="releaseDate"
                            onChange={handleReleaseDateChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        >
                            <option value="">Select release date</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                            <option value="Last Year">Last Year</option>
                            <option value="Custom Range">Custom Range</option>
                        </select>
                        {/* Custom Date Range */}
                        {filters.releaseDate === 'Custom Range' && (
                            <div className="mt-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Custom Date Range
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        onChange={handleCustomStartDateChange}
                                        className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    />
                                    <input
                                        type="date"
                                        onChange={handleCustomEndDateChange}
                                        className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Uploader/Developer */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => toggleSection('uploader')}
                    className="w-full text-gray-700 dark:text-white text-left flex justify-between items-center text-gray-700 font-medium focus:outline-none"
                >
                    Uploader/Developer
                    <svg
                        className={`w-5 h-5 transform transition-transform ${showSections.uploader ? 'rotate-180' : ''
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
                {showSections.uploader && (
                    <div className="mt-4">
                        <input
                            id="uploader"
                            type="text"
                            onChange={handleUploaderChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            placeholder="Type name or choose..."
                        />
                    </div>
                )}
            </div>

            {/* Apply Filters Button */}
            <button
                onClick={() => onFilterChange(filters)}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterSortComponent;
