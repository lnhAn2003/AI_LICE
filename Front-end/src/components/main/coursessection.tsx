// src/components/main/CoursesSection.tsx

import React from 'react';

const CoursesSection: React.FC = () => {
  const courses = [
    { title: 'Game Dev Masterclass', creator: 'proDev', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdInRjNKkCLDiYWrtFUPQPqI-VlxllZb-Nrw&s' },
    { title: 'Unity Essentials', creator: 'expertCoder', rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXdqW1w_9_ZDNMbB7Gw-LQpgSF-PO9t-Jxww&s' },
  ];

  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Courses Section</h3>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center border rounded-md p-4">
            <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded mr-4" />
            <div>
              <h4 className="text-lg font-bold">{course.title}</h4>
              <p className="text-sm">Creator: {course.creator}</p>
              <p className="text-sm">Rating: {course.rating}</p>
              <button className="mt-2 bg-secondary text-white px-4 py-2 rounded">Join Course</button>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-secondary hover:underline mt-4 inline-block">View All Courses</a>
    </section>
  );
};

export default CoursesSection;
