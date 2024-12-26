// pages/courses/newcourse.tsx
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import axiosInstance from '../../src/utils/axiosInstance';
import EditCourseForm from '../../src/components/course/edit/editcourseform';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';
import { Category } from '../../src/types/course';

interface NewCoursePageProps {
  allCategories: Category[];
}

const NewCoursePage: NextPage<NewCoursePageProps> = ({ allCategories }) => {
  const router = useRouter();
  const { user } = useAuth(); 

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      alert('You must be logged in to create a course.');
      return;
    }

    try {
      const res = await axiosInstance.post('/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course created successfully!');
      const courseId = res.data._id;
      router.push(`/courses/details/${courseId}`);
    } catch (error: any) {
      console.error('Error creating new course:', error);
      const message = error.response?.data?.message || 'Failed to create new course. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Course</h1>
      <EditCourseForm 
        onSubmit={handleSubmit} 
        submitButtonText="Create Course" 
        allCategories={allCategories} 
      />
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
