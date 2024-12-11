import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import axiosInstance from '../../../src/utils/axiosInstance';
import EditThreadForm from '../../../src/components/thread/edit/EditThreadForm';
import { useRouter } from 'next/router';

interface ThreadData {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  fileUrl?: string;
  images?: string[];
  authorId: {
    _id: string;
    username: string;
  };
}

interface EditThreadPageProps {
  threadData: ThreadData;
  id: string;
}

const EditThreadPage: React.FC<EditThreadPageProps> = ({ threadData, id }) => {
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
      const res = await axiosInstance.patch(`/threads/${id}`, pendingFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', res.data);
      alert('Thread updated successfully!');
      router.push(`/studio/${threadData.authorId._id}`);
    } catch (error: any) {
      console.error('Error updating thread:', error.response?.data || error.message);
      alert('Failed to update thread. Please try again.');
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
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Thread</h1>
      <EditThreadForm 
        initialData={threadData} 
        onSubmit={handleSubmit} 
        submitButtonText="Update Thread"
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Confirm Update</h2>
            <p className="text-gray-700 dark:text-gray-300">Are you sure you want to update this thread?</p>
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
    const threadRes = await axiosInstance.get(`/threads/${id}`);
    const threadData = threadRes.data;
    return {
      props: {
        threadData,
        id,
      },
    };
  } catch (error) {
    console.error('Error fetching thread data:', error);
    return {
      notFound: true,
    };
  }
};

export default EditThreadPage;
