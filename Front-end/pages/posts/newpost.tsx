import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/utils/axiosInstance';
import EditPostForm from '../../src/components/post/edit/EditPostForm';
import { useAuth } from '../../src/hooks/useAuth';

interface ThreadData {
  _id: string;
  title: string;
  authorId: { _id: string, username: string };
  // add other thread fields as needed
}

interface NewPostPageProps {
  threadData: ThreadData | null;
  threadId: string | null;
}

const NewPostPage: React.FC<NewPostPageProps> = ({ threadData, threadId }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      await axiosInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully!');
      // After creation, redirect to the thread page or user studio
      if (threadData && threadData._id) {
        router.push(`/threads/${threadData._id}`);
      } else {
        router.push(`/studio/${user.id}`);
      }
    } catch (error: any) {
      console.error('Error creating new post:', error);
      const message = error.response?.data?.message || 'Failed to create new post. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Post</h1>

      {threadData && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Thread: {threadData.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">By: {threadData.authorId.username}</p>
        </div>
      )}

      <EditPostForm 
        onSubmit={handleSubmit} 
        submitButtonText="Create Post" 
        threadId={threadId || ''} // ensure we have a valid threadId here
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { threadId } = context.query;

  if (!threadId || typeof threadId !== 'string') {
    // No threadId provided, cannot create a post
    return {
      props: {
        threadData: null,
        threadId: null,
      },
    };
  }

  try {
    const threadRes = await axiosInstance.get(`/threads/${threadId}`);
    const threadData = threadRes.data;

    return {
      props: {
        threadData,
        threadId,
      },
    };
  } catch (error) {
    console.error('Error fetching thread data:', error);
    return {
      props: {
        threadData: null,
        threadId,
      },
    };
  }
};

export default NewPostPage;
