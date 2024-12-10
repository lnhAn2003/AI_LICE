// pages/auth/profile.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../src/hooks/useAuth';
import { subDays, format } from 'date-fns';
import { UserData } from '../../src/types/user';

// Import components
import AvatarSection from '../../src/components/profile/avatarsection';
import UserInfo from '../../src/components/profile/userinfo';
import Statistics from '../../src/components/profile/statistics';
import Badges from '../../src/components/profile/badges';
import RecentActivity from '../../src/components/profile/recentactivity';
import ActivityChart from '../../src/components/profile/activitychart';
import AvatarUpload from '../../src/components/profile/avatarupload';

const LogoutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Confirm Logout
        </h2>
        <div className="flex justify-between">
          <button
            className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 mr-2 text-gray-800 dark:text-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const AvatarEditModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Change Avatar
        </h2>
        <AvatarUpload onUploadSuccess={onClose} />
      </div>
    </div>
  );
};

const UserProfile: React.FC<UserData> = ({ user }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const generateFakeActivityData = () => {
    const today = new Date();
    const data = [];

    for (let i = 0; i <= 364; i++) {
      const date = subDays(today, i);
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        count: Math.floor(Math.random() * 5),
      });
    }

    return data;
  };

  const activityData = generateFakeActivityData();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      <div className="container mx-auto p-6 space-y-6">
        <Link href="/" passHref>
          <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mb-4 inline-block">
            ← Back to Home
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-6 bg-primary dark:bg-gray-700 text-white">
            User Profile
          </h1>

          {/* Avatar and User Info */}
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-1/3 p-4 text-center">
              <AvatarSection
                avatarUrl={user.avatarUrl}
                onEdit={() => setShowAvatarModal(true)}
              />
            </div>
            <div className="md:w-2/3 p-4">
              <UserInfo user={user} />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            <Statistics {...user.statistics} />
          </div>

          {/* Badges and Activity Chart Section */}
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Badges Component */}
              <div className="lg:w-2/6">
                <Badges
                  earnedBadges={user.badges.earned}
                  upcomingBadges={user.badges.upcoming}
                />
              </div>
              {/* Activity Chart Component */}
              <div className="lg:w-4/6">
                <ActivityChart activityData={activityData} />
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            <RecentActivity userId={user.id} lastActive={user.lastActive} />
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />}
      {showAvatarModal && <AvatarEditModal onClose={() => setShowAvatarModal(false)} />}
    </div>
  );
};

export default UserProfile;

export { getUserServerSideProps as getServerSideProps } from '../../src/serverside/users.serverside';
