// src/components/game/detail/communityfeedback.tsx
import React from 'react';
import { CommunityFeedbackProps } from '../../../types/thread';

const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ feedback }) => {
  return (
    <section className="my-8 border-t pt-8 border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Community Feedback
      </h2>
      <div className="flex space-x-8 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {feedback.likes}
          </div>
          <div className="text-gray-700 dark:text-gray-300">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {feedback.dislikes}
          </div>
          <div className="text-gray-700 dark:text-gray-300">Dislikes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {feedback.successRate}%
          </div>
          <div className="text-gray-700 dark:text-gray-300">Success Rate</div>
        </div>
      </div>
      <div>
        {feedback.feedbacks.map((fb, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4"
          >
            <strong className="text-gray-800 dark:text-gray-100">{fb.username}</strong>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{fb.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityFeedback;