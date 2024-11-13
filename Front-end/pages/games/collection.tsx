import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FilterSortComponent from '../../src/components/game/filtersort';

interface Category {
  _id: string;
  name: string;
}

interface Game {
  categories: Category[]; // Updated to array of Category objects
  _id: string;
  title: string;
  images: string[];
  averageRating: number;
  viewCount: number;
  newRelease: boolean;
  tags: string[];
  downloads: number;
}

const GameCollection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>('Most Recent');

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
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGamesAndCategories();
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = games;

    // Filter by selected category IDs
    if (filters.category.length > 0) {
      filtered = filtered.filter((game) =>
        filters.category.every((selectedCategoryId: string) =>
          Array.isArray(game.categories) &&
          game.categories.some((category) => category._id === selectedCategoryId)
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

    // Filter by download range
    if (filters.downloads) {
      if (filters.downloads === '1000+') {
        filtered = filtered.filter((game) => game.downloads >= 1000);
      } else if (filters.downloads === '500-999') {
        filtered = filtered.filter((game) => game.downloads >= 500 && game.downloads < 1000);
      } else if (filters.downloads === '<500') {
        filtered = filtered.filter((game) => game.downloads < 500);
      }
    }

    setFilteredGames(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    let sortedGames = [...filteredGames];

    if (sortBy === 'Most Viewed') {
      sortedGames.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'Highest Rated') {
      sortedGames.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortBy === 'New Releases') {
      sortedGames.sort((a, b) => Number(b.newRelease) - Number(a.newRelease));
    }

    setSortBy(sortBy);
    setFilteredGames(sortedGames);
  };

  return (
    <div className="min-h-screen flex flex-col bg-backgroundMain px-6 py-8 max-w-7xl mx-auto">
      <div className="flex">
        {/* Filter and Sort Component on the left */}
        <div className="w-1/4 pr-4">
          <FilterSortComponent
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            categories={categories} 
          />
        </div>

        {/* Game List on the right */}
        <div className="w-3/4">
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
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
                <p className="text-sm text-gray-600">Rating: ★{game.averageRating.toFixed(1)} / 5</p>
                <p className="text-sm text-gray-600">Views: {game.viewCount}</p>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default GameCollection;
