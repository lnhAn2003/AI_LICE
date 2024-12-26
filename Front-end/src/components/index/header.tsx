import React, { useState, useEffect, useRef } from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import NavBar from './navbar';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon, FaUserCircle, FaBell } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { NotificationData } from '../../types/notification';

const Header = () => {
  const { user, token } = useAuth();
  const { theme, setTheme } = useTheme();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // State for unread count
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  // Fetch notifications and update unread count
  const fetchNotifications = async () => {
    if (user && token) {
      try {
        const userId = user._id;
        const res = await axiosInstance.get<NotificationData[]>(`/notification/${userId}`);
        const data = res.data;

        // Sort by createdAt descending
        data.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

        setNotifications(data);
        setUnreadCount(data.filter((notif) => !notif.read).length); // Update unread count
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [user, token]);

  const toggleNotificationDropdown = () => {
    setShowNotifDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    };

    if (showNotifDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNotifDropdown]);

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Centered NavBar for Desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavBar />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <FaSun className="text-2xl text-yellow-400" />
            ) : (
              <FaMoon className="text-2xl text-gray-700" />
            )}
          </button>

          {/* Notification Icon */}
          {token && user && (
            <div className="relative flex items-center">
              <button
                onClick={toggleNotificationDropdown}
                className="relative focus:outline-none flex items-center"
                aria-label="Notifications"
              >
                <FaBell className="text-2xl text-gray-700 dark:text-gray-100 hover:text-blue-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {showNotifDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50"
                >
                  <div className="p-2 max-h-96 overflow-y-auto">
                    {loadingNotifs && <p className="text-sm p-2">Loading...</p>}

                    {!loadingNotifs && notifications.length === 0 && (
                      <p className="text-sm p-2 text-gray-700 dark:text-gray-300">
                        No recent notifications
                      </p>
                    )}

                    {notifications.map((notif) => (
                      <div
                        key={notif._id}
                        className={`p-2 mb-2 rounded ${
                          notif.read
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'bg-gray-50 dark:bg-gray-800'
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold mb-1">
                          {notif.message.length > 60
                            ? notif.message.slice(0, 60) + '...'
                            : notif.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* View All link */}
                  <div className="border-t border-gray-200 dark:border-gray-600 p-2 text-center">
                    <Link href="/notification">
                      <span className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                        View All Notifications
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Avatar */}
          {token && user ? (
            <Link href="/auth/profile">
              <img
                src={
                  user.profile?.avatarUrl ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s'
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500"
              />
            </Link>
          ) : (
            <Link href="/auth/login">
              <FaUserCircle className="text-2xl cursor-pointer hover:text-blue-500" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
