// src/components/course/detail/commentsection.tsx
import React, { useState } from 'react';
import { Comment } from '../../../types/course';

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Add a Comment
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
            onClick={() => setNewComment('')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsSection;
