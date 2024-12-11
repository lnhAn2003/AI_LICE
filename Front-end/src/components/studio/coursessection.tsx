import React from 'react';
import { Course } from '../../types/studio';

interface CoursesSectionProps {
  courses: Course[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
      ) : (
        <ul className="space-y-6">
          {courses.map((course) => (
            <li key={course._id} className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{course.description}</p>
              <div className="flex space-x-2 mb-2">
                {course.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Rating: {course.averageRating.toFixed(1)}
              </p>
              <h4 className="font-bold mb-2">Sections</h4>
              <ul className="space-y-2">
                {course.sections.map((section) => (
                  <li key={section._id}>
                    <p className="text-sm font-semibold">{section.sectionTitle}</p>
                    <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
                      {section.lessons.map((lesson) => (
                        <li key={lesson._id}>{lesson.title}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesSection;
