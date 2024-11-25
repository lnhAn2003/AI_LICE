// src/components/index/Footer.tsx

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/about" className="hover:text-blue-500">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-blue-500">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} AI_LICE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
