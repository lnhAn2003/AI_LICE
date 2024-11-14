import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        const gameResponse = await fetch('http://localhost:5000/gameshareds');
        if (!gameResponse.ok) {
          throw new Error(`Error: ${gameResponse.status} - ${gameResponse.statusText}`);
        }
        const gameData = await gameResponse.json();
        setGames(gameData);
        setFilteredGames(gameData);

        const categoryResponse = await fetch('http://localhost:5000/categories');
        if (!categoryResponse.ok) {
          throw new Error(`Error: ${categoryResponse.status} - ${categoryResponse.statusText}`);
        }
        const categoryData = await categoryResponse.json();

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
        filtered = filtered.filter((game) => game.downloadCount >= 500 && game.downloadCount < 1000);
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
      sortedGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
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
    <div className="min-h-screen flex flex-col bg-backgroundMain px-6 py-8 max-w-7xl mx-auto">
      <div className="flex">
        {/* Filter and Sort Component on the left */}
        <div className="w-1/4 pr-4">
          <FilterSortComponent
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            gameGenres={gameGenres}
            gameEngines={gameEngines}
          />
        </div>

        {/* Game List on the right */}
        <div className="w-3/4">
          {/* Sort Options */}
          <div className="flex justify-end mb-4">
            <label htmlFor="sort-by" className="mr-2">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="Most Recent">Most Recent</option>
              <option value="Most Downloaded">Most Downloaded</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Success Rate">Success Rate</option>
            </select>
          </div>

          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGames.map((game) => (
              <div key={game._id} className="border border-gray-300 rounded-lg shadow-lg bg-white p-4">
                <Link href={`/games/${game._id}`} passHref>
                  <img
                    src={game.images[0] || 'https://via.placeholder.com/150'}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {game.title} {game.newRelease && <span className="text-sm text-red-500">(New!)</span>}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600">Categories: {game.categories.map(cat => cat.name).join(', ')}</p>
                <p className="text-sm text-gray-600">Tags: {game.tags.join(', ')}</p>
                <p className="text-sm text-gray-600">Uploaded By: {game.uploadedBy.username}</p>
                <p className="text-sm text-gray-600">Rating: ★{game.averageRating.toFixed(1)} / 5</p>
                <p className="text-sm text-gray-600">Downloads: {game.downloadCount}</p>
              </div>
            ))}
          </main>

          {/* Pagination Component */}
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
