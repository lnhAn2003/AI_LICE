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
      <h3 className="text-xl font-semibold text-center mb-4">Recent Activity and Contributions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Threads Section */}
        <div className="border border-black p-3 rounded shadow-sm w-full md:col-span-1 text-left">
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
        <div className="border border-black p-3 rounded shadow-sm w-full md:col-span-1 text-left">
          <h4 className="font-semibold mb-2">Posts</h4>
          {posts.length > 0 ? (
            <>
              {posts.slice(0, showAllPosts ? posts.length : 3).map((post) => (
                <div key={post._id} className="mb-2">
                  <p>
                    <strong>{post.action}</strong> "{post.content}"
                  </p>
                  <p>
                    on <strong>"{post.threadTitle}"</strong>
                  </p>
                  <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              {posts.length > 3 && (
                <button
                  onClick={() => setShowAllPosts(!showAllPosts)}
                  className="text-blue-500 hover:underline mt-2"
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
        <div className="border border-black p-3 rounded shadow-sm w-full md:col-span-2 text-left">
          <h4 className="font-semibold mb-2">Games Shared</h4>
          {games.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {games.map((game) => (
                <div key={game._id || game.title} className="w-full md:w-1/2 px-2 mb-4">
                  <div className="p-4 border border-black rounded shadow-md bg-white flex flex-col h-full">
                    <h5 className="text-lg font-bold">
                      {game.title} {game.newRelease && <span className="text-sm text-green-500">(New!)</span>}
                    </h5>
                    <p className="text-gray-700 mb-2 flex-grow">{game.description}</p>
                    {game.images && game.images.length > 0 && (
                      <div className="flex items-center space-x-4 mb-2">
                        <img
                          src={game.images[0]}
                          alt={game.title}
                          className="w-20 h-20 rounded"
                        />
                        <div>
                          <p className="text-sm text-gray-600">
                            {new Date(game.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">Version: {game.version}</p>
                          <p className="text-sm text-gray-600">
                            Downloads: {game.downloadCount} | Views: {game.viewCount}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mb-2">
                      <strong>Tags:</strong> {game.tags?.join(', ') || 'No tags available'}
                    </div>
                    <div className="mb-2">
                      <strong>Categories:</strong> {game.categories?.join(', ') || 'No categories available'}
                    </div>
                    <div className="mb-2 flex-grow">
                      <strong>External Links:</strong>
                      <ul className="list-disc list-inside">
                        {game.externalLinks?.map((link) => (
                          <li key={link._id}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {game.changelog && game.changelog.length > 0 && (
                      <div className="mb-2">
                        <strong>Changelog:</strong>
                        <ul className="list-disc list-inside">
                          {game.changelog.map((change) => (
                            <li key={change._id || change.date.toString()}>
                              {new Date(change.date).toLocaleDateString()}: {change.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <a
                      href={game.fileUrl}
                      download
                      className="mt-auto inline-block bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Download Game
                    </a>
                  </div>
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
