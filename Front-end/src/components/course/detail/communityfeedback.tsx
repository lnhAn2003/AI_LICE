import React from 'react';
import { Comment } from '../../../types/course';

interface CommunityFeedbackProps {
  comments: Comment[];
}

const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ comments }) => {
  return (
    <div className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Community Discussion
      </h2>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm">
              <div className="flex items-center mb-2">
                {comment.avatarUrl && (
                  <img
                    src={comment.avatarUrl}
                    alt={comment.username}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {comment.username}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
              <div className="flex items-center mt-2 space-x-4 text-sm text-blue-600">
                <button className="hover:underline">Like</button>
                <button className="hover:underline">Reply</button>
              </div>
              {comment.replies.length > 0 && (
                <div className="ml-6 mt-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                      <div className="flex items-center mb-1">
                        {reply.avatarUrl && (
                          <img
                            src={reply.avatarUrl}
                            alt={reply.username}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <span className="font-medium text-gray-800 dark:text-gray-100">
                          {reply.username}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{reply.comment}</p>
                      <div className="flex items-center mt-1 space-x-2 text-sm text-blue-600">
                        <button className="hover:underline">Like</button>
                        <button className="hover:underline">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 italic">
          Be the first to discuss!
        </p>
      )}
    </div>
  );
};

export default CommunityFeedback;
