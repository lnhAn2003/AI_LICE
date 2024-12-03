// pages/threads/details/[id].tsx
import { NextPage } from "next";
import ThreadDetail from "../../../src/components/thread/detail/threaddetail";
import { ThreadData } from "../../../src/types/thread";

interface ThreadDetailPageProps {
  thread: ThreadData;
}

const ThreadDetailPage: NextPage<ThreadDetailPageProps> = ({ thread }) => {
  if (!thread) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Thread details could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen ">
      <main className="max-w-7xl mx-auto p-6">
        <ThreadDetail thread={thread} />
      </main>
    </div>
  );
};

export default ThreadDetailPage;

export { getThreadDetailsServerSideProps as getServerSideProps } from "../../../src/serverside/threads.serverside";
