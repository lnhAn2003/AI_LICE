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
import { FaCogs } from 'react-icons/fa';

const LogoutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md transform scale-100 transition-transform">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Confirm Logout
        </h2>
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={props.onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const DescriptionModal: React.FC<{ description: string; onClose: () => void }> = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Full Description</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const UserProfile: React.FC<UserData> = ({ user }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [description, setDescription] = useState(user.bio || '');
  const [isEditing, setIsEditing] = useState(false);

  const { logout, user: loggedInUser } = useAuth();

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

  const saveDescription = () => {
    setIsEditing(false);
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

  const AvatarEditModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      <div className="container mx-auto p-6 space-y-6">
        <Link href="/" passHref>
          <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mb-4 inline-block">
            ← Back to Home
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white tracking-wider">
            User Profile
          </h1>

          <div className="flex flex-col md:flex-row p-6 space-y-8 md:space-y-0 md:space-x-8">
            <div className="md:w-1/3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm flex flex-col justify-between">
              <AvatarSection
                avatarUrl={user.avatarUrl}
                onEdit={() => setShowAvatarModal(true)}
              />
              <div className="mt-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      className="w-full h-32 p-2 border-2 border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      onClick={saveDescription}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {description.length > 150
                        ? `${description.substring(0, 150)}...`
                        : description}
                    </p>
                    {description.length > 150 && (
                      <button
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => setShowDescriptionModal(true)}
                      >
                        Read More
                      </button>
                    )}
                    {loggedInUser?.id === user.id && (
                      <button
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:underline block"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Description
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-auto">
                <Link
                  href={`/studio/${user.id}`}
                  passHref
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors space-x-2 w-full text-center"
                >
                  <FaCogs size={18} />
                  <span>My Studio</span>
                </Link>
              </div>
            </div>

            <div className="md:w-2/3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <UserInfo user={user} />
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
            <Statistics {...user.statistics} />
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <Badges
                  earnedBadges={user.badges.earned}
                  upcomingBadges={user.badges.upcoming}
                />
              </div>
              <div className="lg:w-4/6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <ActivityChart activityData={activityData} />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 space-y-6 rounded-b-lg">
            <RecentActivity userId={user.id} lastActive={user.lastActive} />
          </div>

          
        </div>
        <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
      </div>

      {showLogoutModal && <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />}
      {showAvatarModal && <AvatarEditModal onClose={() => setShowAvatarModal(false)} />}
      {showDescriptionModal && (
        <DescriptionModal description={description} onClose={() => setShowDescriptionModal(false)} />
      )}
    </div>
  );
};

export default UserProfile;

export { getUserServerSideProps as getServerSideProps } from '../../src/serverside/users.serverside';
