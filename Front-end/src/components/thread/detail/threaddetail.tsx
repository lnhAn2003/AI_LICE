// src/components/thread/detail/threaddetail.tsx
import React from "react";
import ThreadInfo from "./threadinfo";
import PostsSection from "./postsection";
import { ThreadData } from "../../../types/thread";

const ThreadDetail: React.FC<{ thread: ThreadData }> = ({ thread }) => {
  return (
    <div className="bg-neutral-100 dark:bg-gray-900 shadow-lg rounded-xl p-6 ">
      {/* Thread Information */}
      <ThreadInfo thread={thread} />

      {/* Posts Section */}
      <PostsSection posts={thread.posts} threadId={thread._id} />
    </div>
  );
};

export default ThreadDetail;
