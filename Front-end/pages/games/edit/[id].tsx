// pages/games/edit/[id].tsx
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import axiosInstance from '../../../src/utils/axiosInstance';
import EditGameForm from '../../../src/components/game/edit/EditGameForm';
import { GameData, Category } from '../../../src/types/game';
import { useRouter } from 'next/router';

interface EditPageProps {
  gameData: GameData;
  id: string;
  allCategories: Category[];
}

const EditPage: React.FC<EditPageProps> = ({ gameData, id, allCategories }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setPendingFormData(formData);
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    if (!pendingFormData) return;
    try {
      const res = await axiosInstance.patch(`/gameshareds/${id}`, pendingFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', res.data);
      alert('Game updated successfully!');
      router.push(`/studio/${gameData.uploadedBy._id}`);
    } catch (error: any) {
      console.error('Error updating game:', error.response?.data || error.message);
      alert('Failed to update game. Please try again.');
    } finally {
      setShowModal(false);
      setPendingFormData(null);
    }
  };

  const cancelUpdate = () => {
    setShowModal(false);
    setPendingFormData(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Game</h1>
      <EditGameForm 
        initialData={gameData} 
        onSubmit={handleSubmit} 
        submitButtonText="Update Game"
        allCategories={allCategories}
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Confirm Update</h2>
            <p className="text-gray-700 dark:text-gray-300">Are you sure you want to update this game?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelUpdate}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const [gameRes, categoriesRes] = await Promise.all([
      axiosInstance.get(`/gameshareds/${id}`),
      axiosInstance.get(`/categories`)
    ]);

    const gameData = gameRes.data;
    const allCategories = categoriesRes.data;

    return {
      props: {
        gameData,
        id,
        allCategories,
      },
    };
  } catch (error) {
    console.error('Error fetching game data or categories:', error);
    return {
      notFound: true,
    };
  }
};

export default EditPage;
