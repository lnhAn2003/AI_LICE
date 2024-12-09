// src/components/course/detail/description.tsx
import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Description
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Description;

