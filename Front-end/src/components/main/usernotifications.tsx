// src/components/main/UserNotifications.tsx

import React from 'react';

const UserNotifications: React.FC = () => {
  const notifications = [
    { message: 'New comment on your thread...', time: '5 min ago' },
    { message: 'AI Interaction: "How to create a shader in Unity?"', time: '2 hours ago' },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-2xl font-semibold mb-4">User Notifications & AI Interactions</h3>
      <ul className="space-y-3">
        {notifications.map((notification, index) => (
          <li key={index} className="text-sm">
            {notification.message}{' '}
            <span className="text-gray-500 dark:text-gray-400">({notification.time})</span>
          </li>
        ))}
      </ul>
      <a href="#" className="text-blue-500 hover:underline mt-4 inline-block font-semibold">
        View All Notifications &rarr;
      </a>
    </section>
  );
};

export default UserNotifications;