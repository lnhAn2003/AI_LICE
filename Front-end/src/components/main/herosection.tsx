// src/components/main/HeroSection.tsx

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-96 mb-8 rounded-lg shadow-lg overflow-hidden border border-gray-400"
      style={{
        backgroundImage:
          'url(https://i.pinimg.com/736x/8a/a5/7b/8aa57b58eba14e991b94e6b52250e3a5.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to AI_LICE</h2>
        <p className="text-2xl mb-6 text-center">Your Ultimate Game Development Hub</p>
        <div className="flex flex-wrap justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-semibold mb-2">
            Join Now
          </button>
          <button className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-full font-semibold mb-2">
            Share Your Game
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-full font-semibold mb-2">
            Explore Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;