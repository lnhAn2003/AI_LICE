// components/ThreadList.tsx

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
  lastActivity: string;
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <div
          key={thread._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            <Link href={`/threads/${thread._id}`}>
             {thread.title}
            </Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Category:</span> {thread.category.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Author:</span> {thread.author.username} •{' '}
            <span className="font-medium">Replies:</span> {thread.replies} •{' '}
            <span className="font-medium">Views:</span> {thread.views}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Last Activity:</span> {thread.lastActivity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
