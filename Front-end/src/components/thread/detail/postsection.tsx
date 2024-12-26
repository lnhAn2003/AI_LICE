// src/components/thread/detail/postsection.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Post } from '../../../types/thread';
import { FiThumbsUp, FiMessageCircle, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import EditPostForm from '../../post/edit/EditPostForm';
import { useAuth } from '../../../hooks/useAuth';
import axiosInstance from '../../../utils/axiosInstance';

interface PostsSectionProps {
  posts: Post[];
  threadId: string;
}

const PostsSection: React.FC<PostsSectionProps> = ({ posts, threadId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isAddingPost, setIsAddingPost] = useState(false);

  const handlePostSubmit = async (formData: FormData): Promise<void> => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }

    if (!threadId || typeof threadId !== 'string') {
      alert('Invalid thread ID');
      return;
    }

    try {
      console.log('Submitting FormData:', [...formData.entries()]);

      await axiosInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully!');
      setIsAddingPost(false);
    } catch (error: any) {
      console.error('Error creating post:', error);
      const message = error.response?.data?.message || 'Failed to create post. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="mb-12 w-[90%] mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-left">
        Posts in this Thread
      </h2>

      {/* Display existing posts */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="mb-8 mx-auto bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-lg p-6 max-w-4xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={post.authorId?.profile?.avatarUrl || '/default-avatar.png'}
                alt={post.authorId?.username}
                className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-700"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {post.authorId?.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200">
              <FiMoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300 mb-4">
            {post.content}
          </div>

          {/* Images (if any) */}
          {post.images && post.images.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {post.images.map((imageUrl) => (
                <img
                  key={imageUrl}
                  src={imageUrl}
                  alt={`Image for post with ID: ${post._id}`}
                  className="max-h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                />
              ))}
            </div>
          )}

          {/* File attachment (if any) */}
          {post.fileUrl && (
            <div className="mb-4">
              <Link href={`./${post.fileUrl}`}>
              
              </Link>
              <a
               
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Attached File
              </a>
            </div>
          )}

          {/* Likes and Comments Count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{post.likes?.length || 0} Likes</span> ·{' '}
            <span>{post.comments?.length || 0} Comments</span>
          </div>

          {/* Actions */}
          <div className="flex space-x-6">
            <button
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              <FiThumbsUp className="w-5 h-5" />
              <span>Like</span>
            </button>
            <Link href={`/posts/details/${post._id}`}>
              <button
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <FiMessageCircle className="w-5 h-5" />
                <span>Comment</span>
              </button>
            </Link>
            <button
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              <FiShare2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {/* Add New Post Section */}
      <div className="mt-6">
        {isAddingPost ? (
          <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Create a New Post</h3>
            <EditPostForm
              onSubmit={async (formData) => {
                formData.append('threadId', threadId as string);
                await handlePostSubmit(formData);
              }}
              submitButtonText="Create Post"
              threadId={threadId}
            />
            <button
              onClick={() => setIsAddingPost(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingPost(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition-colors duration-200"
          >
            Add New Post
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsSection;
