import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Comment, Reply } from '../../../types/post';
import { useAuth } from '../../../hooks/useAuth';
import { FiThumbsUp, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';

interface CommentsSectionProps {
  comments: Comment[];
  postId: string;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, postId }) => {
  const { token } = useAuth();
  const [editorContent, setEditorContent] = useState('');
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const [openReplyInput, setOpenReplyInput] = useState<string | null>(null);
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Adjust the number of comments per page as needed

  // Calculate total pages
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // Paginate comments
  const paginateComments = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editorContent, postId }),
      });
      if (response.ok) {
        setEditorContent('');
        // Optionally refresh comments
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    try {
      const response = await fetch(`/api/comments/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: replyContent[parentCommentId], parentCommentId }),
      });
      if (response.ok) {
        setReplyContent({ ...replyContent, [parentCommentId]: '' });
        setOpenReplyInput(null);
        // Optionally refresh replies for that comment
      } else {
        console.error('Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderActionButtons = (id: string, isReply: boolean = false) => (
    <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
      <button className="flex items-center hover:text-blue-500 transition-colors duration-200">
        <FiThumbsUp className="mr-1" />
        Like
      </button>
      <button
        onClick={() => setOpenReplyInput(openReplyInput === id ? null : id)}
        className="flex items-center hover:text-blue-500 transition-colors duration-200"
      >
        <FiMessageCircle className="mr-1" />
        Reply
      </button>
    </div>
  );

  const renderReplies = (replies: Reply[], parentId: string) => {
    return (
      <div className="mt-4">
        {replies.map((reply) => (
          <div
            key={reply._id}
            className="mb-8 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={reply.authorId?.profile?.avatarUrl || '/default-avatar.png'}
                  alt={reply.authorId?.username || 'Anonymous'}
                  className="w-10 h-10 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-700"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {reply.authorId?.username || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <FiMoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div
              className="prose dark:prose-dark text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: reply.content }}
            />

            {/* Actions */}
            {renderActionButtons(reply._id, true)}

            {/* Reply Input Form */}
            {openReplyInput === reply._id && (
              <div className="mt-4">
                <textarea
                  value={replyContent[reply._id] || ''}
                  onChange={(e) =>
                    setReplyContent({ ...replyContent, [reply._id]: e.target.value })
                  }
                  placeholder="Write a reply..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleReplySubmit(reply._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Submit Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderComments = () => {
    const paginatedComments = paginateComments();
    return paginatedComments.map((comment) => (
      <div
        key={comment._id}
        className="mb-8 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
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
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div
          className="prose dark:prose-dark text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />

        {/* Actions */}
        {renderActionButtons(comment._id)}

        {/* Reply Input Form */}
        {openReplyInput === comment._id && (
          <div className="mt-4">
            <textarea
              value={replyContent[comment._id] || ''}
              onChange={(e) =>
                setReplyContent({ ...replyContent, [comment._id]: e.target.value })
              }
              placeholder="Write a reply..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => handleReplySubmit(comment._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit Reply
              </button>
            </div>
          </div>
        )}

        {/* View Replies Button */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleReplies(comment._id)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors"
            >
              {openReplies[comment._id] ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
            </button>
            {openReplies[comment._id] && renderReplies(comment.replies, comment._id)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="mb-12 w-[90%] mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-left">
        Comments
      </h2>

      {/* Render Comments */}
      {renderComments()}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 ${
              currentPage === 1
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
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
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300 max-w-6xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Add a Comment</h3>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Write a comment..."
          modules={{
            toolbar: [
              [{ font: [] }],
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ script: 'sub' }, { script: 'super' }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          className="mb-4 dark:ql-container dark:bg-gray-800"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-colors duration-200"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
