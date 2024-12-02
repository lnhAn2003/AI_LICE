// src/components/thread/highlightedthread.tsx
import React from 'react';
import Link from 'next/link';

interface Author {
  _id: string;
  username: string;
  profile: {
    avatarUrl: string;
  };
}

interface Thread {
  _id: string;
  title: string;
  tags: string[];
  authorId: Author; // Adjusted to match backend structure
  replies: number;
  views: number;
  excerpt?: string;
}

interface HighlightedThreadProps {
  thread: Thread;
}

const HighlightedThread: React.FC<HighlightedThreadProps> = ({ thread }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Highlighted Trending Thread
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex">
          <img
            src={thread.authorId.profile.avatarUrl} // Updated to access nested profile.avatarUrl
            alt={`${thread.authorId.username}'s avatar`}
            className="w-16 h-16 rounded-full flex-shrink-0"
          />
          <div className="ml-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {thread.title}
              </h3>
              <div className="mt-1">
                <span className="font-medium text-gray-600 dark:text-gray-400">Tags:</span>{' '}
                {thread.tags.length > 0 ? thread.tags.join(', ') : 'No tags'}
              </div>
              <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
                <span className="font-medium">Author:</span> {thread.authorId.username} &bull;{' '}
                <span className="font-medium">Replies:</span> {thread.replies} &bull;{' '}
                <span className="font-medium">Views:</span> {thread.views}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{thread.excerpt}</p>
            </div>
            <Link
              href={`/threads/details/${thread._id}`}
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Join the Discussion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedThread;

