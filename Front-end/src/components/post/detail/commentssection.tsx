// src/components/post/detail/commentssection.tsx

import React, { useState, useEffect } from 'react';
import { Comment, Reply } from '../../../types/post';
import { useAuth } from '../../../hooks/useAuth';
import { FiThumbsUp, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import axiosInstance from '../../../utils/axiosInstance';

interface CommentsSectionProps {
  comments: Comment[];
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, postId }) => {
  const { user, token } = useAuth();
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [newComment, setNewComment] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // State for managing replies
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const [openReplyInput, setOpenReplyInput] = useState<string | null>(null);
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);

      // Generate previews
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const removeSelectedImage = (index: number) => {
    const newImagesArray = [...selectedImages];
    const newPreviewsArray = [...imagePreviews];
    newImagesArray.splice(index, 1);
    newPreviewsArray.splice(index, 1);
    setSelectedImages(newImagesArray);
    setImagePreviews(newPreviewsArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!user) {
      setFormError('You must be logged in to comment.');
      return;
    }

    if (newComment.trim() === '') {
      setFormError('Comment cannot be empty.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('targetType', 'Post'); // Ensuring it's a Post
    formData.append('targetId', postId);
    formData.append('content', newComment.trim());

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      const response = await axiosInstance.post('/comments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const createdComment: Comment = response.data;

      setCurrentComments([createdComment, ...currentComments]);

      setNewComment('');
      setSelectedFile(null);
      setSelectedImages([]);
      setImagePreviews([]);
    } catch (error: any) {
      console.error('Error creating comment:', error);
      if (error.response?.data?.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError('Failed to create comment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    const content = replyContent[parentCommentId];
    if (!content || content.trim() === '') {
      setFormError('Reply cannot be empty.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('targetType', 'Post');
      formData.append('targetId', postId);
      formData.append('content', content.trim());
      formData.append('parentCommentId', parentCommentId);

      const response = await axiosInstance.post('/comments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const createdReply: Reply = response.data;

      setCurrentComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === parentCommentId) {
            return {
              ...comment,
              replies: comment.replies ? [createdReply, ...comment.replies] : [createdReply],
            };
          }
          return comment;
        })
      );

      // Clear the reply input
      setReplyContent({ ...replyContent, [parentCommentId]: '' });
      setOpenReplyInput(null);
    } catch (error: any) {
      console.error('Error creating reply:', error);
      if (error.response?.data?.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError('Failed to create reply. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderActionButtons = (commentId: string, isReply: boolean = false) => (
    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
      <button className="flex items-center hover:text-blue-500 transition-colors duration-200">
        <FiThumbsUp className="mr-1" />
        Like
      </button>
      <button
        onClick={() => setOpenReplyInput(openReplyInput === commentId ? null : commentId)}
        className="flex items-center hover:text-blue-500 transition-colors duration-200"
      >
        <FiMessageCircle className="mr-1" />
        Reply
      </button>
    </div>
  );

  const renderReplies = (replies: Reply[], parentId: string) => {
    return (
      <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-gray-700">
        {replies.map((reply) => (
          <div key={reply._id} className="mb-6">
            {/* Reply Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={reply.authorId?.profile?.avatarUrl || '/default-avatar.png'}
                  alt={reply.authorId?.username || 'Anonymous'}
                  className="w-8 h-8 rounded-full mr-3 border-2 border-gray-300 dark:border-gray-700"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {reply.authorId?.username || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(reply.createdAt).toLocaleDateString()} at{' '}
                    {new Date(reply.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <FiMoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Reply Content */}
            <div className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {reply.content}
            </div>

            {/* Action Buttons */}
            {renderActionButtons(reply._id, true)}
          </div>
        ))}
      </div>
    );
  };

  const renderComments = () => {
    return currentComments.map((comment) => (
      <div key={comment._id} className="mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full">
        {/* Comment Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={comment.authorId.profile?.avatarUrl || '/default-avatar.png'}
              alt={comment.authorId.username}
              className="w-10 h-10 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-700"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {comment.authorId.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                {new Date(comment.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Comment Content */}
        <div className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {comment.content}
        </div>

        {/* Action Buttons */}
        {renderActionButtons(comment._id)}

        {/* Reply Input Form */}
        {openReplyInput === comment._id && (
          <div className="mt-4">
            <label
              htmlFor={`reply-${comment._id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Write a reply:
            </label>
            <textarea
              id={`reply-${comment._id}`}
              value={replyContent[comment._id] || ''}
              onChange={(e) => setReplyContent({ ...replyContent, [comment._id]: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
              placeholder="Type your reply here..."
            />
            {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
            <div className="flex space-x-4 mt-2 justify-end">
              <button
                onClick={() => handleReplySubmit(comment._id)}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Reply'}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                onClick={() => {
                  setOpenReplyInput(null);
                  setReplyContent({ ...replyContent, [comment._id]: '' });
                  setFormError(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Replies Section */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleReplies(comment._id)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors duration-200"
            >
              {openReplies[comment._id] ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
            </button>
            {openReplies[comment._id] && renderReplies(comment.replies, comment._id)}
          </div>
        )}
      </div>
    ));
  };

  // Pagination (if needed)
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const totalPages = Math.ceil(currentComments.length / commentsPerPage);

  const paginateComments = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    return currentComments.slice(startIndex, endIndex);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-12">
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12">
        Comments
      </h2>

      {/* Render Comments */}
      {paginateComments().map((comment) => (
        <div key={comment._id} className="mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full">
          {/* Comment Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={comment.authorId.profile?.avatarUrl || '/default-avatar.png'}
                alt={comment.authorId.username}
                className="w-10 h-10 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-700"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {comment.authorId.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
              <FiMoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Comment Content */}
          <div className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* Action Buttons */}
          {renderActionButtons(comment._id)}

          {/* Reply Input Form */}
          {openReplyInput === comment._id && (
            <div className="mt-4">
              <label
                htmlFor={`reply-${comment._id}`}
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Write a reply:
              </label>
              <textarea
                id={`reply-${comment._id}`}
                value={replyContent[comment._id] || ''}
                onChange={(e) => setReplyContent({ ...replyContent, [comment._id]: e.target.value })}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
                placeholder="Type your reply here..."
              />
              {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
              <div className="flex space-x-4 mt-2 justify-end">
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                  onClick={() => {
                    setOpenReplyInput(null);
                    setReplyContent({ ...replyContent, [comment._id]: '' });
                    setFormError(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Replies Section */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => toggleReplies(comment._id)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors duration-200"
              >
                {openReplies[comment._id] ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
              </button>
              {openReplies[comment._id] && renderReplies(comment.replies, comment._id)}
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls (if needed) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 ${
              currentPage === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            } rounded`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 ${
              currentPage === totalPages
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } rounded`}
          >
            Next
          </button>
        </div>
      )}

      {/* Add Comment Form */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300 w-full mt-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add a Comment</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-comment" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Your Comment:
          </label>
          <textarea
            id="new-comment"
            value={newComment}
            onChange={handleNewCommentChange}
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
            placeholder="Type your comment here..."
          />

          {/* Attach File */}
          <div className="mt-6">
            <label htmlFor="attach-file" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Attach File (optional):
            </label>
            <input
              type="file"
              id="attach-file"
              className="w-full text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              onChange={handleFileChange}
            />
          </div>

          {/* Attach Images */}
          <div className="mt-6">
            <label htmlFor="attach-images" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Attach Images (optional):
            </label>
            <input
              type="file"
              id="attach-images"
              accept="image/*"
              multiple
              className="w-full text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              onChange={handleImagesChange}
            />
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-70 hover:opacity-100 focus:outline-none"
                      onClick={() => removeSelectedImage(idx)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {formError && <p className="text-red-500 text-sm mt-4">{formError}</p>}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              onClick={() => {
                setNewComment('');
                setSelectedFile(null);
                setSelectedImages([]);
                setImagePreviews([]);
                setFormError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;
