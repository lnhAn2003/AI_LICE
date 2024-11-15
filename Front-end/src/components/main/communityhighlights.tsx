// src/components/main/CommunityHighlights.tsx

import React from 'react';

const CommunityHighlights: React.FC = () => {
  const topRatedGames = [
    {
      title: 'Mystery Dungeon',
      author: 'dev7',
      rating: 4.8,
      likes: 150,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qm7Bk7_UVtLFJ5ysjZAEcvIw5TpKzPQXHA&s',
    },
    {
      title: 'Endless Racer',
      author: 'dev8',
      rating: 4.7,
      likes: 130,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGO11w5mAsjkrQHBnmFDmV1npgo5fnl_2wbw&s',
    },
    {
      title: 'Sky Warriors',
      author: 'dev9',
      rating: 4.9,
      likes: 170,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy0HSZzhTTxUqsYKuNUJ1vuk0MFS_Ezdm0GQ&s',
    },
  ];

  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Community Highlights (Top Rated Games)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topRatedGames.map((game, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-bold">{game.title}</h4>
              <p className="text-sm">Author: {game.author}</p>
              <p className="text-sm">Rating: {game.rating}</p>
              <p className="text-sm">Likes: {game.likes}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-secondary hover:underline mt-4 inline-block">See All Top Rated Games</a>
    </section>
  );
};

export default CommunityHighlights;
