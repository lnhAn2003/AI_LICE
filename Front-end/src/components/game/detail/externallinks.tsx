// src/components/game/detail/externallinks.tsx
import React from 'react';
import { ExternalLink } from '../../../types/game'; 

interface ExternalLinksComponentProps {
  links: ExternalLink[];
  downloadLink: string | null;
}

const ExternalLinks: React.FC<ExternalLinksComponentProps> = ({ links, downloadLink }) => {
  const getLinkByName = (name: string): string | null => {
    const link = links.find(link => link.name === name);
    return link ? link.url : null;
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        External Links
      </h2>
      <ul className="space-y-2">
        {getLinkByName('officialWebsite') && (
          <li>
            <a
              href={getLinkByName('officialWebsite')!}
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website
            </a>
          </li>
        )}
        {getLinkByName('gameplayVideo') && (
          <li>
            <a
              href={getLinkByName('gameplayVideo')!}
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gameplay Video
            </a>
          </li>
        )}
        {getLinkByName('communityForum') && (
          <li>
            <a
              href={getLinkByName('communityForum')!}
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community Forum
            </a>
          </li>
        )}
      </ul>
      {downloadLink && (
        <div className="mt-6">
          <a
            href={downloadLink}
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Now
          </a>
        </div>
      )}
    </section>
  );
};

export default ExternalLinks;
