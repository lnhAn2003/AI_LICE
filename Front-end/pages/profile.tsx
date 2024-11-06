// pages/profile.tsx

import React from 'react';
import Footer from '../components/footer';
import AvatarSection from '../components/avatarsection';
import UserInfo from '../components/userinfo';
import Statistics from '../components/statistics';
import Badges from '../components/badges';
import AboutPreferences from '../components/aboutpreferences';
import RecentActivity from '../components/recentactivity';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  user: any; // Replace 'any' with your User type/interface
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const handleEditAvatar = () => {
    console.log('Edit Avatar clicked');
  };
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col w-full bg-backgroundMain">
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        {/* Rollback Section */}
        <div className="mb-4">
          <Link href="/" className="text-button hover:underline">
            ← Rollback
          </Link>
        </div>

        <div className="w-full border border-shadowBorder rounded-lg shadow-lg bg-white">
          {/* White background for the main content */}
          <h1 className="text-3xl font-bold mb-4 p-6 bg-cardBackground border-b border-shadowBorder text-header text-center">
            User Profile Page
          </h1>

          {/* Avatar and User Info Section */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-shadowBorder p-6 bg-white">
            {/* Left Column - Avatar */}
            <div className="md:w-1/2 flex flex-col items-center text-center border-r border-shadowBorder pr-6">
              <AvatarSection avatarUrl={user.avatarUrl} onEdit={handleEditAvatar} />
              <div className="w-full mt-4 bg-backgroundMain p-4 rounded-lg shadow-sm">
                <Statistics {...user.statistics} />
              </div>
            </div>

            {/* Right Column - User Info */}
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
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-shadowBorder p-6 bg-white">
            {/* Left Column - Badges */}
            <div className="md:w-1/2 flex flex-col items-center text-center border-r border-shadowBorder pr-6">
              <div className="w-full bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                <Badges earnedBadges={user.badges.earned} upcomingBadges={user.badges.upcoming} />
              </div>
            </div>

            {/* Right Column - About Preferences */}
            <div className="md:w-1/2 text-left md:pl-6">
              <div className="bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
                <AboutPreferences bio={user.bio} preferences={user.preferences} />
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="p-6 bg-white">
            <div className="bg-backgroundMain p-4 rounded-lg shadow-sm text-header">
              <RecentActivity
                threads={user.recentActivity.threads}
                posts={user.recentActivity.posts}
                games={user.recentActivity.games}
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" onClick={ logout }>Logout</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // Parse cookies
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    // If no token, redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const backendApiUrl = 'http://localhost:5000'; // Or use environment variable

  let userData;
  try {
    const res = await fetch(`${backendApiUrl}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.statusText}`);
    }

    const user = await res.json();

    // Transform the data as needed to match the structure used in your component
    userData = {
      avatarUrl: user.profile?.avatarUrl || '/images/default-avatar.png',
      username: user.username,
      bio: user.profile?.bio || '',
      joinedDate: new Date(user.createdAt).toLocaleDateString(),
      lastActive: new Date(user.lastActive).toLocaleDateString(),
      role: user.role?.name || 'User',
      email: user.email,
      socialLinks: user.profile?.socialLinks || [],
      statistics: {
        threadsCreated: user.statistics?.threadsCreated || 0,
        postsMade: user.statistics?.postsMade || 0,
        gamesShared: user.statistics?.gamesShared || 0,
        aiInteractions: user.statistics?.aiInteractions || 0,
      },
      preferences: user.profile?.preferences || {},
      recentActivity: user.recentActivity || {},
      // Keep badges hardcoded
      badges: {
        earned: [
          { icon: '🎉 ', title: 'Top Contributor', description: 'Contributed 50+ posts' },
          // ... other badges
        ],
        upcoming: [
          { icon: '💎', title: 'Community Star', description: 'Contribute 100 posts to unlock' },
          // ... other badges
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: userData,
    },
  };
};
