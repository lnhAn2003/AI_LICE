// src/components/game/detail/externallinks.tsx
import React from 'react';

interface ExternalLinksProps {
  links: {
    officialWebsite: string;
    gameplayVideo: string;
    communityForum: string;
  };
  downloadLink: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ links, downloadLink }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        External Links
      </h2>
      <ul className="space-y-2">
        <li>
          <a
            href={links.officialWebsite}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Official Website
          </a>
        </li>
        <li>
          <a
            href={links.gameplayVideo}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Gameplay Video
          </a>
        </li>
        <li>
          <a
            href={links.communityForum}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Community Forum
          </a>
        </li>
      </ul>
      <div className="mt-6">
        <a
          href={downloadLink}
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
        >
          Download Now
        </a>
      </div>
    </section>
  );
};

export default ExternalLinks;