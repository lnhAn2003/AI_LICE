// src/components/index/NavBar.tsx

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaHome, FaComments, FaGamepad, FaRobot, FaBook } from 'react-icons/fa';
import SearchBar from './searchbar';

interface NavBarProps {
  isMobile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isMobile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: <FaHome />},
    { href: '/threads/collection', label: 'Threads', icon: <FaComments />},
    { href: '/games/collection', label: 'Games', icon: <FaGamepad />},
    { href: '/courses/collection', label: 'Courses', icon: <FaBook />},
    { href: '/ai/assistant', label: 'AIssistance', icon: <FaRobot />},
  ];

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Toggle Button */}
          <button
            className="text-gray-800 dark:text-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <AiOutlineMenu className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Dropdown NavBar */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-0 w-full bg-white dark:bg-gray-800 p-4 shadow-lg z-50">
              <div className="flex flex-col items-center space-y-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 font-medium cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </div>
                  </Link>
                ))}
                {/* Search Bar */}
                <div className="w-full mt-4">
                  <SearchBar />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 font-medium cursor-pointer">
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavBar;
