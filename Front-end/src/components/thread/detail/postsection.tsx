import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Post } from '../../../types/thread';
// import { PostData } from '../../../types/post';
import { useAuth } from '../../../hooks/useAuth';
import { FiThumbsUp, FiMessageCircle, FiShare2, FiMoreHorizontal } from 'react-icons/fi';

interface PostsSectionProps {
  posts: Post[];
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostsSection: React.FC<PostsSectionProps> = ({ posts }) => {
  const { user, token } = useAuth();
  const [editorContent, setEditorContent] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editorContent }),
      });
      if (response.ok) {
        setEditorContent('');
        // Refresh posts logic if necessary
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="mb-12 w-[90%] mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-left">
        Posts in this Thread
      </h2>

      {posts.map((post) => (
        <div
          key={post._id}
          className="mb-8 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300"
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
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
              <FiMoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div
            className="prose dark:prose-dark text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            style={{ maxWidth: '90%' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Likes and Comments Count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>{post.likes?.length || 0} Likes</span> ·{' '}
            <span>{post.comments?.length || 0} Comments</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <button
              className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors duration-200"
              aria-label="Like"
            >
              <FiThumbsUp className="w-6 h-6" />
              <span>Like</span>
            </button>
            <Link href={`/posts/details/${post._id}`}>
              <button
                className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors duration-200"
                aria-label="Comment"

              >
                <FiMessageCircle className="w-6 h-6" />
                <span>Comment</span>
              </button>
            </Link>
            <button
              className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors duration-200"
              aria-label="Share"
            >
              <FiShare2 className="w-6 h-6" />
              <span>Share</span>
            </button>
          </div>

          {/* Comments */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-6">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex mb-4">
                  <img
                    src={comment.authorId.profile?.avatarUrl || '/default-avatar.png'}
                    alt={comment.authorId.username}
                    className="w-10 h-10 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-700"
                  />
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {comment.authorId.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                    <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <button className="hover:text-blue-500 transition-colors duration-200">Like</button>
                      <button className="hover:text-blue-500 transition-colors duration-200">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Add Post Form */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Add a Post</h3>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          placeholder="What's on your mind?"
          modules={{
            toolbar: [
              [{ font: [] }],
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ script: 'sub' }, { script: 'super' }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          className="mb-4 dark:ql-container dark:bg-gray-800"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-colors duration-200"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
