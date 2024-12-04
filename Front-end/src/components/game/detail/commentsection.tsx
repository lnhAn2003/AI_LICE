// src/components/game/detail/commentsection.tsx
import React, { useState } from 'react';
import { Comment } from '../../../types/game';

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const renderComments = (comments: Comment[], level = 0) => {
    return comments.map((comment, index) => (
      <div key={index} style={{ marginLeft: level * 20 }} className="mb-6">
        <div className="flex justify-between items-center">
          <strong className="text-gray-800 dark:text-gray-100">
            {comment.username}
          </strong>
          <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{comment.content}</p>
        <div className="flex space-x-4 mt-2">
          <button className="text-blue-600 hover:underline dark:text-blue-400">
            Like
          </button>
          <button className="text-blue-600 hover:underline dark:text-blue-400">
            Reply
          </button>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {renderComments(comment.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <section className="my-8 border-t pt-8 border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Comments Section
      </h2>
      {renderComments(comments)}
      {/* Add a Comment */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
          Add a Comment
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          rows={4}
          placeholder="Start typing your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex space-x-4 mt-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
            Submit
          </button>
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={() => setNewComment('')}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
