// pages/not-authorized.tsx
import Link from 'next/link';

const NotAuthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Not Authorized</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">You do not have permission to access this page.</p>
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-6 inline-block">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
