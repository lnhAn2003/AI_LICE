// src/components/main/TrendingThreads.tsx

import React from 'react';

const TrendingThreads: React.FC = () => {
  const threads = [
    { title: 'How to debug in Unity', author: 'devDude', replies: 45, lastActivity: '1h ago' },
    { title: 'Best RPG storyline ideas', author: 'storyCrafter', replies: 37, lastActivity: '3h ago' },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-6">Trending Threads</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left">Thread</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Replies</th>
            <th className="px-4 py-2 text-left">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {threads.map((thread, index) => (
            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">{thread.title}</td>
              <td className="px-4 py-4">{thread.author}</td>
              <td className="px-4 py-4">{thread.replies}</td>
              <td className="px-4 py-4">{thread.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#" className="text-blue-500 hover:underline mt-6 inline-block font-semibold">
        View All Threads &rarr;
      </a>
    </section>
  );
};

export default TrendingThreads;