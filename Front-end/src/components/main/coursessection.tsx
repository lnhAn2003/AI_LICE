import React from 'react';

const CoursesSection: React.FC = () => {
  const courses = [
    { title: 'Game Dev Masterclass', creator: 'proDev', rating: 4.8 },
    { title: 'Unity Essentials', creator: 'expertCoder', rating: 4.7 },
  ];

  return (
    <section className="p-6 bg-cardBackground mb-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Courses Section</h3>
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="border rounded-md p-4">
            <h4 className="text-lg font-bold">{course.title}</h4>
            <p className="text-sm">Creator: {course.creator}</p>
            <p className="text-sm">Rating: {course.rating}</p>
            <button className="mt-2 bg-button text-white px-4 py-2 rounded">Join Course</button>
          </div>
        ))}
      </div>
      <a href="#" className="text-link">View All Courses</a>
    </section>
  );
};

export default CoursesSection;
