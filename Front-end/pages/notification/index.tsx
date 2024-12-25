// pages/notification/index.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/utils/axiosInstance';
import { useAuth } from '../../src/hooks/useAuth';
import { NotificationData } from '../../src/types/notification';

const NotificationsPage: React.FC = () => {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !user) return;

    const fetchNotifications = async () => {
      try {
        const userId = user._id; 
        const res = await axiosInstance.get<NotificationData[]>(`/notification/${userId}`);
        setNotifications(res.data);
      } catch (err: any) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user, token]);

  const handleMarkAsRead = async (notifId: string) => {
    try {
      await axiosInstance.patch(`/notification/${notifId}`, { read: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notifId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Error marking as read:', err);
      setError('Could not mark notification as read.');
    }
  };

  const handleDelete = async (notifId: string) => {
    try {
      await axiosInstance.delete(`/notification/${notifId}`);
      setNotifications((prev) => prev.filter((n) => n._id !== notifId));
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError('Could not delete notification.');
    }
  };

  if (!token || !user) {
    return <p className="text-center mt-8">Please log in to view notifications.</p>;
  }

  if (loading) {
    return <p className="text-center mt-8">Loading notifications...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100 text-gray-800">
        All Notifications
      </h1>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {notifications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No notifications found.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded shadow 
                ${n.read ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
              `}
            >
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {n.message}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Type:</strong> {n.type}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Created:</strong> {new Date(n.createdAt).toLocaleString()}
              </p>
              {n.details && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Details:</strong> {n.details}
                </p>
              )}
              <div className="mt-2 flex items-center space-x-4">
                {!n.read && (
                  <button
                    onClick={() => handleMarkAsRead(n._id)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
