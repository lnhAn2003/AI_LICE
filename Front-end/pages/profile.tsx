// pages/profile.tsx

import Footer from '../components/footer'
import AvatarSection from '../components/avatarsection'
import UserInfo from '../components/userinfo'
import Statistics from '../components/statistics'
import Badges from '../components/badges'
import AboutPreferences from '../components/aboutpreferences'
import RecentActivity from '../components/recentactivity'
import Link from 'next/link'

const UserProfile = () => {
  const user = {
    avatarUrl: '/images/avatar.png',
    username: 'gamer123',
    bio: 'Avid gamer and game developer.',
    joinedDate: 'Sep 20, 2024',
    lastActive: 'Nov 1, 2024',
    role: 'Game Developer',
    email: 'gamer123@example.com',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/gamer123' },
      { platform: 'GitHub', url: 'https://github.com/gamer123' },
    ],
    statistics: {
      threadsCreated: 12,
      postsMade: 45,
      gamesShared: 3,
      aiInteractions: 7,
    },
    badges: {
      earned: [
        { icon: '🏅', title: 'Top Contributor', description: 'Contributed 50+ posts' },
        { icon: '🎉', title: 'Game Sharer', description: 'Shared 5 games' },
        { icon: '📘', title: 'Knowledge Seeker', description: 'Completed 3 courses' },
      ],
      upcoming: [
        { icon: '⭐', title: 'Community Star', description: 'Contribute 100 posts to unlock' },
        { icon: '🥇', title: 'Master Game Dev', description: 'Share 10 games to unlock' },
        { icon: '📚', title: 'Dedicated Learner', description: 'Complete 5 courses to unlock' },
      ],
    },
    preferences: {
      notifications: true,
      theme: 'Light',
      locale: 'en',
      timezone: 'UTC',
    },
    recentActivity: {
      threads: [
        { title: 'My Favorite RPGs and Why', dateCreated: 'Oct 25, 2024' },
        { title: 'Tips for Developing Action-Packed Games', dateCreated: 'Oct 20, 2024' },
      ],
      posts: [
        { action: 'Replied', threadTitle: 'Game Mechanics: The Art of Combat Design', date: 'Oct 30, 2024' },
        { action: 'Commented', threadTitle: 'Best Pixel Art Tips', date: 'Oct 15, 2024' },
      ],
      games: [
        { title: 'My RPG Adventure', sharedOn: 'Oct 20, 2024' },
      ],
    },
  }

  const handleEditAvatar = () => {
    console.log('Edit Avatar clicked')
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-backgroundMain">
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        {/* Rollback Section */}
        <div className="mb-4">
          <Link href="/" className="text-button hover:underline">
            ← Rollback
          </Link>
        </div>

        <div className="w-full border border-shadowBorder rounded-lg shadow-lg bg-white"> {/* White background for the main content */}
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
                <Badges
                  earnedBadges={user.badges.earned}
                  upcomingBadges={user.badges.upcoming}
                />
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default UserProfile
