import React from 'react';
import { GameShared } from '../../types/studio';

interface GamesSectionProps {
  games: GameShared[];
}

const GamesSection: React.FC<GamesSectionProps> = ({ games }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Shared Games</h2>
      {games.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No shared games found.</p>
      ) : (
        <ul className="space-y-6">
          {games.map((game) => (
            <li key={game._id} className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{game.description}</p>
              <div className="flex space-x-2 mb-2">
                {game.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Downloads: {game.downloadCount} | Views: {game.viewCount}
              </p>
              {game.images.length > 0 && (
                <div className="flex space-x-2 mb-2">
                  {game.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={game.title}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-700"
                    />
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Rating: {game.averageRating.toFixed(1)}
              </p>
              {game.fileUrl && (
                <a
                  href={game.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Download Game
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesSection;
