// pages/user-profile.tsx

import React, { useState } from 'react';
import AvatarSection from '../src/components/profile/avatarsection';
import UserInfo from '../src/components/profile/userinfo';
import Statistics from '../src/components/profile/statistics';
import Badges from '../src/components/profile/badges';
import RecentActivity from '../src/components/profile/recentactivity';
import ActivityChart from '../src/components/profile/activitychart';
import Link from 'next/link';
import { useAuth } from '../src/hooks/useAuth';
import { subDays, format } from 'date-fns';

interface UserProfileProps {
  user: {
    id: string;
    avatarUrl: string;
    username: string;
    bio: string;
    joinedDate: string;
    lastActive: string;
    role: string;
    email: string;
    socialLinks: Array<{ platform: string; url: string }>;
    statistics: {
      threadsCreated: number;
      postsMade: number;
      gamesShared: number;
      aiInteractions: number;
    };
    recentActivity: {
      threads: any[];
      posts: any[];
      games: any[];
    };
    badges: {
      earned: Array<{ icon: string; title: string; description: string }>;
      upcoming: Array<{ icon: string; title: string; description: string }>;
    };
  };
}

const LogoutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Confirm Logout</h2>
        <div className="flex justify-between">
          <button className="flex-1 bg-gray-200 py-2 rounded-md hover:bg-gray-300 mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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

  // Generate fake activity data for demonstration
  const generateFakeActivityData = () => {
    const today = new Date();
    const data = [];

    for (let i = 0; i <= 364; i++) {
      const date = subDays(today, i);
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        count: Math.floor(Math.random() * 5), // Random activity count between 0 and 4
      });
    }

    return data;
  };

  const activityData = generateFakeActivityData();

  return (
    <div className="min-h-screen bg-neutral flex flex-col">
      <div className="container mx-auto p-6 space-y-6">
        <Link href="/" passHref>
          <div className="text-secondary hover:underline cursor-pointer mb-4 inline-block">← Back to Home</div>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-6 bg-primary text-white">User Profile</h1>

          {/* Avatar and User Info */}
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-1/3 p-4 text-center">
              <AvatarSection avatarUrl={user.avatarUrl} onEdit={() => console.log('Edit Avatar clicked')} />
            </div>
            <div className="md:w-2/3 p-4">
              <UserInfo
                username={user.username}
                bio={user.bio}
                role={user.role}
                email={user.email}
                socialLinks={user.socialLinks}
                joinedDate={user.joinedDate}
                lastActive={user.lastActive}
              />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="p-6 bg-neutral">
            <Statistics {...user.statistics} />
          </div>

          {/* Badges and Activity Chart Section */}
          <div className="p-4 bg-white">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Badges Component */}
              <div className="lg:w-2/6">
                <Badges earnedBadges={user.badges.earned} upcomingBadges={user.badges.upcoming} />
              </div>
              {/* Activity Chart Component */}
              <div className="lg:w-4/6">
                <ActivityChart activityData={activityData} />
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="p-6 bg-neutral">
            <RecentActivity userId={user.id} />
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
    </div>
  );
};

export default UserProfile;

// Import and re-export the getUserServerSideProps function as getServerSideProps
export { getUserServerSideProps as getServerSideProps } from '../src/serverside/users.serverside';
