import React from 'react';

const TopGameSuccess: React.FC = () => {
  const topGames = [
    { title: 'My RPG Adventure', author: 'gamer123', successRate: 95, likes: 200, dislikes: 10, description: 'Explore new worlds and embark on thrilling quests.' },
    { title: 'Space Odyssey', author: 'astro_dev', successRate: 88, likes: 180, dislikes: 25, description: 'Journey through galaxies in this sci-fi adventure.' },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Top Game Success Rankings</h3>
      {topGames.map((game, index) => (
        <div key={index} className="border-b py-2">
          <h4 className="text-lg font-bold">{index + 1}. {game.title}</h4>
          <p className="text-sm">Author: {game.author}</p>
          <p className="text-sm">Success Rate: {game.successRate}%</p>
          <p className="text-sm">Likes: {game.likes} | Dislikes: {game.dislikes}</p>
          <p className="text-sm mb-2">{game.description}</p>
        </div>
      ))}
      <a href="#" className="text-link">See Full Ranking</a>
    </section>
  );
};

export default TopGameSuccess;
