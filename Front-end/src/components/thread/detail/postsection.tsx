// src/components/thread/detail/postssection.tsx
import React from 'react';
import { Post } from '../../../types/thread';

interface PostsSectionProps {
  posts: Post[];
}

const PostsSection: React.FC<PostsSectionProps> = ({ posts }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Posts in this Thread
      </h2>
      {posts.map((post) => (
        <div key={post._id} className="mb-6 border-b pb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-800 dark:text-gray-100">
              <strong>Author</strong>: {post.authorId.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Date Posted: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
          </div>
          {/* Reactions and Actions */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reactions: 👍 0 ❤️ 0 😂 0 😮 0
            </p>
            <div className="mt-2 flex flex-wrap">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 mb-2">
                Like
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 mb-2">
                Reply
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-2">
                Report
              </button>
            </div>
          </div>
          {/* Comments Section */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-4 ml-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                Comments
              </h3>
              {post.comments.map((comment) => (
                <div key={comment._id} className="mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-800 dark:text-gray-100">
                      <strong>{comment.authorId.username}</strong>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                  <div className="mt-2 flex flex-wrap">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 mb-2">
                      Like
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 mb-2">
                      Reply
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mb-2">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Add Post Form */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Add a Post
        </h3>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          rows={5}
          placeholder="Write your post here..."
        ></textarea>
        <div className="mt-2 flex">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
            Submit Post
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
