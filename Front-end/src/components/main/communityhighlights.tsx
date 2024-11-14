import React from 'react';

const CommunityHighlights: React.FC = () => {
  const topRatedGames = [
    { title: 'Mystery Dungeon', author: 'dev7', rating: 4.8, likes: 150 },
    { title: 'Endless Racer', author: 'dev8', rating: 4.7, likes: 130 },
    { title: 'Sky Warriors', author: 'dev9', rating: 4.9, likes: 170 },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Community Highlights (Top Rated Games)</h3>
      <div className="grid grid-cols-3 gap-4">
        {topRatedGames.map((game, index) => (
          <div key={index} className="border rounded-md p-4">
            <h4 className="text-lg font-bold">{game.title}</h4>
            <p className="text-sm">Author: {game.author}</p>
            <p className="text-sm">Rating: {game.rating}</p>
            <p className="text-sm">Likes: {game.likes}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-link">See All Top Rated Games</a>
    </section>
  );
};

export default CommunityHighlights;
