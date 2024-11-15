import React from 'react';

interface Badge {
  icon: string;
  title: string;
  description: string;
}

interface BadgesProps {
  earnedBadges: Badge[];
  upcomingBadges: Badge[];
}

const Badges: React.FC<BadgesProps> = ({ earnedBadges, upcomingBadges }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Badges and Achievements</h3>
      <div>
        <h4 className="font-semibold mb-2">Earned Badges</h4>
        <div className="flex flex-wrap gap-4">
          {earnedBadges.map((badge, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-neutral rounded-lg flex flex-col items-center justify-center shadow-md relative group"
            >
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-sm font-semibold text-center mt-2">{badge.title}</p>
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded p-1">
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Upcoming Badges</h4>
        <div className="flex flex-wrap gap-4">
          {upcomingBadges.map((badge, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-neutral rounded-lg flex flex-col items-center justify-center shadow-md opacity-50 relative group"
            >
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-sm font-semibold text-center mt-2">{badge.title}</p>
              <div className="absolute top-full mt-2 hidden group-hover:block bg-black text-white text-xs rounded p-1">
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Badges;
