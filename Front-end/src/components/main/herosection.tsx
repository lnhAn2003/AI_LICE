// src/components/main/HeroSection.tsx

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-cover bg-center bg-no-repeat h-96 mb-6" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0m6BmYXh1w1pSkvb_421qjRYtHyakLcvFkw&s)' }}>
      <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to AI_LICE</h2>
        <p className="text-xl mb-6">Your Ultimate Game Development Hub</p>
        <div className="flex space-x-4">
          <button className="bg-secondary px-6 py-3 rounded">Join Now</button>
          <button className="bg-secondary px-6 py-3 rounded">Share Your Game</button>
          <button className="bg-secondary px-6 py-3 rounded">Explore Community</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
