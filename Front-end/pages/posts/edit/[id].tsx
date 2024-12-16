import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import axiosInstance from '../../../src/utils/axiosInstance';
import EditPostForm from '../../../src/components/post/edit/EditPostForm';
import { useRouter } from 'next/router';

interface PostData {
  _id: string;
  content: string;
  fileUrl?: string;
  images?: string[];
  threadId: {
    _id: string;
    title: string;
    authorId: {
      _id: string;
      username: string;
    };
  };
  authorId: {
    _id: string;
    username: string;
  };
}

interface EditPostPageProps {
  postData: PostData;
  id: string;
}

const EditPostPage: React.FC<EditPostPageProps> = ({ postData, id }) => {
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
      const res = await axiosInstance.patch(`/posts/${id}`, pendingFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', res.data);
      alert('Post updated successfully!');
      router.push(`/threads/${postData.threadId._id}`);
    } catch (error: any) {
      console.error('Error updating post:', error.response?.data || error.message);
      alert('Failed to update post. Please try again.');
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
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Post</h1>
      
      {postData.threadId && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Thread: {postData.threadId.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">By: {postData.threadId.authorId.username}</p>
        </div>
      )}

      <EditPostForm 
        initialData={postData} 
        onSubmit={handleSubmit} 
        submitButtonText="Update Post" 
        threadId={postData.threadId._id}
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Confirm Update</h2>
            <p className="text-gray-700 dark:text-gray-300">Are you sure you want to update this post?</p>
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
    const postRes = await axiosInstance.get(`/posts/${id}`);
    const postData = postRes.data;

    return {
      props: {
        postData,
        id,
      },
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return {
      notFound: true,
    };
  }
};

export default EditPostPage;
