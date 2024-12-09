// src/components/course/detail/screenshots.tsx
import React from 'react';

interface ScreenshotsProps {
  screenshots: string[];
}

const Screenshots: React.FC<ScreenshotsProps> = ({ screenshots }) => {
  return (
    <div className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Screenshots
      </h2>
      <div className="flex space-x-4 overflow-x-auto p-2">
        {screenshots.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Screenshot ${index + 1}`}
            className="w-64 h-36 object-cover rounded-md shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Screenshots;
