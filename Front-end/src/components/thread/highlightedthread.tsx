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
}

interface Thread {
  _id: string;
  title: string;
  category: Category;
  author: Author;
  replies: number;
  views: number;
  excerpt: string;
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
          {/* Icon */}
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
          {/* Thread Details */}
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {thread.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Category:</span> {thread.category.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Author:</span> {thread.author.username} •{' '}
              <span className="font-medium">Replies:</span> {thread.replies} •{' '}
              <span className="font-medium">Views:</span> {thread.views}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{thread.excerpt}</p>
            <Link className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md" href={`/threads/${thread._id}`}>
                Join the Discussion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedThread;