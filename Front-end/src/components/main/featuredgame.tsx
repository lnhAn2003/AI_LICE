// src/components/main/FeaturedGame.tsx

import React from 'react';

const FeaturedGame: React.FC = () => {
  const game = {
    title: 'My RPG Adventure',
    description:
      'A thrilling RPG with a unique storyline and challenging quests. Players can explore new worlds, encounter various characters, and experience immersive gameplay.',
    tags: ['#beta', '#wip'],
    categories: ['RPG', 'Adventure'],
    image:
      'https://i.pinimg.com/736x/93/3a/34/933a34a1c4855a6e8e86d3f69ee1de98.jpg',
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-6">Featured Game of the Week</h3>
      <div className="md:flex">
        <img
          src={game.image}
          alt={game.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="md:flex-1">
          <h4 className="text-2xl font-bold mb-2">{game.title}</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{game.description}</p>
          <div className="mb-4">
            <strong>Tags:</strong>{' '}
            {game.tags.map((tag) => (
              <span key={tag} className="text-blue-500 mr-2">
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <strong>Categories:</strong>{' '}
            {game.categories.map((category, index) => (
              <span key={index} className="text-green-500 mr-2">
                {category}
              </span>
            ))}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-full font-semibold">
            Play Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGame;