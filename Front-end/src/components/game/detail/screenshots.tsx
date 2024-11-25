// components/game/detail/screenshots.tsx

import React from 'react';

interface ScreenshotsProps {
  screenshots: string[];
}

const Screenshots: React.FC<ScreenshotsProps> = ({ screenshots }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Screenshots & Images
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Screenshots;