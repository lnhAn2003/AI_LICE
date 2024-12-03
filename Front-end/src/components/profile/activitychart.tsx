// src/components/profile/ActivityChart.tsx

import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { subDays } from 'date-fns';
import 'react-calendar-heatmap/dist/styles.css';

interface ActivityChartProps {
  activityData: Array<{ date: string; count: number }>;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ activityData }) => {
  const today = new Date();
  const startDate = subDays(today, 364); 

  return (
    <div className='dark:bg-gray-800'>
      <h3 className="text-xl font-semibold mb-4">Daily Activity</h3>
      <div
        className="p-4 dark:bg-gray-700 rounded-lg shadow w-full" // Ensure full width
        style={{ maxWidth: '800px', margin: '0 auto' }} // Match the width of the badge component container
      >
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={activityData}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return 'color-empty';
            }
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
          showWeekdayLabels
          gutterSize={2}
          horizontal={true}
        />
      </div>
    </div>
  );
};

export default ActivityChart;
