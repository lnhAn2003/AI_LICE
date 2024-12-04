// pages/posts/details/[id].tsx
import { NextPage } from 'next';
import PostDetail from '../../../src/components/post/detail/postdetail';
import { PostData } from '../../../src/types/post';

interface PostDetailPageProps {
  post: PostData;
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ post }) => {
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Post details could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen ">
      <main className="max-w-7xl mx-auto p-6">
        <PostDetail post={post} />
      </main>
    </div>
  );
};

export default PostDetailPage;

export { getPostDetailsServerSideProps as getServerSideProps } from '../../../src/serverside/posts.serverside';
