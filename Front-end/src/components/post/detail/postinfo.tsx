import React from 'react';
import { PostData } from '../../../types/post';
import { FaThumbsUp, FaFlag } from 'react-icons/fa';
import { TAG_COLORS } from '../../../../styles/tagcolors';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

interface PostInfoProps {
  post: PostData;
}

const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
  const getTagClasses = (index: number) => TAG_COLORS[index % TAG_COLORS.length];

  return (
    <div
      className="w-[90%] mx-auto mb-8 p-8 rounded-xl shadow-2xl bg-gray-100 dark:bg-gray-800 
      text-gray-900 dark:text-gray-100"
    >
      {/* Rollback Link */}
      <div className="flex items-center mb-6">
        <FiArrowLeft className="mr-2 text-blue-600 dark:text-blue-400" />
        <Link
          href={`/threads/details/${post.threadId._id}`}
          className="text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline"
        >
          Back to: {post.threadId.title}
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center mb-8">
        <img
          src={post.authorId.profile?.avatarUrl}
          alt={post.authorId.username}
          className="w-20 h-20 rounded-full mr-6 border-4 border-gray-300 dark:border-gray-700 shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">{post.threadId.title}</h1>
          <p className="text-sm">
            <span className="font-semibold">Author:</span> {post.authorId.username} ·{' '}
            <span className="font-semibold">Posted:</span>{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 ">Post Content</h2>
        <div
          className="prose dark:prose-dark text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Post Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.images.map((image, index) => (
              <div key={index} className="w-full h-auto">
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-start space-x-8">
        <button
          className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 "
          aria-label="Like Post"
        >
          <FaThumbsUp className="w-6 h-6" />
          <span>Like</span>
        </button>
        <button
          className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          aria-label="Report Post"
        >
          <FaFlag className="w-6 h-6" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
};

export default PostInfo;
