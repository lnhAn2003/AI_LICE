// pages/games/newgameshared.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import axiosInstance from '../../src/utils/axiosInstance';
import EditGameForm from '../../src/components/game/edit/EditGameForm';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';
import { Category } from '../../src/types/game';

interface NewGameSharedPageProps {
  allCategories: Category[];
}

const NewGameSharedPage: React.FC<NewGameSharedPageProps> = ({ allCategories }) => {
  const router = useRouter();
  const { user } = useAuth(); 

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      alert('You must be logged in to create a game.');
      return;
    }

    try {
      await axiosInstance.post('/gameshareds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Game created successfully!');
      router.push(`/studio/${user._id}`);
    } catch (error: any) {
      console.error('Error creating new game:', error);
      const message = error.response?.data?.message || 'Failed to create new game. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Game</h1>
      <EditGameForm 
        onSubmit={handleSubmit} 
        submitButtonText="Create Game" 
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

export default NewGameSharedPage;
