// src/components/index/Header.tsx

import React from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import NavBar from './navbar';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'next-themes'; 
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa'; 

const Header = () => {
  const { user, token } = useAuth();
  const { theme, setTheme } = useTheme();

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
