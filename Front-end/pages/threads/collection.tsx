import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';

// Import components
import HighlightedThread from '../../src/components/thread/highlightedthread';
import ThreadList from '../../src/components/thread/threadlist';
import Pagination from '../../src/components/thread/pagination';
import Sort from '../../src/components/thread/sort';

interface Author {
  _id: string;
  username: string;
  profile: {
    avatarUrl: string;
  };
}

interface Thread {
  _id: string;
  title: string;
  tags: string[];
  authorId: Author;
  replies: number;
  views: number;
  excerpt?: string;
}

const ITEMS_PER_PAGE = 4;

const ThreadCollection: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [highlightedThread, setHighlightedThread] = useState<Thread | null>(null);
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [sortBy, setSortBy] = useState<string>('Latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/threads', {
          headers: {
            Authorization: `Bearer ${getTokenFromCookies()}`,
          },
        });

        const data: Thread[] = response.data;

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from the backend.');
        }

        if (data.length === 0) {
          setThreads([]);
          setHighlightedThread(null);
          setFilteredThreads([]);
          return;
        }

        // Determine the highlighted thread (e.g., most viewed)
        const mostViewedThread = data.reduce((prev, current) =>
          prev.views > current.views ? prev : current
        );

        setHighlightedThread(mostViewedThread);

        // Exclude the highlighted thread from the main thread list
        const otherThreads = data.filter((thread) => thread._id !== mostViewedThread._id);

        setThreads(otherThreads);
        setFilteredThreads(otherThreads);
      } catch (err: any) {
        console.error('Error fetching threads:', err);
        setError('Failed to load threads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const getTokenFromCookies = (): string => {
    if (typeof window !== 'undefined') {
      const matches = document.cookie.match(new RegExp('(?:^|; )token=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : '';
    }
    return '';
  };

  const handleSortChange = (sortOption: string) => {
    let sortedThreads = [...threads];
    if (sortOption === 'Most Replies') {
      sortedThreads.sort((a, b) => b.replies - a.replies);
    } else if (sortOption === 'Most Views') {
      sortedThreads.sort((a, b) => b.views - a.views);
    } else if (sortOption === 'Trending') {
      // Implement trending logic if needed
    }
    setSortBy(sortOption);
    setFilteredThreads(sortedThreads);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredThreads.length / ITEMS_PER_PAGE);

  // Get threads for current page
  const indexOfLastThread = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstThread = indexOfLastThread - ITEMS_PER_PAGE;
  const currentThreads = filteredThreads.slice(indexOfFirstThread, indexOfLastThread);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700">Loading threads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (threads.length === 0 && !highlightedThread) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700">No threads available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        {highlightedThread && <HighlightedThread thread={highlightedThread} />}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
              All Threads
            </h2>
            <Link className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors" href="/threads/create">
                Create New Thread
            </Link>
          </div>
          <Sort sortBy={sortBy} onSortChange={handleSortChange} />
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

export default ThreadCollection;
