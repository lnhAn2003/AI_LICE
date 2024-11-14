import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">About Us</h3>
      <p className="text-sm">
        AI_LICE is a community-driven platform designed to support game developers through
        collaboration, resource sharing, and AI-powered assistance. Join us to collaborate, learn,
        and share your game dev projects.
      </p>
      <a href="#" className="text-link">Learn More</a>
    </section>
  );
};

export default AboutUs;
