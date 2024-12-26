// pages/courses/details/[id]/sections/new.tsx
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import axiosInstance from '../../../../../src/utils/axiosInstance';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../../src/hooks/useAuth';
import { Category } from '../../../../../src/types/course';
import NewSectionForm from '../../../../../src/components/course/edit/NewSectionForm';

interface NewSectionPageProps {
  courseId: string;
}

const NewSectionPage: NextPage<NewSectionPageProps> = ({ courseId }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSectionCreated = () => {
    router.push(`/courses/details/${courseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Section</h1>
      <NewSectionForm courseId={courseId} onSectionCreated={handleSectionCreated} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  return {
    props: {
      courseId: id,
    },
  };
};

export default NewSectionPage;
