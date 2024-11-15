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
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Latest Shared Games</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sharedGames.map((game, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-bold">{game.title}</h4>
              <p className="text-sm">Author: {game.author}</p>
              <p className="text-sm">Tags: {game.tags}</p>
              <p className="text-sm">Likes: {game.likes}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-secondary hover:underline mt-4 inline-block">View All Shared Games</a>
    </section>
  );
};

export default LatestSharedGames;
