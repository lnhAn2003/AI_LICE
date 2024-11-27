// components/HighlightedThread.tsx

import React from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
}

interface Author {
  username: string;
  _id: string;
  avatar: string;
}

interface Thread {
  _id: string;
  title: string;
  category: Category;
  author: Author;
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
            src={thread.author.avatar}
            alt={`${thread.author.username}'s avatar`}
            className="w-16 h-16 rounded-full flex-shrink-0"
          />
          <div className="ml-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {thread.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Category:</span> {thread.category.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <span className="font-medium">Author:</span> {thread.author.username} &bull;{' '}
                <span className="font-medium">Replies:</span> {thread.replies} &bull;{' '}
                <span className="font-medium">Views:</span> {thread.views}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{thread.excerpt}</p>
            </div>
            <Link
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              href={`/threads/${thread._id}`}
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