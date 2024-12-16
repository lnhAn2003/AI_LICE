// pages/admin/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Run the check only if we have loaded the user data.
    if (user && token) {
      if (user.role !== 'Admin') {
        router.push('/not-authorized');
      }
    }
    // If user is still null, we do nothing yet, just wait.
  }, [user, token, router]);

  // If user data isn't loaded yet, show a loading message
  if (!user || !token) {
    return <p>Loading...</p>;
  }

  // Now user and token are present.
  // If user is not Admin, at this point we would have redirected already.
  // So we can safely assume user.role === 'Admin'.
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8">Admin Dashboard</h1>
      <p className="text-gray-700 dark:text-gray-300">Welcome, {user.username}!</p>

      <div className="space-y-4 mt-8">
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Manage Users
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Manage Categories
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Manage GamesShared
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Manage Posts & Threads
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Manage Courses & Lessons
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
