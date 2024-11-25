// src/components/main/CommunityHighlights.tsx

import React from 'react';

const CommunityHighlights: React.FC = () => {
  const topRatedGames = [
    {
      title: 'Mystery Dungeon',
      author: 'dev7',
      rating: 4.8,
      likes: 150,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qm7Bk7_UVtLFJ5ysjZAEcvIw5TpKzPQXHA&s',
    },
    {
      title: 'Endless Racer',
      author: 'dev8',
      rating: 4.7,
      likes: 130,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGO11w5mAsjkrQHBnmFDmV1npgo5fnl_2wbw&s',
    },
    {
      title: 'Sky Warriors',
      author: 'dev9',
      rating: 4.9,
      likes: 170,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy0HSZzhTTxUqsYKuNUJ1vuk0MFS_Ezdm0GQ&s',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-6">Community Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRatedGames.map((game, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm"
          >
            <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-1">{game.title}</h4>
              <p className="text-sm mb-1">Author: {game.author}</p>
              <p className="text-sm mb-1">Rating: {game.rating}</p>
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
      <a href="#" className="text-blue-500 hover:underline mt-6 inline-block font-semibold">
        See All Top Rated Games &rarr;
      </a>
    </section>
  );
};

export default CommunityHighlights;