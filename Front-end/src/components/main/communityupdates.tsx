import React from 'react';

const CommunityUpdates: React.FC = () => {
  const news = [
    { date: 'Nov 10, 2024', time: '12:30 PM', title: 'New AI tools for game devs available' },
    { date: 'Nov 9, 2024', time: '09:45 AM', title: 'Game dev tips to improve your workflow' },
    { date: 'Nov 8, 2024', time: '03:15 PM', title: 'Platform updates and new features' },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Community Updates</h3>
      <ul>
        {news.map((item, index) => (
          <li key={index} className="text-sm mb-2">
            <span className="font-bold">{item.date} | {item.time}</span> - {item.title}
          </li>
        ))}
      </ul>
      <a href="#" className="text-link">Read More</a>
    </section>
  );
};

export default CommunityUpdates;
