// src/components/post/detail/PostDetail.tsx
import React from 'react';
import PostInfo from './postinfo';
import CommentsSection from './commentssection';
import { PostData } from '../../../types/post';

interface PostDetailProps {
  post: PostData;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div className="bg-neutral-100 dark:bg-gray-900 shadow-lg rounded-xl p-6 ">
      {/* Post Information */}
      <PostInfo post={post} />

      {/* Comments Section */}
      <CommentsSection comments={post.comments} postId={post._id} />
    </div>
  );
};

export default PostDetail;
