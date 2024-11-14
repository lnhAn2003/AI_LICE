import React, { useState } from 'react';

interface Category {
  _id: string;
  name: string;
}

interface FilterSortProps {
  onFilterChange: (filters: Record<string, any>) => void;
  onSortChange: (sortBy: string) => void;
  gameGenres: Category[];
  gameEngines: Category[];
}

const FilterSortComponent: React.FC<FilterSortProps> = ({ onFilterChange, onSortChange, gameGenres, gameEngines }) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    keyword: '',
    genres: [],
    engines: [],
    tags: [],
    rating: '',
    minRatings: '',
    downloads: '',
    gameModes: [],
    releaseDate: '',
    uploader: '',
  });

  // Handle Keyword Search
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    const updatedFilters = { ...filters, keyword };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Genre Change
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

  const clearAllGenres = () => {
    const updatedFilters = { ...filters, genres: [] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Engine Change
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

  const clearAllEngines = () => {
    const updatedFilters = { ...filters, engines: [] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Tag Change
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const tagsArray = input.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const updatedFilters = { ...filters, tags: tagsArray };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Rating Change
  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = event.target.value;
    const updatedFilters = { ...filters, rating: selectedRating };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Minimum Ratings Count Change
  const handleMinRatingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minRatings = event.target.value;
    const updatedFilters = { ...filters, minRatings };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Downloads Change
  const handleDownloadsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDownloads = event.target.value;
    const updatedFilters = { ...filters, downloads: selectedDownloads };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Game Mode Change
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

  // Handle Release Date Change
  const handleReleaseDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const releaseDate = event.target.value;
    const updatedFilters = { ...filters, releaseDate };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Custom Date Range
  const handleCustomDateRangeChange = (start: string, end: string) => {
    const updatedFilters = { ...filters, releaseDate: { start, end } };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle Uploader/Developer Change
  const handleUploaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploader = event.target.value;
    const updatedFilters = { ...filters, uploader };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="mb-6 border p-4 rounded-lg bg-white shadow-sm">
      {/* Keyword Search */}
      <label htmlFor="keyword" className="block mb-2">Keyword Search:</label>
      <input
        id="keyword"
        type="text"
        value={filters.keyword}
        onChange={handleKeywordChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Type here to search..."
      />

      {/* Filter by Genres */}
      <label htmlFor="genres" className="block mb-2">Categories (Genres):</label>
      <select
        id="genres"
        onChange={handleGenreChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select a genre</option>
        {gameGenres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Display selected genres */}
      {filters.genres.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Selected Genres:</h4>
          <div className="flex flex-wrap">
            {filters.genres.map((genreId: string) => {
              const genre = gameGenres.find(gen => gen._id === genreId);
              return (
                <span
                  key={genreId}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  {genre?.name}
                  <button
                    onClick={() => removeGenre(genreId)}
                    className="ml-2 text-blue-700 hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
          <button
            onClick={clearAllGenres}
            className="text-blue-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter by Engines */}
      <label htmlFor="engines" className="block mb-2">Categories (Engines):</label>
      <select
        id="engines"
        onChange={handleEngineChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select an engine</option>
        {gameEngines.map((engine) => (
          <option key={engine._id} value={engine._id}>
            {engine.name}
          </option>
        ))}
      </select>

      {/* Display selected engines */}
      {filters.engines.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Selected Engines:</h4>
          <div className="flex flex-wrap">
            {filters.engines.map((engineId: string) => {
              const engine = gameEngines.find(eng => eng._id === engineId);
              return (
                <span
                  key={engineId}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  {engine?.name}
                  <button
                    onClick={() => removeEngine(engineId)}
                    className="ml-2 text-green-700 hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
          <button
            onClick={clearAllEngines}
            className="text-green-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter by Tags */}
      <label htmlFor="tags" className="block mb-2">Tags (comma separated):</label>
      <input
        id="tags"
        type="text"
        onChange={handleTagChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter tags separated by commas"
      />

      {/* Filter by Rating */}
      <label htmlFor="rating" className="block mb-2">Minimum Rating:</label>
      <select
        id="rating"
        onChange={handleRatingChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select rating</option>
        <option value="1">1 ★ & up</option>
        <option value="2">2 ★ & up</option>
        <option value="3">3 ★ & up</option>
        <option value="4">4 ★ & up</option>
        <option value="5">5 ★</option>
      </select>

      {/* Minimum Ratings Count */}
      <label htmlFor="minRatings" className="block mb-2">Minimum Ratings Count:</label>
      <input
        id="minRatings"
        type="number"
        min="0"
        onChange={handleMinRatingsChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Minimum number of ratings"
      />

      {/* Filter by Downloads */}
      <label htmlFor="downloads" className="block mb-2">Downloads:</label>
      <select
        id="downloads"
        onChange={handleDownloadsChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select download range</option>
        <option value="1000+">1000+</option>
        <option value="500-999">500-999</option>
        <option value="<500">&lt;500</option>
      </select>

      {/* Game Mode */}
      <label className="block mb-2">Game Mode:</label>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value="Single Player"
            onChange={handleGameModeChange}
            className="form-checkbox"
          />
          <span className="ml-2">Single Player</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Multiplayer"
            onChange={handleGameModeChange}
            className="form-checkbox"
          />
          <span className="ml-2">Multiplayer</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Both"
            onChange={handleGameModeChange}
            className="form-checkbox"
          />
          <span className="ml-2">Both</span>
        </label>
      </div>

      {/* Release Date */}
      <label htmlFor="releaseDate" className="block mb-2">Release Date:</label>
      <select
        id="releaseDate"
        onChange={handleReleaseDateChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select release date</option>
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
        <option value="Last Year">Last Year</option>
        <option value="Custom Range">Custom Range</option>
      </select>

      {/* Custom Date Range */}
      {filters.releaseDate === 'Custom Range' && (
        <div className="mb-4">
          <label className="block mb-2">Custom Date Range:</label>
          <input
            type="date"
            onChange={(e) => handleCustomDateRangeChange(e.target.value, filters.releaseDate.end)}
            className="p-2 border border-gray-300 rounded-md w-full mb-2"
            placeholder="Start Date"
          />
          <input
            type="date"
            onChange={(e) => handleCustomDateRangeChange(filters.releaseDate.start, e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="End Date"
          />
        </div>
      )}

      {/* Uploader/Developer */}
      <label htmlFor="uploader" className="block mb-2">Uploader/Developer:</label>
      <input
        id="uploader"
        type="text"
        onChange={handleUploaderChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Type name or choose..."
      />

      {/* Apply Filters Button */}
      <button
        onClick={() => onFilterChange(filters)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSortComponent;
