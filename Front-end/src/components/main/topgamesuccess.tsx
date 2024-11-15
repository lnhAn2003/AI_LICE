// src/components/main/TopGameSuccess.tsx

import React from 'react';

const TopGameSuccess: React.FC = () => {
  const topGames = [
    {
      title: 'My RPG Adventure',
      author: 'gamer123',
      successRate: 95,
      likes: 200,
      dislikes: 10,
      description: 'Explore new worlds and embark on thrilling quests.',
      image: 'https://i.kickstarter.com/assets/031/130/376/5ed52c0f2b96af5ebdad6a9cd3dddc99_original.jpg?anim=false&fit=cover&gravity=auto&height=873&origin=ugc&q=92&width=1552&sig=CDWmPhsmYzRUZhcPF5C20m8Cc9puKW9p9ky4pzvFeyM%3D',
    },
    {
      title: 'Space Odyssey',
      author: 'astro_dev',
      successRate: 88,
      likes: 180,
      dislikes: 25,
      description: 'Journey through galaxies in this sci-fi adventure.',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Space_Odyssey_cover.jpg',
    },
  ];

  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Top Game Success Rankings</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Game</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Success Rate</th>
            <th className="px-4 py-2 text-left">Likes</th>
            <th className="px-4 py-2 text-left">Dislikes</th>
          </tr>
        </thead>
        <tbody>
          {topGames.map((game, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 flex items-center">
                <img src={game.image} alt={game.title} className="w-12 h-12 object-cover rounded mr-2" />
                <div>
                  <p className="font-bold">{game.title}</p>
                  <p className="text-sm text-gray-600">{game.description}</p>
                </div>
              </td>
              <td className="px-4 py-2">{game.author}</td>
              <td className="px-4 py-2">{game.successRate}%</td>
              <td className="px-4 py-2">{game.likes}</td>
              <td className="px-4 py-2">{game.dislikes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#" className="text-secondary hover:underline mt-4 inline-block">See Full Ranking</a>
    </section>
  );
};

export default TopGameSuccess;
