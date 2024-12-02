// pages/games/collection.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';

//import component
import FilterSortComponent from '../../src/components/game/filtersort';
import Pagination from '../../src/components/game/pagination';

interface Category {
    _id: string;
    name: string;
    key: string;
}

interface UploadedBy {
    username: string;
    _id: string;
}

interface SuccessVotes {
    likes: number;
    dislikes: number;
    percentage: number;
    userVotes: any[];
}

interface Changelog {
    date: string;
    description: string;
    _id: string;
}

interface Rating {
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    _id: string;
}

interface Game {
    description: any;
    ratingCount: number;
    successVotes: SuccessVotes;
    categories: Category[];
    platforms: string[];
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
    uploadedBy: UploadedBy;
    fileUrl: string;
    externalLinks: any[];
    createdAt: string;
    updatedAt: string;
    favorites: any[];
    commentId: any[];
    version: string;
    changelog: Changelog[];
    ratings: Rating[];
    __v: number;
}

const ITEMS_PER_PAGE = 6;

const GameCollection: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [gameGenres, setGameGenres] = useState<Category[]>([]);
    const [gameEngines, setGameEngines] = useState<Category[]>([]);
    const [gamePlatforms, setGamePlatforms] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>('Most Recent');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchGamesAndCategories = async () => {
            try {
                const gameResponse = await axiosInstance.get('/gameshareds');
                setGames(gameResponse.data);
                setFilteredGames(gameResponse.data);

                // Extract unique flatforms from games
                const platformSet = new Set<string>();
                gameResponse.data.forEach((game: Game) => {
                    game.platforms.forEach((platform) => platformSet.add(platform));
                });
                setGamePlatforms(Array.from(platformSet));

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
                    game.title.toLowerCase().includes(keyword)
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

        // Filter by selected platform
        if (filters.platforms && filters.platforms.length > 0) {
            filtered = filtered.filter((game) =>
                filters.platforms.every((selectedPlatform: string) =>
                    Array.isArray(game.platforms) &&
                    game.platforms.some((platforms) => platforms === selectedPlatform)
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
                startDate = new Date(now.getTime() - 7, 24, 60, 60, 1000);
            } else if (filters.releaseDate === 'Last 30 Days') {
                startDate = new Date(now.getTime() - 30, 24, 60, 60, 1000);
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
        <div className="min-h-screen dark:bg-gray-900 bg-gray-100 px-4 py-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                {/* Filter Component */}
                <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                    <FilterSortComponent
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                        gameGenres={gameGenres}
                        gameEngines={gameEngines}
                        gamePlatform={gamePlatforms}
                    />
                </div>

                {/* Game List */}
                <div className="w-full lg:w-3/4">
                    {/* Sort Options */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Game Collection</h1>
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
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-100 border border-gray-400 dark:border-transparent"
                            >
                                <Link href={`/games/details/${game._id}`}>
                                    <div className="cursor-pointer">
                                        <div className="relative">
                                            <img
                                                src={game.images[0] || '/placeholder-image.png'}
                                                alt={game.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            {game.newRelease && (
                                                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                                    New
                                                </span>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60"></div>
                                            <h2 className="absolute bottom-2 left-2 text-white text-xl font-bold">
                                                {game.title}
                                            </h2>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                By{' '}
                                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                                    {game.uploadedBy.username}
                                                </span>
                                            </p>
                                            <div className="flex items-center mb-4">
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-5 h-5 ${i < Math.floor(game.averageRating)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-400 dark:text-gray-600'
                                                                }`}
                                                            fill="currentColor"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path d="M259.3 17.8L194 150.2 47.9 171.5C27.7 174.1 21.9 197.5 35.7 209.1L129.1 300.6 106.8 454.3C104.2 472.1 120.5 485.4 136.1 479.6L288 439.6 439.9 479.6C455.5 485.4 471.8 472.1 469.2 454.3L446.9 300.6 540.3 209.1C554.1 197.5 548.3 174.1 528.1 171.5L382 150.2 316.7 17.8C308.3 0.7 267.7 0.7 259.3 17.8Z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                                                    ({game.ratingCount} reviews)
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                <p className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 576 512"
                                                    >
                                                        <path d="M572.52 241.4C518.9 135.6 407.5 64 288 64S57.06 135.6 3.48 241.4a48.07 48.07 0 000 29.2C57.06 376.4 168.5 448 288 448s230.9-71.6 284.5-177.4a48.07 48.07 0 000-29.2zM288 400c-97.05 0-186.2-56.2-234.3-144C101.8 168.2 190.9 112 288 112s186.2 56.2 234.3 144C474.2 343.8 385.1 400 288 400zM288 176a80 80 0 1080 80 80.09 80.09 0 00-80-80z" />
                                                    </svg>
                                                    {game.viewCount}
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M7 4a1 1 0 011-1h4a1 1 0 011 1v6h2.586a1 1 0 01.707 1.707l-4.586 4.586a1 1 0 01-1.414 0l-4.586-4.586A1 1 0 015.414 10H8V4z" />
                                                        <path d="M4 18a1 1 0 100-2h12a1 1 0 100 2H4z" />
                                                    </svg>
                                                    {game.downloadCount}
                                                </p>
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