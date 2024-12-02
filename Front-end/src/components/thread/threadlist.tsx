// src/components/thread/threadlist.tsx
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
  authorId: Author; // Updated to match backend structure
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
              src={thread.authorId.profile.avatarUrl} // Updated to access nested profile.avatarUrl
              alt={`${thread.authorId.username}'s avatar`}
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
              <span className="font-medium">Tags:</span>{' '}
              {thread.tags.length > 0 ? thread.tags.join(', ') : 'No tags'}
            </span>
            <span>
              <span className="font-medium">Author:</span> {thread.authorId.username}
            </span>
            <span>
              <span className="font-medium">Replies:</span> {thread.replies}
            </span>
            <span>
              <span className="font-medium">Views:</span> {thread.views}
            </span>
            {thread.lastActivity && (
              <span>
                <span className="font-medium">Last Activity:</span>{' '}
                {new Date(thread.lastActivity).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;

