// src/components/main/LatestSharedGames.tsx

import React from 'react';

const LatestSharedGames: React.FC = () => {
  const sharedGames = [
    {
      title: 'Mystery Quest',
      author: 'dev1',
      tags: '#alpha',
      likes: 45,
      image: 'https://m.media-amazon.com/images/I/61vcfnk5JlL.jpg',
    },
    {
      title: 'Space Shooter',
      author: 'dev2',
      tags: '#wip',
      likes: 38,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4khpCuQekNlSZUzxF8qSp8-buiR4TPHxLsA&s',
    },
    {
      title: 'Tower Defense',
      author: 'dev3',
      tags: '#beta',
      likes: 29,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFoIQkZHJBrGP21aA7ef7PAysiap8nZzhlw&s',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-6">Latest Shared Games</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sharedGames.map((game, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm"
          >
            <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-2">{game.title}</h4>
              <p className="text-sm mb-1">Author: {game.author}</p>
              <p className="text-sm mb-1">Tags: {game.tags}</p>
              <p className="text-sm flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z" />
                </svg>
                {game.likes}
              </p>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-blue-500 hover:underline mt-6 inline-block">
        View All Shared Games
      </a>
    </section>
  );
};

export default LatestSharedGames;