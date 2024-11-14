import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center p-6 bg-lightCream mb-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Welcome to AI_LICE – Your Ultimate Game Development Hub</h2>
      <div className="flex justify-center space-x-4">
        <button className="bg-button text-white px-4 py-2 rounded">Join Now</button>
        <button className="bg-button text-white px-4 py-2 rounded">Share Your Game</button>
        <button className="bg-button text-white px-4 py-2 rounded">Explore Community</button>
      </div>
      <div className="mt-4">
        <span className="text-link cursor-pointer">Top Threads</span> | 
        <span className="text-link cursor-pointer"> Top Games</span> | 
        <span className="text-link cursor-pointer"> Latest News</span>
      </div>
    </section>
  );
};

export default HeroSection;
