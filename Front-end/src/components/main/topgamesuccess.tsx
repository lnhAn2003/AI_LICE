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
      image:
        'https://i.pinimg.com/736x/93/3a/34/933a34a1c4855a6e8e86d3f69ee1de98.jpg',
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
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-6">Top Game Success Rankings</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
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
            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">{index + 1}</td>
              <td className="px-4 py-4 flex items-center">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-12 h-12 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-bold">{game.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{game.description}</p>
                </div>
              </td>
              <td className="px-4 py-4">{game.author}</td>
              <td className="px-4 py-4">{game.successRate}%</td>
              <td className="px-4 py-4">{game.likes}</td>
              <td className="px-4 py-4">{game.dislikes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#" className="text-blue-500 hover:underline mt-6 inline-block font-semibold">
        See Full Ranking &rarr;
      </a>
    </section>
  );
};

export default TopGameSuccess;

