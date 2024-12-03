// src/components/thread/detail/threadinfo.tsx
import React from 'react';
import { ThreadData } from '../../../types/thread';
import { FaThumbsUp, FaEye, FaFlag } from 'react-icons/fa';
import { TAG_COLORS } from '../../../../styles/tagcolors';

interface ThreadInfoProps {
  thread: ThreadData;
}

const ThreadInfo: React.FC<ThreadInfoProps> = ({ thread }) => {
  const getTagClasses = (index: number) => TAG_COLORS[index % TAG_COLORS.length];

  return (
    <div
      className="w-[90%] mx-auto mb-8 p-8 rounded-xl shadow-2xl bg-gray-100 dark:bg-gray-800 
      text-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <img
          src={thread.authorId.profile.avatarUrl || '/default-avatar.png'}
          alt={thread.authorId.username}
          className="w-20 h-20 rounded-full mr-6 border-4 border-gray-300 dark:border-gray-700 shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">{thread.title}</h1>
          <p className="text-sm">
            <span className="font-semibold">Author:</span> {thread.authorId.username} ·{' '}
            <span className="font-semibold">Posted:</span>{' '}
            {new Date(thread.createdAt).toLocaleDateString()} ·{' '}
            <span className="font-semibold">Views:</span> {thread.views}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 ">Description</h2>
        <p className="text-lg leading-relaxed">{thread.content}</p>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 ">Tags</h2>
        <div className="flex flex-wrap">
          {thread.tags.map((tag, index) => (
            <span
              key={tag}
              className={`inline-block rounded-full px-4 py-2 text-sm font-semibold mr-3 mb-3 ${getTagClasses(index)}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-start space-x-8">
        <button
          className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 "
          aria-label="Like Thread"
        >
          <FaThumbsUp className="w-6 h-6" />
          <span>Like</span>
        </button>
        <button
          className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label="Follow Thread"
        >
          <FaEye className="w-6 h-6" />
          <span>Follow</span>
        </button>
        <button
          className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          aria-label="Report Thread"
        >
          <FaFlag className="w-6 h-6" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
};

export default ThreadInfo;
