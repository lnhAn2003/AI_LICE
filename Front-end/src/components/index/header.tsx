// src/components/index/header.tsx

import React from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import NavBar from './navbar';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'next-themes'; // Import useTheme
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from react-icons

const Header = () => {
  const { user, token } = useAuth();
  const { theme, setTheme } = useTheme(); // Use the useTheme hook

  return (
    <header className="bg-primary text-offWhite shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Centered NavBar for PC */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavBar />
        </div>

        {/* Search Bar for PC */}
        <div className="hidden md:flex justify-end">
          <SearchBar />
        </div>

        {/* User Avatar and Theme Toggle */}
        <div className="flex items-center ml-4 space-x-4">

          {/* User Avatar */}
          {token && user ? (
            <Link href="/profile">
              <img
                src={
                  user.profile?.avatarUrl ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s'
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-500"
              />
            </Link>
          ) : (
            <Link href="/login">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s"
                alt="Default Avatar"
                className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-500"
              />
            </Link>
          )}

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
