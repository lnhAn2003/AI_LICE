import React from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import NavBar from './navbar';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, token } = useAuth();

  return (
    <header className="bg-primary text-offWhite shadow-lg">
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

        {/* User Avatar */}
        <div className="flex items-center ml-4">
          {token && user ? (
            <Link href="/profile">
              <img
                src={user.profile?.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s'} // Access avatarUrl from profile
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
