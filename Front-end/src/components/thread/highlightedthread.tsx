import React from 'react';
import Link from 'next/link';
import { ThreadData } from '../../types/thread';

interface HighlightedThreadProps {
  thread: ThreadData;
}

const TAG_COLORS = [
  'bg-red-500 text-red-50', // Muted Red
  'bg-orange-500 text-orange-50', // Muted Orange
  'bg-green-500 text-green-50', // Muted Green
  'bg-yellow-500 text-yellow-50', // Muted Yellow
];

const HighlightedThread: React.FC<HighlightedThreadProps> = ({ thread }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
        Highlighted Trending Thread
      </h2>
      <div
        className="relative rounded-lg shadow-lg p-8 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/93/3a/34/933a34a1c4855a6e8e86d3f69ee1de98.jpg')",
        }}
      >
        {/* Semi-Transparent Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

        <div className="relative flex flex-col md:flex-row">
          {/* Author Avatar */}
          <img
            src={thread.authorId.profile.avatarUrl}
            alt={`${thread.authorId.username}'s avatar`}
            className="w-24 h-24 rounded-full flex-shrink-0 mx-auto md:mx-0 border-4 border-white shadow-md"
          />
          <div className="mt-6 md:mt-0 md:ml-6 flex-1">
            {/* Title */}
            <h3 className="text-3xl font-bold mb-4">{thread.title}</h3>
            {/* Tags */}
            <div className="flex flex-wrap mb-4">
              {thread.tags.length > 0 ? (
                thread.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs font-bold px-2 py-1 rounded-full mr-2 mb-2 ${TAG_COLORS[index % TAG_COLORS.length]}`}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm italic">No tags</span>
              )}
            </div>
            {/* Thread Metrics */}
            <div className="flex items-center text-sm space-x-6 mb-6">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 13a2 2 0 01-2 2H6l-4 4V5a2 2 0 012-2h12a2 2 0 012 2v8z" />
                </svg>
                {thread.posts.length} Posts
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 3a1 1 0 00-1 1v10a1 1 0 102 0V4a1 1 0 00-1-1z" />
                  <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
                </svg>
                {thread.views} Views
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 10a7 7 0 1110 6.32v1.36a1.32 1.32 0 01-2.64 0v-1.36A7 7 0 015 10z" />
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                By {thread.authorId.username}
              </span>
            </div>
            {/* Excerpt */}
            <p className="text-lg italic mb-6">{thread.excerpt || 'No excerpt available for this thread.'}</p>
            {/* Call-to-Action */}
            <Link href={`/threads/details/${thread._id}`}>
              <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors">
                Join the Discussion
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedThread;
