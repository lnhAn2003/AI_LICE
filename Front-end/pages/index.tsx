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
    <div className="bg-neutral text-dark">

      {/* Main Content */}
      <div className="container mx-auto p-4 space-y-6">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <FeaturedGame />
            <LatestSharedGames />
            <TopGameSuccess />
            <TrendingThreads />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
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
