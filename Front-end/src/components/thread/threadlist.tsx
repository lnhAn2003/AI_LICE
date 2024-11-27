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
  avatar: string;
}

interface Thread {
  _id: string;
  title: string;
  category: Category;
  author: Author;
  replies: number;
  views: number;
  lastActivity?: string;
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
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-2">
            <img
              src={thread.author.avatar}
              alt={`${thread.author.username}'s avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              <Link
                href={`/threads/${thread._id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {thread.title}
              </Link>
            </h3>
          </div>
          <div className="flex flex-wrap text-gray-600 dark:text-gray-400 text-sm space-x-4">
            <span>
              <span className="font-medium">Category:</span> {thread.category.name}
            </span>
            <span>
              <span className="font-medium">Author:</span> {thread.author.username}
            </span>
            <span>
              <span className="font-medium">Replies:</span> {thread.replies}
            </span>
            <span>
              <span className="font-medium">Views:</span> {thread.views}
            </span>
            <span>
              <span className="font-medium">Last Activity:</span> {thread.lastActivity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;