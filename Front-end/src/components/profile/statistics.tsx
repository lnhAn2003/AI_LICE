// src/components/profile/Statistics.tsx

import React from 'react';

interface StatisticsProps {
  threadsCreated: number;
  postsMade: number;
  gamesShared: number;
  aiInteractions: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  threadsCreated,
  postsMade,
  gamesShared,
  aiInteractions,
}) => {
  return (
    <div className="dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary">{threadsCreated}</p>
          <p>Threads Created</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary">{postsMade}</p>
          <p>Posts Made</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary">{gamesShared}</p>
          <p>Games Shared</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary">{aiInteractions}</p>
          <p>AI Interactions</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
