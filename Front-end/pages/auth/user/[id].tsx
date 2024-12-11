// pages/auth/user/[id].tsx
import { subDays, format } from 'date-fns';
import { NextPage } from 'next';
import Link from 'next/link';
import UserInfo from '../../../src/components/profile/userinfo';
import Statistics from '../../../src/components/profile/statistics';
import Badges from '../../../src/components/profile/badges';
import RecentActivity from '../../../src/components/profile/recentactivity';
import ActivityChart from '../../../src/components/profile/activitychart';
import { User } from '../../../src/types/user';
import { getOtherUserServerSideProps } from '../../../src/serverside/otherusers.serverside';

interface OtherUserPageProps {
  user: User;
}

const OtherUserProfilePage: NextPage<OtherUserPageProps> = ({ user }) => {
    if (!user) {
        return (
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center">
            <p className="text-xl font-bold">User data could not be loaded.</p>
          </div>
        );
      }

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
            {user.username}'s Profile
          </h1>

          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-1/3 p-4 text-center">
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md"
              />
            </div>
            <div className="md:w-2/3 p-4">
              <UserInfo user={user} />
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            <Statistics {...user.statistics} />
          </div>

          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-2/6">
                <Badges earnedBadges={user.badges.earned}
                  upcomingBadges={user.badges.upcoming} />
              </div>
              <div className="lg:w-4/6">
              <ActivityChart activityData={activityData} />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            <RecentActivity userId={user.id} lastActive={user.lastActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfilePage;

export { getOtherUserServerSideProps as getServerSideProps };
