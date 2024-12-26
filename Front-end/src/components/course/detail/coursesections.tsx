// src/components/course/detail/CourseSections.tsx

import React from 'react';
import { Section } from '../../../types/course';
import Link from 'next/link';

interface CourseSectionsProps {
  sections: Section[];
  userProgress?: { [sectionId: string]: number };
}

const CourseSections: React.FC<CourseSectionsProps> = ({ sections, userProgress = {} }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Course Content
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const totalLessons = section.lessons.length;
          const completedLessons = userProgress[section._id] ?? 0;
          const completionRate = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

          return (
            <div
              key={section._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 transform transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {section.sectionTitle}
                </h3>
                {/* Edit Section Link */}
                <Link className="text-red-500 hover:underline"
                  href={`/courses/details/${section.courseId}/sections/${section._id}/edit`}
                >
                  Edit Section
                </Link>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(completionRate)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              <ul className="space-y-2">
                {section.lessons.map((lesson) => (
                  <li key={lesson._id} className="flex items-center space-x-2 text-sm">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m2 2H7m2 8H5l7-16h2l7 16h-4"
                      />
                    </svg>
                    {lesson.videoUrl ? (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-gray-200 font-medium hover:underline"
                      >
                        {lesson.title}
                      </a>
                    ) : (
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {lesson.title}
                      </span>
                    )}
                    {/* Edit Lesson Link */}
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`/courses/details/${section.courseId}/sections/${section._id}/lessons/edit/${lesson._id}`}
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSections;
