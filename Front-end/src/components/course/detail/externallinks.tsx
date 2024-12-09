// src/components/course/detail/externallinks.tsx
import React from 'react';

interface ExternalLinksProps {
  resources: string[];
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ resources }) => {
  return (
    <div className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Course Resources
      </h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M..."/>
              </svg>
              <span>Resource {index + 1}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalLinks;
