// src/components/main/AboutUs.tsx

import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-3xl font-semibold mb-4">About Us</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        AI_LICE is a community-driven platform designed to support game developers through
        collaboration, resource sharing, and AI-powered assistance. Join us to collaborate, learn,
        and share your game dev projects.
      </p>
      <a href="#" className="text-blue-500 hover:underline font-semibold">
        Learn More &rarr;
      </a>
    </section>
  );
};

export default AboutUs;