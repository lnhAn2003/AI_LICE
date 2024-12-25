// pages/admin/index.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ManageUsers from '../../src/components/admin/manageusers';
import { TAG_COLORS } from '../../styles/tagcolors';

interface CourseData {
  _id: string;
  title: string;
}

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalThreads, setTotalThreads] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  // Simple loading state while fetching overall stats
  const [statsLoading, setStatsLoading] = useState(true);

  // Show/hide Manage Users or any other section
  const [showManageUsers, setShowManageUsers] = useState(true);

  useEffect(() => {
    if (user && token) {
      if (user.role !== 'Admin') {
        router.push('/not-authorized');
      }
    }
  }, [user, token, router]);

  // Fetch overall stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1) Fetch all users
        const usersRes = await fetch('http://localhost:5000/users');
        const usersData = await usersRes.json();
        setTotalUsers(usersData.length);

        // 2) Threads
        const threadsRes = await fetch('http://localhost:5000/threads');
        const threadsData = await threadsRes.json();
        setTotalThreads(threadsData.length);

        // 3) Posts
        const postsRes = await fetch('http://localhost:5000/posts');
        const postsData = await postsRes.json();
        setTotalPosts(postsData.length);

        // 4) Games
        const gamesRes = await fetch('http://localhost:5000/gameshareds');
        const gamesData = await gamesRes.json();
        setTotalGames(gamesData.length);

        // 5) Courses
        const coursesRes = await fetch('http://localhost:5000/courses');
        const coursesData: CourseData[] = await coursesRes.json();
        setTotalCourses(coursesData.length);

      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (user?.role === 'Admin') {
      fetchStats();
    }
  }, [user]);

  if (!user || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome, {user.username}
          </p>
        </div>
        <nav className="p-6 space-y-2 flex-1">
          <Link href="/admin">
            <span className="block px-4 py-2 text-gray-700 dark:text-gray-300
                             hover:bg-gray-200 dark:hover:bg-gray-700 rounded 
                             cursor-pointer transition-colors">
              Dashboard
            </span>
          </Link>
          <span
            onClick={() => setShowManageUsers(!showManageUsers)}
            className={`block px-4 py-2 rounded cursor-pointer transition-colors
                        ${
                          showManageUsers
                            ? 'bg-gray-200 dark:bg-gray-700'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        } text-gray-700 dark:text-gray-300`}
          >
            Manage Users
          </span>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 rounded 
                       transition-colors"
          >
            Manage Categories
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 rounded
                       transition-colors"
          >
            Manage GamesShared
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 rounded 
                       transition-colors"
          >
            Manage Posts & Threads
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 rounded 
                       transition-colors"
          >
            Manage Courses
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Overall Stats */}
        <section>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Admin Dashboard
          </h1>
          {statsLoading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
              {[
                { label: 'Total Users', value: totalUsers },
                { label: 'Total Threads', value: totalThreads },
                { label: 'Total Posts', value: totalPosts },
                { label: 'Games Shared', value: totalGames },
                { label: 'Total Courses', value: totalCourses },
              ].map((stat, idx) => {
                const color = TAG_COLORS[idx % TAG_COLORS.length];
                return (
                  <div
                    key={stat.label}
                    className={`p-6 rounded-lg shadow ${color}`}
                  >
                    <h2 className="text-sm font-semibold uppercase">{stat.label}</h2>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Manage Users Section (component) */}
        {showManageUsers && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <ManageUsers />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
