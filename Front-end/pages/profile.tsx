import React, { useState } from 'react';
import Footer from '../components/index/footer';
import AvatarSection from '../components/profile/avatarsection';
import UserInfo from '../components/profile/userinfo';
import Statistics from '../components/profile/statistics';
import Badges from '../components/profile/badges';
import AboutPreferences from '../components/profile/aboutpreferences';
import RecentActivity from '../components/profile/recentactivity';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import cookie, { parse } from 'cookie';

interface UserProfileProps {
  user: any;
}

const LogoutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 pt-20">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Do you want to logout?</h2>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={onConfirm}>
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

  return (
    <div className="min-h-screen flex flex-col w-full bg-backgroundMain">
      {/* Added container for margins */}
      <div className="mx-20">
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
          {/* Rollback Section */}
          <div className="mb-4">
            <Link href="/" className="text-button hover:underline">
              ← Rollback
            </Link>
          </div>
  
          <div className="w-full border border-black rounded-lg shadow-lg bg-white">
            {/* Main content */}
            <h1 className="text-3xl font-bold mb-4 p-6 bg-cardBackground border-b border-black text-header text-center">
              User Profile Page
            </h1>
  
            {/* Avatar and User Info Section */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-black p-6 bg-white">
              <div className="md:w-1/2 flex flex-col items-center text-center border-r border-black pr-6">
                <AvatarSection avatarUrl={user.avatarUrl} onEdit={() => console.log('Edit Avatar clicked')} />
                <div className="w-full mt-4 bg-backgroundMain p-4 rounded-lg shadow-sm">
                  <Statistics {...user.statistics} />
                </div>
              </div>
  
              <div className="md:w-1/2 text-left md:pl-6">
                <div className="bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                  <UserInfo
                    username={user.username}
                    bio={user.bio}
                    joinedDate={user.joinedDate}
                    lastActive={user.lastActive}
                    role={user.role}
                    email={user.email}
                    socialLinks={user.socialLinks}
                  />
                </div>
              </div>
            </div>
  
            {/* Badges and About Preferences Section */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-black p-6 bg-white">
              <div className="md:w-1/2 flex flex-col items-center text-center border-r border-black pr-6">
                <div className="w-full bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                  <Badges earnedBadges={user.badges.earned} upcomingBadges={user.badges.upcoming} />
                </div>
              </div>
  
              <div className="md:w-1/2 text-left md:pl-6">
                <div className="bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                  <AboutPreferences bio={user.bio} preferences={user.preferences} />
                </div>
              </div>
            </div>
  
            {/* Recent Activity Section */}
            <div className="p-6 bg-white">
              <div className="bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                <RecentActivity userId={user.id} />
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
  
      {/* Logout Modal */}
      {showLogoutModal && <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await axiosInstance.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;

    const userData = {
      id: user._id,
      avatarUrl: user.profile?.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s',
      username: user.username,
      bio: user.profile?.bio || '',
      joinedDate: new Date(user.joinedAt).toLocaleDateString(),
      lastActive: new Date(user.lastActive).toLocaleDateString(),
      role: user.role?.name || 'User',
      email: user.email,
      socialLinks: user.profile?.socialLinks || [],
      statistics: {
        threadsCreated: user.threads?.length || 0,
        postsMade: user.posts?.length || 0,
        gamesShared: user.gamesShared?.length || 0,
        aiInteractions: user.aiInteractions?.length || 0,
      },
      preferences: user.profile?.preferences || {},
      recentActivity: {
        threads: user.threads || [],
        posts: user.posts || [],
        games: user.gamesShared || [],
      },
      badges: {
        earned: [
          { icon: '🎉', title: 'Top Contributor', description: 'Contributed 50+ posts' },
        ],
        upcoming: [
          { icon: '💎', title: 'Community Star', description: 'Contribute 100 posts to unlock' },
        ],
      },
    };

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      notFound: true,
    };
  }
};
