// src/components/index/Logo.tsx

import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-2xl font-extrabold text-blue-600 dark:text-blue-400">
      <FaGamepad className="mr-2" />
      AI_LICE
    </Link>
  );
};

export default Logo;
