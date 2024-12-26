// pages/courses/details/[id]/sections/[sectionId]/lessons/new.tsx
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../../../../src/hooks/useAuth';
import NewLessonForm from '../../../../../../../src/components/course/edit/NewLessonForm';

interface NewLessonPageProps {
  sectionId: string;
}

const NewLessonPage: NextPage<NewLessonPageProps> = ({ sectionId }) => {
  const router = useRouter();
  const { id: courseId } = router.query;
  const { user } = useAuth();

  const handleLessonCreated = () => {
    router.push(`/courses/details/${courseId}/sections/${sectionId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Lesson</h1>
      <NewLessonForm sectionId={sectionId} onLessonCreated={handleLessonCreated} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sectionId } = context.params as { sectionId: string };

  return {
    props: {
      sectionId,
    },
  };
};

export default NewLessonPage;
