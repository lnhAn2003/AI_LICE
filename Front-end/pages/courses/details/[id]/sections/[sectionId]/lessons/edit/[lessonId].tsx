// pages/courses/details/[courseId]/sections/[sectionId]/lessons/edit/[lessonId].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EditLessonForm from '../../../../../../../../src/components/course/edit/EditLessonForm';
import axiosInstance from '../../../../../../../../src/utils/axiosInstance';
import { Lesson, Section, Category } from '../../../../../../../../src/types/course';

const EditLessonPage: React.FC = () => {
  const router = useRouter();
  const { courseId, sectionId, lessonId } = router.query;

  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (router.isReady && courseId && sectionId && lessonId) {
      fetchLessonData(courseId as string, sectionId as string, lessonId as string);
    }
  }, [router.isReady, courseId, sectionId, lessonId]);

  const fetchLessonData = async (courseId: string, sectionId: string, lessonId: string) => {
    try {
      const response = await axiosInstance.get(
        `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`
      );
      setLessonData(response.data);
    } catch (err: any) {
      setError('Failed to fetch lesson data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await axiosInstance.put(
        `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Redirect to the section details page or show a success message
      router.push(`/courses/details/${courseId}/sections/${sectionId}`);
    } catch (err: any) {
      setError('Failed to update lesson.');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error || !lessonData) {
    return <div className="p-4 text-red-500">{error || 'Lesson not found.'}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>
      <EditLessonForm
        initialData={lessonData}
        onSubmit={handleSubmit}
        submitButtonText="Update Lesson"
      />
    </div>
  );
};

export default EditLessonPage;
