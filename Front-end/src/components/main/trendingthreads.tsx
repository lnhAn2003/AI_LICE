import React from 'react';

const TrendingThreads: React.FC = () => {
  const threads = [
    { title: 'How to debug in Unity', author: 'devDude', replies: 45, lastActivity: '1h ago' },
    { title: 'Best RPG storyline ideas', author: 'storyCrafter', replies: 37, lastActivity: '3h ago' },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Trending Threads</h3>
      <div className="grid grid-cols-2 gap-4">
        {threads.map((thread, index) => (
          <div key={index} className="border rounded-md p-4">
            <h4 className="text-lg font-bold">{thread.title}</h4>
            <p className="text-sm">Author: {thread.author}</p>
            <p className="text-sm">Replies: {thread.replies}</p>
            <p className="text-sm">Last Activity: {thread.lastActivity}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-link">View All Threads</a>
    </section>
  );
};

export default TrendingThreads;
