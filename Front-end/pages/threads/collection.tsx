// pages/threads/index.tsx

import React, { useState } from 'react';
import HighlightedThread from '../../src/components/thread/highlightedthread';
import ThreadList from '../../src/components/thread/threadlist';
import Pagination from '../../src/components/thread/pagination';

interface Category {
  _id: string;
  name: string;
}

interface Author {
  username: string;
  _id: string;
  avatar: string;
}

interface Thread {
  _id: string;
  title: string;
  category: Category;
  author: Author;
  replies: number;
  views: number;
  lastActivity?: string;
  excerpt?: string;
}

const ThreadPage: React.FC = () => {
  // Fake data
  const categories = [
    { _id: '1', name: 'All' },
    { _id: '2', name: 'Game Development' },
    { _id: '3', name: 'AI Tools' },
    { _id: '4', name: 'Coding Help' },
    { _id: '5', name: 'Design' },
    { _id: '6', name: 'Gameplay Feedback' },
  ];

  const allThreads: Thread[] = [
    {
      _id: '1',
      title: 'How to debug in Unity',
      category: { _id: '4', name: 'Coding Help' },
      author: {
        username: 'devDude',
        _id: 'user1',
        avatar: 'https://img.freepik.com/premium-vector/pixel-art-merchant-character-retro-game-avatar-with-beard-turban_1292377-15124.jpg',
      },
      replies: 45,
      views: 1200,
      lastActivity: '1 hour ago',
    },
    {
      _id: '2',
      title: 'Storyline Ideas for RPG Games',
      category: { _id: '5', name: 'Design' },
      author: {
        username: 'storyCrafter',
        _id: 'user2',
        avatar: 'https://img.freepik.com/premium-vector/pixel-art-merchant-character-retro-game-avatar-with-beard-turban_1292377-15124.jpg',
      },
      replies: 37,
      views: 980,
      lastActivity: '3 hours ago',
    },
    {
      _id: '3',
      title: 'Best Development Tools for Beginners',
      category: { _id: '2', name: 'Game Development' },
      author: {
        username: 'toolMaster',
        _id: 'user3',
        avatar: 'https://img.freepik.com/premium-vector/pixel-art-merchant-character-retro-game-avatar-with-beard-turban_1292377-15124.jpg',
      },
      replies: 29,
      views: 850,
      lastActivity: '5 hours ago',
    },
    {
      _id: '4',
      title: 'Advice for New Game Developers',
      category: { _id: '2', name: 'Game Development' },
      author: {
        username: 'newbieHelper',
        _id: 'user4',
        avatar: 'https://img.freepik.com/premium-vector/pixel-art-merchant-character-retro-game-avatar-with-beard-turban_1292377-15124.jpg',
      },
      replies: 24,
      views: 920,
      lastActivity: '7 hours ago',
    },
  ];

  const highlightedThread: Thread = {
    _id: '5',
    title: 'Tips on Managing Large Projects',
    category: { _id: '7', name: 'Project Management' },
    author: {
      username: 'projectGuru',
      _id: 'user5',
      avatar: 'https://img.freepik.com/premium-vector/pixel-art-merchant-character-retro-game-avatar-with-beard-turban_1292377-15124.jpg',
    },
    replies: 105,
    views: 5500,
    excerpt:
      'Looking for advice on handling larger projects with multiple developers? Join the discussion to share best practices and insights!',
  };

  const [threads, setThreads] = useState(allThreads);
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Sorting logic
  const handleSortChange = (sortOption: string) => {
    let sortedThreads = [...threads];
    if (sortOption === 'Most Replies') {
      sortedThreads.sort((a, b) => b.replies - a.replies);
    } else if (sortOption === 'Most Views') {
      sortedThreads.sort((a, b) => b.views - a.views);
    } else if (sortOption === 'Trending') {
      // Implement trending logic if needed
    } else {
      // Latest
      // Assuming lastActivity is a timestamp in real data
    }
    setSortBy(sortOption);
    setThreads(sortedThreads);
  };

  // Pagination logic
  const totalPages = Math.ceil(threads.length / ITEMS_PER_PAGE);
  const indexOfLastThread = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstThread = indexOfLastThread - ITEMS_PER_PAGE;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Category Filtering Logic
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === '1') {
      setThreads(allThreads);
    } else {
      const filtered = allThreads.filter(
        (thread) => thread.category._id === categoryId
      );
      setThreads(filtered);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <HighlightedThread thread={highlightedThread} />
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
              All Threads
            </h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Create New Thread
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <label
                htmlFor="sort-by"
                className="mr-2 text-gray-700 dark:text-gray-300"
              >
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Latest">Latest</option>
                <option value="Most Replies">Most Replies</option>
                <option value="Most Views">Most Views</option>
                <option value="Trending">Trending</option>
              </select>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="category"
                className="mr-2 text-gray-700 dark:text-gray-300"
              >
                Categories:
              </label>
              <select
                id="category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ThreadList threads={currentThreads} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default ThreadPage;
