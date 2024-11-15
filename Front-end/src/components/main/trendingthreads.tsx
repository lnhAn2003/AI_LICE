// src/components/main/TrendingThreads.tsx

import React from 'react';

const TrendingThreads: React.FC = () => {
  const threads = [
    { title: 'How to debug in Unity', author: 'devDude', replies: 45, lastActivity: '1h ago' },
    { title: 'Best RPG storyline ideas', author: 'storyCrafter', replies: 37, lastActivity: '3h ago' },
  ];

  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Trending Threads</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Thread</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Replies</th>
            <th className="px-4 py-2 text-left">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {threads.map((thread, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{thread.title}</td>
              <td className="px-4 py-2">{thread.author}</td>
              <td className="px-4 py-2">{thread.replies}</td>
              <td className="px-4 py-2">{thread.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#" className="text-secondary hover:underline mt-4 inline-block">View All Threads</a>
    </section>
  );
};

export default TrendingThreads;
