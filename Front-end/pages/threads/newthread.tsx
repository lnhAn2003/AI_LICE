import React from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/utils/axiosInstance';
import EditThreadForm from '../../src/components/thread/edit/EditThreadForm';
import { useAuth } from '../../src/hooks/useAuth';

const NewThreadPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      alert('You must be logged in to create a thread.');
      return;
    }

    try {
      await axiosInstance.post('/threads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Thread created successfully!');
      router.push(`/studio/${user._id}`);
    } catch (error: any) {
      console.error('Error creating new thread:', error);
      const message = error.response?.data?.message || 'Failed to create new thread. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Thread</h1>
      <EditThreadForm onSubmit={handleSubmit} submitButtonText="Create Thread" />
    </div>
  );
};

export default NewThreadPage;
