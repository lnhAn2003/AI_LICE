// src/components/thread/detail/ThreadInfo.tsx
import React from 'react';
import { ThreadData } from '../../../types/thread';

interface ThreadInfoProps {
  thread: ThreadData;
}

const ThreadInfo: React.FC<ThreadInfoProps> = ({ thread }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {thread.title}
      </h1>
      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="mr-4">Category: General</span>
        <span className="mr-4">Author: {thread.authorId.username}</span>
        <span className="mr-4">
          Date Posted: {new Date(thread.createdAt).toLocaleDateString()}
        </span>
        <span>Views: {thread.views}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">{thread.content}</p>
      </div>
      <div className="mt-4 flex flex-wrap">
        {thread.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap">
        {/* Actions */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 mb-2">
          Like
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 mb-2">
          Follow Thread
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-2">
          Report Thread
        </button>
      </div>
    </div>
  );
};

export default ThreadInfo;
