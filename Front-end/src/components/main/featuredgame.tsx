// src/components/main/FeaturedGame.tsx

import React from 'react';

const FeaturedGame: React.FC = () => {
  const game = {
    title: 'My RPG Adventure',
    description: 'A thrilling RPG with a unique storyline and challenging quests. Players can explore new worlds, encounter various characters, and experience immersive gameplay.',
    tags: ['#beta', '#wip'],
    categories: ['RPG', 'Adventure'],
    image: 'https://i.kickstarter.com/assets/031/130/376/5ed52c0f2b96af5ebdad6a9cd3dddc99_original.jpg?anim=false&fit=cover&gravity=auto&height=873&origin=ugc&q=92&width=1552&sig=CDWmPhsmYzRUZhcPF5C20m8Cc9puKW9p9ky4pzvFeyM%3D', // Replace with actual image path
  };

  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Featured Game of the Week</h3>
      <div className="md:flex">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full md:w-1/2 h-64 object-cover rounded mb-4 md:mb-0 md:mr-6" 
        />
        <div className="md:flex-1">
          <h4 className="text-xl font-bold mb-2">{game.title}</h4>
          <p className="text-gray-700 mb-4">{game.description}</p>
          <p className="text-sm mb-2">
            <strong>Tags:</strong> {game.tags.map(tag => <span key={tag} className="text-secondary mr-2">{tag}</span>)}
          </p>
          <p className="text-sm mb-4"><strong>Categories:</strong> {game.categories.join(', ')}</p>
          <button className="bg-secondary text-white px-4 py-2 rounded">Play Now</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGame;
