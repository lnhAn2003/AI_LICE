import React from 'react';

interface Thread {
  _id: string;
  title: string;
  createdAt: string;
}

interface Post {
  _id: string;
  action: string; // Có thể là "replied", "commented", v.v.
  threadTitle: string;
  createdAt: string;
}

interface Game {
  _id: string;
  title: string;
  sharedOn: string;
  createdAt: string;
}

interface RecentActivityProps {
  threads?: Thread[];
  posts?: Post[];
  games?: Game[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ threads = [], posts = [], games = [] }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-center mb-4">Recent Activity and Contributions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Threads Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-1 text-left">
          <h4 className="font-semibold mb-2">Threads</h4>
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div key={thread._id} className="mb-2">
                <p className="font-semibold">{thread.title}</p>
                <p className="text-gray-600">Date Created: {new Date(thread.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No recent threads available.</p>
          )}
        </div>

        {/* Posts Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-1 text-left">
          <h4 className="font-semibold mb-2">Posts</h4>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="mb-2">
                <p>
                  <strong>{post.action}</strong> on "{post.threadTitle}"
                </p>
                <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>

        {/* Games Shared Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-2 text-left">
          <h4 className="font-semibold mb-2">Games Shared</h4>
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game._id} className="mb-2">
                <p className="font-semibold">{game.title}</p>
                <p className="text-gray-600">Shared On: {new Date(game.sharedOn).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No games shared yet.</p>
          )}
        </div>

        {/* Placeholder for Courses Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-2 text-left">
          <h4 className="font-semibold mb-2">Courses</h4>
          <p>Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
