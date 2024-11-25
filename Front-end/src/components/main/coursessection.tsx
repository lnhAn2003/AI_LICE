// src/components/main/CoursesSection.tsx

import React from 'react';

const CoursesSection: React.FC = () => {
  const courses = [
    {
      title: 'Game Dev Masterclass',
      creator: 'proDev',
      rating: 4.8,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdInRjNKkCLDiYWrtFUPQPqI-VlxllZb-Nrw&s',
    },
    {
      title: 'Unity Essentials',
      creator: 'expertCoder',
      rating: 4.7,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXdqW1w_9_ZDNMbB7Gw-LQpgSF-PO9t-Jxww&s',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-400">
      <h3 className="text-2xl font-semibold mb-4">Courses Section</h3>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-1">{course.title}</h4>
              <p className="text-sm mb-1">Creator: {course.creator}</p>
              <p className="text-sm mb-2">Rating: {course.rating}</p>
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-full font-semibold">
                Join Course
              </button>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-blue-500 hover:underline mt-6 inline-block font-semibold">
        View All Courses &rarr;
      </a>
    </section>
  );
};

export default CoursesSection;