// pages/courses/newcourse.tsx
// pages/courses/newcourse.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import axiosInstance from '../../src/utils/axiosInstance';
import EditCourseForm from '../../src/components/course/edit/EditCourseForm';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';
import { Category } from '../../src/types/course';

interface NewCoursePageProps {
  allCategories: Category[];
}

const NewCoursePage: React.FC<NewCoursePageProps> = ({ allCategories }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      alert('You must be logged in to create a course.');
      return;
    }

    try {
      await axiosInstance.post('/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course created successfully!');
      router.push(`/studio/${user._id}`);
    } catch (error: any) {
      console.error('Error creating new course:', error);
      const message =
        error.response?.data?.message || 'Failed to create new course. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Course</h1>
      <EditCourseForm onSubmit={handleSubmit} submitButtonText="Create Course" allCategories={allCategories} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categoriesRes = await axiosInstance.get('/categories');
    const allCategories = categoriesRes.data;

    return {
      props: {
        allCategories,
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        allCategories: [],
      },
    };
  }
};

export default NewCoursePage;
