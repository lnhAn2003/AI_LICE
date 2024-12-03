import React from 'react';
import Link from 'next/link';
import { ThreadData } from '../../types/thread';

interface ThreadListProps {
  threads: ThreadData[];
  onToggleFavorite: (threadId: string) => void;
}

const TAG_COLORS = [
  'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300',
  'bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300',
  'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300',
  'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300',
  'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300',
];

// Helper function to truncate content
const truncateContent = (content: string, wordLimit: number): string => {
  const words = content.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : content;
};

const ThreadList: React.FC<ThreadListProps> = ({ threads, onToggleFavorite }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="text-left p-4 text-gray-800 dark:text-gray-100">Favorite</th>
            <th className="text-left p-4 text-gray-800 dark:text-gray-100">Topics</th>
            <th className="text-left p-4 text-gray-800 dark:text-gray-100">Content</th>
            <th className="text-center p-4 text-gray-800 dark:text-gray-100">Replies</th>
            <th className="text-center p-4 text-gray-800 dark:text-gray-100">Views</th>
            <th className="text-left p-4 text-gray-800 dark:text-gray-100">User</th>
            <th className="text-left p-4 text-gray-800 dark:text-gray-100">Date</th>
          </tr>
        </thead>
        <tbody>
          {threads.map((thread) => (
            <tr
              key={thread._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Favorite Status */}
              <td className="p-4 text-center">
                <button
                  onClick={() => onToggleFavorite(thread._id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-500"
                  aria-label={thread.favorited ? 'Unfavorite Thread' : 'Favorite Thread'}
                >
                  {thread.favorited ? (
                    <svg
                      className="w-6 h-6 fill-current text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.1 18.55c-5.05-4.73-8.1-7.65-8.1-10.05 0-2.21 1.79-4 4-4 1.66 0 3.12.92 3.88 2.28.76-1.36 2.22-2.28 3.88-2.28 2.21 0 4 1.79 4 4 0 2.4-3.05 5.32-8.1 10.05l-.9.85-.9-.85z" />
                    </svg>
                  )}
                </button>
              </td>

              {/* Topic */}
              <td className="p-4">
                <Link
                  href={`/threads/details/${thread._id}`}
                  className="text-gray-900 dark:text-gray-100 hover:underline font-semibold"
                >
                  {thread.title}
                </Link>
                {/* Tags */}
                <div className="flex flex-wrap mt-2">
                  {thread.tags.length > 0 ? (
                    thread.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2 ${
                          TAG_COLORS[index % TAG_COLORS.length]
                        }`}
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      No tags
                    </span>
                  )}
                </div>
              </td>

              {/* Content Preview */}
              <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                {truncateContent(thread.content, 5)}
              </td>

              {/* Replies */}
              <td className="p-4 text-center text-gray-800 dark:text-gray-100">
                {thread.posts?.length || 0}
              </td>

              {/* Views */}
              <td className="p-4 text-center text-gray-800 dark:text-gray-100">
                {thread.views}
              </td>

              {/* User Avatar and Name */}
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={thread.authorId.profile.avatarUrl}
                    alt={`${thread.authorId.username}'s avatar`}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-100">
                    {thread.authorId.username}
                  </span>
                </div>
              </td>

              {/* Created Date */}
              <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(thread.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThreadList;
