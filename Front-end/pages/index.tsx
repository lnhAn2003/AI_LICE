import React from 'react';
import HeroSection from '../src/components/main/herosection';
import FeaturedGame from '../src/components/main/featuredgame';
import CommunityUpdates from '../src/components/main/communityupdates';
import TrendingThreads from '../src/components/main/trendingthreads';
import TopGameSuccess from '../src/components/main/topgamesuccess';
import LatestSharedGames from '../src/components/main/latestsharedgames';
import CoursesSection from '../src/components/main/coursessection';
import UserNotifications from '../src/components/main/usernotifications';
import CommunityHighlights from '../src/components/main/communityhighlights';
import AboutUs from '../src/components/main/aboutus';

const HomePage: React.FC = () => {
  return (
    <div className="bg-backgroundMain text-header p-4">
      <HeroSection />
      <FeaturedGame />
      <CommunityUpdates />
      <TrendingThreads />
      <TopGameSuccess />
      <LatestSharedGames />
      <CoursesSection />
      <UserNotifications />
      <CommunityHighlights />
      <AboutUs />
    </div>
  );
};

export default HomePage;
