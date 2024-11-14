import React from 'react';

const UserNotifications: React.FC = () => {
  const notifications = [
    { message: 'New comment on your thread...', time: '5 min ago' },
    { message: 'AI Interaction: "How to create a shader in Unity?"', time: '2 hours ago' },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">User Notifications & AI Interactions</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="text-sm mb-2">{notification.message} ({notification.time})</li>
        ))}
      </ul>
      <a href="#" className="text-link">Read More</a>
    </section>
  );
};

export default UserNotifications;
