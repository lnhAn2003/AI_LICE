import React from 'react';

const LatestSharedGames: React.FC = () => {
  const sharedGames = [
    { title: 'Mystery Quest', author: 'dev1', tags: '#alpha', likes: 45 },
    { title: 'Space Shooter', author: 'dev2', tags: '#wip', likes: 38 },
    { title: 'Tower Defense', author: 'dev3', tags: '#beta', likes: 29 },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Latest Shared Games</h3>
      <div className="grid grid-cols-3 gap-4">
        {sharedGames.map((game, index) => (
          <div key={index} className="border rounded-md p-4">
            <h4 className="text-lg font-bold">{game.title}</h4>
            <p className="text-sm">Author: {game.author}</p>
            <p className="text-sm">Tags: {game.tags}</p>
            <p className="text-sm">Likes: {game.likes}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-link">View All Shared Games</a>
    </section>
  );
};

export default LatestSharedGames;
