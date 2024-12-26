// pages/threads/collection.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';

// Import components
import HighlightedThread from '../../src/components/thread/highlightedthread';
import ThreadList from '../../src/components/thread/threadlist';
import Pagination from '../../src/components/index/pagination';
import Sort from '../../src/components/thread/sort';
import { ThreadData } from "../../src/types/thread";

const ITEMS_PER_PAGE = 4;

const ThreadCollection: React.FC<ThreadData> = () => {
  const [threads, setThreads] = useState<ThreadData[]>([]); 
  const [highlightedThread, setHighlightedThread] = useState<ThreadData | null>(null);
  const [filteredThreads, setFilteredThreads] = useState<ThreadData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('Latest');
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

        const data: ThreadData[] = response.data;

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from the backend.');
        }

        if (data.length === 0) {
          setThreads([]);
          setHighlightedThread(null);
          setFilteredThreads([]);
          return;
        }

        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const mostViewedThread = data.reduce((prev, current) =>
          prev.posts.length > current.posts.length ? prev : current
        );

        setHighlightedThread(mostViewedThread);

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

  const handleToggleFavorite = (threadId: string) => {
    setFilteredThreads((prev) =>
      prev.map((thread) =>
        thread._id === threadId ? { ...thread, favorited: !thread.favorited } : thread
      )
    );
  };

  const handleSortChange = (sortOption: string) => {
    let sortedThreads = [...threads];
  
    if (sortOption === 'Latest') {
      sortedThreads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'Most Views') {
      sortedThreads.sort((a, b) => b.views - a.views);
    } else if (sortOption === 'Most Replies') {
      sortedThreads.sort((a, b) => b.posts.length - a.posts.length);
    } else if (sortOption === 'Trending') {

    }

    setSortBy(sortOption);
    setFilteredThreads(sortedThreads);
    setCurrentPage(1); 
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(filteredThreads.length / ITEMS_PER_PAGE);

  const currentThreads = React.useMemo(() => {
    const indexOfLastThread = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstThread = indexOfLastThread - ITEMS_PER_PAGE;
    return filteredThreads.slice(indexOfFirstThread, indexOfLastThread);
  }, [filteredThreads, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading threads...</p>
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
        <p className="text-xl text-gray-700 dark:text-gray-300">No threads available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-12">
        {highlightedThread && <HighlightedThread thread={highlightedThread} />}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
              All Threads
            </h2>
            <Link href="/threads/newthread">
              <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Create New Thread
              </button>
            </Link>
          </div>
          <Sort sortBy={sortBy} onSortChange={handleSortChange} />
          <ThreadList threads={currentThreads} onToggleFavorite={handleToggleFavorite} />
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
