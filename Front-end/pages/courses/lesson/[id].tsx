// src/courses/lesson/[id].tsx
// pages/courses/lesson/[id].tsx
import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import axiosInstance from '../../../src/utils/axiosInstance';
import { useRouter } from 'next/router';

interface LessonDetailProps {
  lesson: any;     // or define an interface
  courseId: string;
}

const LessonDetailPage: NextPage<LessonDetailProps> = ({ lesson, courseId }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  const isValidObjectId = (id: string) => /^[a-fA-F0-9]{24}$/.test(id);

const markLessonComplete = async () => {
  if (!isValidObjectId(courseId) || !isValidObjectId(lesson._id)) {
    console.error("Invalid ObjectId:", courseId, lesson._id);
    return;
  }

  try {
    const response = await axiosInstance.post('/progress/update', {
      courseId,
      lessonId: lesson._id,
    });
    console.log('Lesson marked as complete:', response.data);
    setIsCompleted(true);
  } catch (error: any) {
    console.error('Error marking lesson complete:', error.response?.data || error.message);
  }
};
  

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-gray-800 dark:text-gray-100">
          Lesson not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-md p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        {lesson.videoUrl && (
          <div className="mb-4">
            <video controls className="w-full">
              <source src={lesson.videoUrl} type="video/mp4" />
            </video>
          </div>
        )}
        <p className="mb-4">{lesson.textContent}</p>

        {lesson.resources && lesson.resources.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
            <ul className="list-disc ml-5">
              {lesson.resources.map((res: any) => (
                <li key={res._id} className="mb-1">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {res.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={markLessonComplete}
          disabled={isCompleted}
          className={`px-4 py-2 rounded ${
            isCompleted
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCompleted ? 'Lesson Completed' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
};

// ---------------
// SERVER-SIDE PROPS
// ---------------
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const { id } = context.params as { id: string };
      const lessonRes = await axiosInstance.get(`/lessons/${id}`);
      const lessonData = lessonRes.data;
  
      // if lessonData.sectionId is populated, might need:
      const courseIdStr =
        lessonData.sectionId?.courseId?._id?.toString() ||
        lessonData.courseId?.toString() ||
        '';
  
      return {
        props: {
          lesson: lessonData,
          courseId: courseIdStr,
        },
      };
    } catch (error: any) {
      console.error('Error fetching lesson:', error?.response?.data || error.message);
      return {
        notFound: true,
      };
    }
  };
  

export default LessonDetailPage;
