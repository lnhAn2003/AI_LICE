// src/components/game/detail/changelogs.tsx
import React from 'react';

interface ChangelogEntry {
  date: string;
  description: string; // Changed from 'changes' to 'description'
}

interface ChangelogProps {
  changelog: ChangelogEntry[];
}

const Changelog: React.FC<ChangelogProps> = ({ changelog }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Changelog
      </h2>
      <ul className="space-y-4">
        {changelog.map((log, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
            <strong className="block text-lg text-gray-800 dark:text-gray-100">
              [{new Date(log.date).toLocaleDateString()}]
            </strong>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{log.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Changelog;
