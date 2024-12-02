import React from "react";

const threaddetail = ({ thread }: { thread: any }) => {
  return (
    <div className="bg-neutral shadow-lg rounded-lg p-6">
      {/* Thread Title */}
      <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>

      {/* Thread Metadata */}
      <div className="text-sm text-gray-600 mb-4">
        <span>Category: {thread.tags?.join(", ")}</span> |{" "}
        <span>Author: {thread.authorId.username}</span> |{" "}
        <span>Date Posted: {new Date(thread.createdAt).toLocaleDateString()}</span>{" "}
        | <span>Views: {thread.views}</span>
      </div>

      {/* Thread Description */}
      <div className="mb-6">
        <p className="text-gray-800">{thread.content}</p>
      </div>

      {/* Author Information */}
      <div className="flex items-center mb-6">
        <img
          src={thread.authorId.profile.avatarUrl}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <span className="text-lg font-medium">{thread.authorId.username}</span>
      </div>

      {/* Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts in this Thread</h2>
        {thread.posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-white shadow rounded-lg p-4 mb-4 border"
          >
            <div className="text-sm text-gray-500 mb-2">
              <span>Author: {post.author}</span> |{" "}
              <span>Date Posted: {new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex space-x-4 text-sm text-gray-600">
              <button className="hover:text-primary">Like</button>
              <button className="hover:text-primary">Reply</button>
              <button className="hover:text-primary">Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default threaddetail;
