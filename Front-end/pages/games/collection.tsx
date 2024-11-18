import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';
import FilterSortComponent from '../../src/components/game/filtersort';
import Pagination from '../../src/components/game/pagination';

interface Category {
  _id: string;
  name: string;
  key: string;
}

interface Game {
  description: any;
  ratingCount: number;
  successVotes: any;
  categories: Category[];
  _id: string;
  title: string;
  images: string[];
  averageRating: number;
  viewCount: number;
  newRelease: boolean;
  tags: string[];
  downloadCount: number;
  gameModes: string[];
  releaseDate: string;
  uploadedBy: {
    username: string;
    _id: string;
  };
}

const ITEMS_PER_PAGE = 6;

const GameCollection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [gameGenres, setGameGenres] = useState<Category[]>([]);
  const [gameEngines, setGameEngines] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>('Most Recent');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch game data from the backend
  useEffect(() => {
    const fetchGamesAndCategories = async () => {
      try {
        const gameResponse = await axiosInstance.get('/gameshareds');
        setGames(gameResponse.data);
        setFilteredGames(gameResponse.data);

        const categoryResponse = await axiosInstance.get('/categories');
        const categoryData = categoryResponse.data;

        // Separate categories into genres and engines
        const genres = categoryData.filter((cat: Category) => cat.key === 'game_genre');
        const engines = categoryData.filter((cat: Category) => cat.key === 'game_engine');

        setGameGenres(genres);
        setGameEngines(engines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGamesAndCategories();
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = games;

    // Keyword Search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(keyword) ||
          game.description.toLowerCase().includes(keyword)
      );
    }

    // Filter by selected genre IDs
    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter((game) =>
        filters.genres.every((selectedGenreId: string) =>
          Array.isArray(game.categories) &&
          game.categories.some((category) => category._id === selectedGenreId)
        )
      );
    }

    // Filter by selected engine IDs
    if (filters.engines && filters.engines.length > 0) {
      filtered = filtered.filter((game) =>
        filters.engines.every((selectedEngineId: string) =>
          Array.isArray(game.categories) &&
          game.categories.some((category) => category._id === selectedEngineId)
        )
      );
    }

    // Filter by selected tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((game) =>
        filters.tags.every((selectedTag: string) =>
          Array.isArray(game.tags) && game.tags.includes(selectedTag)
        )
      );
    }

    // Filter by minimum rating
    if (filters.rating) {
      filtered = filtered.filter((game) => game.averageRating >= parseInt(filters.rating, 10));
    }

    // Filter by minimum ratings count
    if (filters.minRatings) {
      filtered = filtered.filter((game) => game.ratingCount >= parseInt(filters.minRatings, 10));
    }

    // Filter by download range
    if (filters.downloads) {
      if (filters.downloads === '1000+') {
        filtered = filtered.filter((game) => game.downloadCount >= 1000);
      } else if (filters.downloads === '500-999') {
        filtered = filtered.filter(
          (game) => game.downloadCount >= 500 && game.downloadCount < 1000
        );
      } else if (filters.downloads === '<500') {
        filtered = filtered.filter((game) => game.downloadCount < 500);
      }
    }

    // Filter by Game Mode
    if (filters.gameModes && filters.gameModes.length > 0) {
      filtered = filtered.filter((game) =>
        filters.gameModes.some((mode: string) => game.gameModes.includes(mode))
      );
    }

    // Filter by Release Date
    if (filters.releaseDate) {
      const now = new Date();
      let startDate: Date | null = null;

      if (filters.releaseDate === 'Last 7 Days') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (filters.releaseDate === 'Last 30 Days') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (filters.releaseDate === 'Last Year') {
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      } else if (filters.releaseDate.start && filters.releaseDate.end) {
        startDate = new Date(filters.releaseDate.start);
        const endDate = new Date(filters.releaseDate.end);
        filtered = filtered.filter((game) => {
          const gameDate = new Date(game.releaseDate);
          return gameDate >= startDate! && gameDate <= endDate;
        });
      }

      if (startDate) {
        filtered = filtered.filter((game) => {
          const gameDate = new Date(game.releaseDate);
          return gameDate >= startDate!;
        });
      }
    }

    // Filter by Uploader/Developer
    if (filters.uploader) {
      const uploader = filters.uploader.toLowerCase();
      filtered = filtered.filter((game) =>
        game.uploadedBy.username.toLowerCase().includes(uploader)
      );
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: string) => {
    let sortedGames = [...filteredGames];

    if (sortBy === 'Most Viewed') {
      sortedGames.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'Highest Rated') {
      sortedGames.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortBy === 'Most Downloaded') {
      sortedGames.sort((a, b) => b.downloadCount - a.downloadCount);
    } else if (sortBy === 'Success Rate') {
      sortedGames.sort((a, b) => b.successVotes.percentage - a.successVotes.percentage);
    } else {
      // Most Recent
      sortedGames.sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    }

    setSortBy(sortBy);
    setFilteredGames(sortedGames);
    setCurrentPage(1);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

  // Get games for current page
  const indexOfLastGame = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstGame = indexOfLastGame - ITEMS_PER_PAGE;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Filter Component */}
        <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
          <FilterSortComponent
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            gameGenres={gameGenres}
            gameEngines={gameEngines}
          />
        </div>

        {/* Game List */}
        <div className="w-full lg:w-3/4">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Game Collection</h1>
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-gray-700 font-medium">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Most Downloaded">Most Downloaded</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="Success Rate">Success Rate</option>
              </select>
            </div>
          </div>

          {/* Game Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentGames.map((game) => (
              <div
                key={game._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/games/${game._id}`}>
                  <div className="cursor-pointer">
                    <img
                      src={game.images[0] || '/placeholder-image.png'}
                      alt={game.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {game.title}
                        {game.newRelease && (
                          <span className="ml-2 text-sm text-red-500">(New!)</span>
                        )}
                      </h2>
                      <p className="text-sm text-gray-600 mb-2">
                        By{' '}
                        <span className="font-medium text-gray-700">
                          {game.uploadedBy.username}
                        </span>
                      </p>
                      <div className="flex items-center text-yellow-400 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(game.averageRating)
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.985a1 1 0 00.95.69h4.211c.969 0 1.371 1.24.588 1.81l-3.405 2.474a1 1 0 00-.364 1.118l1.286 3.985c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.405 2.474c-.785.57-1.84-.197-1.54-1.118l1.286-3.985a1 1 0 00-.364-1.118L2.573 9.412c-.783-.57-.38-1.81.588-1.81h4.211a1 1 0 00.95-.69l1.286-3.985z" />
                          </svg>
                        ))}
                        <span className="text-gray-600 text-sm ml-2">
                          ({game.ratingCount} reviews)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p>Views: {game.viewCount}</p>
                        <p>Downloads: {game.downloadCount}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCollection;
