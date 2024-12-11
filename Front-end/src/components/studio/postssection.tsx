import React from 'react';
import Link from 'next/link';
import { Post } from '../../types/studio';

interface PostsSectionProps {
  posts: Post[];
}

const PostsSection: React.FC<PostsSectionProps> = ({ posts }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border-b border-gray-300 dark:border-gray-700 pb-2">
              <h3 className="text-lg font-semibold">{post.threadId.title}</h3>
              <p
                className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Posted: {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="mt-2">
                <Link href={`/threads/details/${post.threadId._id}`}>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline text-sm cursor-pointer">
                    View Thread
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsSection;
