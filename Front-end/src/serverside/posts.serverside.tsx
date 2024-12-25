import { GetServerSideProps } from 'next';
import axiosInstance from '../utils/axiosInstance';
import { parse } from 'cookie';

export const getPostDetailsServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const postId = params?.id;

    if (!postId) {
      return {
        notFound: true,
      };
    }

    const response = await axiosInstance.get(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const postData = response.data;

    const post = {
      _id: postData._id || '',
      threadId: postData.threadId
        ? {
            isPinned: postData.threadId.isPinned || false,
            _id: postData.threadId._id || '',
            title: postData.threadId.title || 'Untitled Thread',
            authorId: {
              profile: {
                avatarUrl: postData.threadId.authorId?.profile?.avatarUrl || '',
              },
              _id: postData.threadId.authorId?._id || '',
              username: postData.threadId.authorId?.username || 'Anonymous',
            },
            tags: postData.threadId.tags || [],
            content: postData.threadId.content || 'No content available',
            posts: postData.threadId.posts || [],
            createdAt: postData.threadId.createdAt || null,
            updatedAt: postData.threadId.updatedAt || null,
            views: postData.threadId.views || 0,
            isVisible: postData.threadId.isVisible || false,
          }
        : null,
      authorId: {
        _id: postData.authorId?._id || '',
        username: postData.authorId?.username || 'Anonymous',
        profile: {
          avatarUrl: postData.authorId?.profile.avatarUrl || '/default-avatar.png',
        },
      },
      content: postData.content || 'No content available',
      images: postData.images || [],
      fileUrl: postData.fileUrl || [],
      comments: postData.comments.map((comment: any) => ({
        _id: comment._id || '',
        authorId: {
          _id: comment.authorId?._id || '',
          username: comment.authorId?.username || 'Anonymous',
          profile: {
            avatarUrl: comment.authorId?.profile?.avatarUrl || '/default-avatar.png',
          },
        },
        date: comment.date || '',
        content: comment.content || 'No content available',
        createdAt: comment.createdAt || null,
        replies: comment.replies || [],
      })),
      createdAt: postData.createdAt || null,
      updatedAt: postData.updatedAt || null,
      isEdited: postData.isEdited || false,
      editHistory: postData.editHistory.map((edit: any) => ({
        content: edit.content || '',
        editedAt: edit.editedAt || null,
      })),
    };

    return {
      props: {
        post,
      },
    };
  } catch (error: any) {
    console.error('Error fetching post data:', error.response?.data || error.message);

    if (error.response?.status === 404) {
      return { notFound: true };
    }

    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
