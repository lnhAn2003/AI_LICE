// components/game/detail/description.tsx

import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Description
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </section>
  );
};

export default Description;