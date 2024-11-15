// src/components/profile/RecentActivity.tsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

interface Thread {
  _id: string;
  title: string;
  createdAt: string;
}

interface Post {
  _id: string;
  action: string;
  threadTitle: string;
  content: string;
  createdAt: string;
}

interface Game {
  _id: string;
  title: string;
  description: string;
  images?: string[];
  fileUrl: string;
  externalLinks: { name: string; url: string; _id: string }[];
  createdAt: string;
  downloadCount: number;
  viewCount: number;
  tags?: string[];
  categories?: string[];
  averageRating: number;
  version: string;
  newRelease: boolean;
  changelog?: { date: string; description: string; _id: string }[];
}

interface RecentActivityProps {
  userId: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ userId }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    console.log('Fetching activity for User ID:', userId);

    const fetchActivity = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}/activity`);
        const { threads, posts, games } = response.data;
        setThreads(threads || []);
        setPosts(posts || []);
        setGames(games || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user activity:', error);
        setLoading(false);
      }
    };

    fetchActivity();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity and Contributions</h3>
      <div className="space-y-6">
        {/* Threads Section */}
        <div>
          <h4 className="font-semibold mb-2">Threads</h4>
          {threads.length > 0 ? (
            <div className="space-y-2">
              {threads.map((thread) => (
                <div key={thread._id} className="p-4 bg-white rounded-lg shadow">
                  <p className="font-semibold">{thread.title}</p>
                  <p className="text-gray-600">Date Created: {new Date(thread.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent threads available.</p>
          )}
        </div>

        {/* Posts Section */}
        <div>
          <h4 className="font-semibold mb-2">Posts</h4>
          {posts.length > 0 ? (
            <>
              <div className="space-y-2">
                {posts.slice(0, showAllPosts ? posts.length : 3).map((post) => (
                  <div key={post._id} className="p-4 bg-white rounded-lg shadow">
                    <p>
                      <strong>{post.action}</strong> "{post.content}"
                    </p>
                    <p>
                      on <strong>"{post.threadTitle}"</strong>
                    </p>
                    <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              {posts.length > 3 && (
                <button
                  onClick={() => setShowAllPosts(!showAllPosts)}
                  className="text-secondary hover:underline mt-2"
                >
                  {showAllPosts ? 'Show Less' : 'Show More'}
                </button>
              )}
            </>
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>

        {/* Games Shared Section */}
        <div>
          <h4 className="font-semibold mb-2">Games Shared</h4>
          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <div key={game._id || game.title} className="p-4 bg-white rounded-lg shadow-lg flex flex-col">
                  <h5 className="text-lg font-bold mb-2">
                    {game.title} {game.newRelease && <span className="text-sm text-green-500">(New!)</span>}
                  </h5>
                  {game.images && game.images.length > 0 && (
                    <img
                      src={game.images[0]}
                      alt={game.title}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  )}
                  <p className="text-gray-700 mb-2 flex-grow">{game.description}</p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Version: {game.version}</p>
                    <p>
                      Downloads: {game.downloadCount} | Views: {game.viewCount}
                    </p>
                    <p>Published on: {new Date(game.createdAt).toLocaleDateString()}</p>
                  </div>
                  <a
                    href={game.fileUrl}
                    download
                    className="mt-auto inline-block bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark text-center"
                  >
                    Download Game
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No games shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
