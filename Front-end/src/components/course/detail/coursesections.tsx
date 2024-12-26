import React from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../../../utils/axiosInstance';

interface LessonItem {
  _id: string;
  title: string;
}

interface SectionItem {
  courseId: string;
  _id: string;
  sectionTitle: string;
  lessons: LessonItem[];
}

interface CourseSectionsProps {
  sections: SectionItem[];
  completedLessonIds: string[]; // IDs of completed lessons
  onProgressUpdated?: () => void; // Callback to refresh progress
}

const CourseSections: React.FC<CourseSectionsProps> = ({
  sections,
  completedLessonIds,
  onProgressUpdated,
}) => {
  const router = useRouter();

  // Calculate the progress for each section
  const computeSectionProgress = (section: SectionItem) => {
    const totalLessons = section.lessons.length;
    const completedCount = section.lessons.filter((lesson) =>
      completedLessonIds.includes(lesson._id)
    ).length;

    const percent = totalLessons ? (completedCount / totalLessons) * 100 : 0;
    const isComplete = completedCount === totalLessons;

    return { percent, isComplete };
  };

  const handleLessonClick = async (lessonId: string) => {
    try {
      const courseId = sections[0]?.courseId; // Assume all sections belong to the same course
      if (!courseId || !lessonId) {
        console.error('Invalid courseId or lessonId');
        return;
      }

      // Update the backend progress
      await axiosInstance.post('/progress/update', { courseId, lessonId });

      // Call parent callback to refresh progress
      if (onProgressUpdated) onProgressUpdated();

      // Navigate to the lesson detail page
      router.push(`/courses/lesson/${lessonId}`);
    } catch (error: any) {
      console.error(
        'Error updating progress:',
        error?.response?.data || error.message
      );
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Course Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const { percent, isComplete } = computeSectionProgress(section);

          return (
            <div
              key={section._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6
                         transform transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Section Title */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {section.sectionTitle}
                </h3>
                {isComplete && (
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 01 0 1.414l-7.414 7.414a1 1 0 01-1.414 0L3.293 
                        9.414a1 1 0 011.414-1.414l4.586 4.586 6.586-6.586
                        a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Section Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(percent)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Lessons in this Section */}
              <ul className="space-y-2">
                {section.lessons.map((lesson) => {
                  const isCompleted = completedLessonIds.includes(lesson._id);

                  return (
                    <li
                      key={lesson._id}
                      className={`flex items-center space-x-2 text-sm cursor-pointer p-1 rounded ${
                        isCompleted
                          ? 'text-green-500'
                          : 'text-gray-800 dark:text-gray-200'
                      } hover:bg-gray-100 dark:hover:bg-gray-700`}
                      onClick={() => handleLessonClick(lesson._id)}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 01 0 1.414l-7.414 7.414a1 1 0 01-1.414 0L3.293 
                              9.414a1 1 0 011.414-1.414l4.586 4.586 6.586-6.586
                              a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-blue-600 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m2 2H7m2 8H5l7-16h2l7 16h-4"
                          />
                        </svg>
                      )}
                      <span className="font-medium">{lesson.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSections;
