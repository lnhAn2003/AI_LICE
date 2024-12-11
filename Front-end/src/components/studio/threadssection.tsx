import React from 'react';
import Link from 'next/link';
import { Thread } from '../../types/studio';

interface ThreadsSectionProps {
  threads: Thread[];
}

const ThreadsSection: React.FC<ThreadsSectionProps> = ({ threads }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Threads</h2>
      {threads.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No threads found.</p>
      ) : (
        <ul className="space-y-4">
          {threads.map((thread) => (
            <li key={thread._id} className="border-b border-gray-300 dark:border-gray-700 pb-2">
              <h3 className="text-lg font-semibold">{thread.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Created: {new Date(thread.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Views: {thread.views} {thread.isPinned && ' | Pinned'}
              </p>
              <div className="flex space-x-2">
                {thread.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <Link href={`/threads/details/${thread._id}`}>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline text-sm cursor-pointer">
                    View Thread
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreadsSection;
