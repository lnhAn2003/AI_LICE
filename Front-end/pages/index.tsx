// pages/index.tsx

import React from 'react';
import HeroSection from '../src/components/main/herosection';
import FeaturedGame from '../src/components/main/featuredgame';
import LatestSharedGames from '../src/components/main/latestsharedgames';
import TopGameSuccess from '../src/components/main/topgamesuccess';
import TrendingThreads from '../src/components/main/trendingthreads';
import CommunityUpdates from '../src/components/main/communityupdates';
import UserNotifications from '../src/components/main/usernotifications';
import CoursesSection from '../src/components/main/coursessection';
import CommunityHighlights from '../src/components/main/communityhighlights';
import AboutUs from '../src/components/main/aboutus';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-6 space-y-8">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FeaturedGame />
            <LatestSharedGames />
            <TopGameSuccess />
            <TrendingThreads />
          </div>

          <div className="space-y-8">
            <CommunityUpdates />
            <UserNotifications />
            <CoursesSection />
          </div>
        </div>
        <CommunityHighlights />
        <AboutUs />
      </div>
    </div>
  );
};

export default HomePage;