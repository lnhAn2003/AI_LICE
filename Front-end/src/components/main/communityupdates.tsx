// src/components/main/CommunityUpdates.tsx

import React from 'react';

const CommunityUpdates: React.FC = () => {
  const news = [
    { date: 'Nov 10, 2024', time: '12:30 PM', title: 'New AI tools for game devs available' },
    { date: 'Nov 9, 2024', time: '09:45 AM', title: 'Game dev tips to improve your workflow' },
    { date: 'Nov 8, 2024', time: '03:15 PM', title: 'Platform updates and new features' },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-2xl font-semibold mb-4">Community Updates</h3>
      <ul className="space-y-3">
        {news.map((item, index) => (
          <li key={index} className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {item.date} | {item.time}
            </span>{' '}
            - {item.title}
          </li>
        ))}
      </ul>
      <a href="#" className="text-blue-500 hover:underline mt-4 inline-block font-semibold">
        Read More &rarr;
      </a>
    </section>
  );
};

export default CommunityUpdates;