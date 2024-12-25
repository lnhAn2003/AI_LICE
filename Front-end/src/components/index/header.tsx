// src/components/index/Header.tsx
import React, { useState } from 'react';
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
  
  // Notification dropdown state
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const toggleNotificationDropdown = async () => {
    setShowNotifDropdown(!showNotifDropdown);

    // If we open the dropdown and haven't loaded notifications, fetch the newest 5
    if (!showNotifDropdown && user && token && notifications.length === 0) {
      setLoadingNotifs(true);
      try {
        const userId = user._id;
        let res = await axiosInstance.get<NotificationData[]>(`/notification/${userId}`);
        let data = res.data;

        // Sort by createdAt descending
        data.sort((a, b) => (new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()));
        
        // Only keep the 5 newest
        data = data.slice(0, 5);

        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoadingNotifs(false);
      }
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Centered NavBar for Desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavBar />
        </div>

        {/* Search Bar and Icons for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />

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

          {/* Notification Icon + Dropdown */}
          {token && user && (
            <div className="relative">
              <button
                onClick={toggleNotificationDropdown}
                className="relative focus:outline-none"
                aria-label="Notifications"
              >
                <FaBell className="text-2xl text-gray-700 dark:text-gray-100 hover:text-blue-500" />
              </button>

              {/* Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50">
                  <div className="p-2 max-h-96 overflow-y-auto">
                    {loadingNotifs && <p className="text-sm p-2">Loading...</p>}

                    {!loadingNotifs && notifications.length === 0 && (
                      <p className="text-sm p-2 text-gray-700 dark:text-gray-300">
                        No recent notifications
                      </p>
                    )}

                    {/* Show only 5 newest notifications - no "Mark read" or "Delete" */}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <NavBar isMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
