import React from 'react';

const FeaturedGame: React.FC = () => {
  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Featured Game of the Week</h3>
      <div className="border rounded-md overflow-hidden">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgnEGmChA6bu71IuwQnPKMzzLaUkT9BCThUuuyQPIHcBaiMl7pWnAXXon1dlgb-mPzEs&usqp=CAU" 
          alt="Featured Game" 
          className="w-full h-60 object-fit: cover object-center" 
        />
        <div className="p-4">
          <h4 className="text-lg font-bold">My RPG Adventure</h4>
          <p className="text-sm text-waveGray mb-2">
            A thrilling RPG with a unique storyline and challenging quests. Players can explore new 
            worlds, encounter various characters, and experience immersive gameplay.
          </p>
          <p className="text-sm">Tags: <span className="text-coralPink">#beta</span>, <span className="text-coralPink">#wip</span></p>
          <p className="text-sm">Categories: RPG, Adventure</p>
          <button className="mt-2 bg-button text-white px-4 py-2 rounded">Play Now</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGame;
