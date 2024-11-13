import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SearchBar from './searchbar';

interface NavBarProps {
  isMobile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isMobile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/threads', label: 'Threads' },
    { href: '/games/collection', label: 'Games' },
    { href: '/ai-assistance', label: 'AIssistance' },
    { href: '/courses', label: 'Courses' }
  ];

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Toggle Button */}
          <button
            className="text-offWhite focus:outline-none"
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
            <div className="absolute top-16 right-0 w-full bg-prussianBlue p-4 rounded shadow-lg">
              <div className="flex flex-col items-center space-y-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="block text-offWhite hover:text-waveHighlight font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </div>
                  </Link>
                ))}
                {/* Search Bar at the End of the Mobile Dropdown */}
                <div className="w-full mt-4">
                  <SearchBar />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <nav className="flex space-x-12">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="text-white hover:text-orange-500 font-medium cursor-pointer">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavBar;
