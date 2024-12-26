// pages/studio/[id].tsx
import { NextPage } from 'next';
import { MyStudioData } from '../../src/types/studio';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';
import router from 'next/router';

interface AddSectionModalProps {
  courseId: string;
  onClose: () => void;
  onSectionCreated?: () => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  courseId,
  onClose,
  onSectionCreated,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    payload.courseId = courseId;

    try {
      await axiosInstance.post('/sections', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Section added successfully!');
      onClose();
      onSectionCreated?.();
    } catch (error: any) {
      console.error('Error adding section:', error);
      alert('Failed to add section. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add New Section
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Section Title
          </label>
          <input
            name="sectionTitle"
            required
            className="block w-full border border-gray-300 dark:border-gray-700 px-2 py-1 mb-4 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AddLessonModalProps {
  sectionId: string;
  onClose: () => void;
  onLessonCreated: () => void;
}

const AddLessonModal: React.FC<AddLessonModalProps> = ({
  sectionId,
  onClose,
  onLessonCreated,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    payload.sectionId = sectionId;

    try {
      await axiosInstance.post('/lessons', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Lesson added successfully!');
      onLessonCreated();
      onClose();
    } catch (error: any) {
      console.error('Error adding lesson:', error);
      alert('Failed to add lesson. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add New Lesson
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Lesson Title
          </label>
          <input
            name="title"
            required
            className="block w-full border border-gray-300 dark:border-gray-700 px-2 py-1 mb-4 rounded"
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Video URL
          </label>
          <input
            name="videoUrl"
            className="block w-full border border-gray-300 dark:border-gray-700 px-2 py-1 mb-4 rounded"
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Text Content
          </label>
          <textarea
            name="textContent"
            className="block w-full border border-gray-300 dark:border-gray-700 px-2 py-1 mb-4 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ManageSectionsModalProps {
  courseId: string;
  onClose: () => void;
}

const ManageSectionsModal: React.FC<ManageSectionsModalProps> = ({
  courseId,
  onClose,
}) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/sections/course/${courseId}`);
        setSections(res.data || []);
      } catch (error: any) {
        console.error('Error fetching sections:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  const openAddLessonModal = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setShowAddLessonModal(true);
  };

  const closeAddLessonModal = () => {
    setShowAddLessonModal(false);
    setCurrentSectionId(null);
  };

  const handleLessonCreated = () => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/sections/course/${courseId}`);
        setSections(res.data || []);
      } catch (error: any) {
        console.error('Error re-fetching sections:', error);
      }
    })();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 dark:text-gray-100"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Manage Sections
        </h2>
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading sections...</p>
        ) : sections.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No sections found for this course.
          </p>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2">
            {sections.map((section) => (
              <div
                key={section._id}
                className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {section.sectionTitle}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {section.lessons && section.lessons.length > 0 ? (
                    section.lessons.map((lesson: any) => (
                      <div key={lesson._id} className="border-b last:border-b-0 py-1">
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                    ))
                  ) : (
                    <p className="italic">No lessons in this section.</p>
                  )}
                </div>
                <button
                  className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
                  onClick={() => openAddLessonModal(section._id)}
                >
                  Add Lesson
                </button>
              </div>
            ))}
          </div>
        )}
        {showAddLessonModal && currentSectionId && (
          <AddLessonModal
            sectionId={currentSectionId}
            onClose={closeAddLessonModal}
            onLessonCreated={handleLessonCreated}
          />
        )}
      </div>
    </div>
  );
};

interface StudioPageProps {
  studioData: MyStudioData;
}

const MyStudioPage: NextPage<StudioPageProps> = ({ studioData }) => {
  if (!studioData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Studio data could not be loaded.
        </p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<
    'games' | 'threads' | 'posts' | 'courses' | 'analytics' | 'notifications'
  >('games');
  const [showModal, setShowModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showManageSectionsModal, setShowManageSectionsModal] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const { user, threads, posts, courses, gamesShared } = studioData;

  const quickStats = {
    games: gamesShared.length,
    threads: threads.length,
    posts: posts.length,
    courses: courses.length,
  };

  const openModal = (gameId: string) => {
    setSelectedGameId(gameId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGameId(null);
  };

  const confirmDelete = async () => {
    if (selectedGameId) {
      try {
        await axiosInstance.delete(`/gameshareds/${selectedGameId}`);
        closeModal();
      } catch (error: any) {
        console.error('Failed to delete game:', error);
      }
    }
  };

  const openSectionModal = (courseId: string) => {
    setCurrentCourseId(courseId);
    setShowSectionModal(true);
  };

  const closeSectionModal = () => {
    setShowSectionModal(false);
    setCurrentCourseId(null);
  };

  const openManageSectionsModal = (courseId: string) => {
    setCurrentCourseId(courseId);
    setShowManageSectionsModal(true);
  };

  const closeManageSectionsModal = () => {
    setShowManageSectionsModal(false);
    setCurrentCourseId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={user.profile?.avatarUrl || '/default-avatar.png'}
            alt={user.username}
            className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700"
          />
          <div>
            <h1 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">
              {user.username}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Joined: {new Date(user.joinedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last Login: {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
        </div>
        <nav className="space-y-2">
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('games')}
          >
            Manage Games
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('threads')}
          >
            Manage Threads
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('posts')}
          >
            Manage Posts
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('courses')}
          >
            Manage Courses
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            My Studio
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Manage and track all your creations and activities in one place. Navigate through your games, threads, posts, and courses easily. Stay informed with analytics and notifications to improve your content.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between text-gray-800 dark:text-gray-100">
          <div>Games: {quickStats.games}</div>
          <div>Threads: {quickStats.threads}</div>
          <div>Posts: {quickStats.posts}</div>
          <div>Courses: {quickStats.courses}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex space-x-4 text-gray-800 dark:text-gray-100">
          <button
            className={`${activeTab === 'games' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('games')}
          >
            Games
          </button>
          <button
            className={`${activeTab === 'threads' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('threads')}
          >
            Threads
          </button>
          <button
            className={`${activeTab === 'posts' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`${activeTab === 'courses' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`${activeTab === 'analytics' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`${activeTab === 'notifications' ? 'bg-gray-200 dark:bg-gray-700' : ''} px-4 py-2 rounded`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
        <div className="space-y-8">
          {activeTab === 'games' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <div className="flex space-x-4">
                <Link
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  href={`/games/newgameshared`}
                >
                  Add Game
                </Link>
                <div className="flex space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>Filter: All</span>
                  <span>Sort: Date</span>
                </div>
              </div>
              {gamesShared.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">
                  No games found.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gamesShared.map((game) => (
                    <div
                      key={game._id}
                      className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                        {game.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {game.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Views: {game.viewCount} | Downloads: {game.downloadCount}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Rating: {game.averageRating}
                      </p>
                      <div className="flex space-x-2 mb-2">
                        {game.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2 text-xs text-gray-800 dark:text-gray-100 mt-4">
                        <Link
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                          href={`/games/edit/${game._id}`}
                          passHref
                        >
                          Edit
                        </Link>
                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Analytics
                        </button>
                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Comments
                        </button>
                        <button
                          onClick={() => openModal(game._id)}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {gamesShared.length > 6 && (
                <div className="flex justify-center space-x-2 text-sm">
                  <span className="cursor-pointer">{'<'}</span>
                  <span className="cursor-pointer bg-blue-600 text-white px-2 rounded">
                    1
                  </span>
                  <span className="cursor-pointer">2</span>
                  <span className="cursor-pointer">3</span>
                  <span className="cursor-pointer">{'>'}</span>
                </div>
              )}
            </div>
          )}
          {activeTab === 'threads' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Add Thread
                </button>
                <div className="flex space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>Filter by Category: All</span>
                  <span>Sort: Newest</span>
                </div>
              </div>
              {threads.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">
                  No threads found.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {threads.map((thread) => (
                    <div
                      key={thread._id}
                      className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                        {thread.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Replies: (N/A) Views: {thread.views}
                      </p>
                      <div className="flex space-x-2 mb-2">
                        {thread.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2 text-xs text-gray-800 dark:text-gray-100 mt-4">
                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Close/Open
                        </button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'posts' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <div className="flex space-x-4">
                  <div className="flex space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>Filter by Thread: All</span>
                    <span>Sort: Newest</span>
                  </div>
                </div>
                {posts.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    No posts found.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                      <div
                        key={post._id}
                        className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                      >
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                          {post.threadId.title}
                        </h3>
                        <p
                          className="text-sm text-gray-700 dark:text-gray-300 mb-2"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Posted: {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <div className="flex space-x-2 text-xs text-gray-800 dark:text-gray-100 mt-4">
                          <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                            Edit
                          </button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Display user's posts as cards...
              </p>
            </div>
          )}
          {activeTab === 'courses' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <div className="flex space-x-4">
                <Link
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  href={`/courses/newcourse`}
                  passHref
                >
                  Add Course
                </Link>
                <div className="flex space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>Filter: All</span>
                  <span>Sort: Most Popular</span>
                </div>
              </div>
              {courses.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">
                  No courses found.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {course.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sections: {course.sections.length} | Rating:{' '}
                        {course.averageRating.toFixed(1)}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-800 dark:text-gray-100 mt-4">
                        <button
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                          onClick={() => router.push(`/courses/edit/${course._id}`)}
                        >
                          Edit
                        </button>

                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Analytics
                        </button>
                        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          Comments
                        </button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded">
                          Delete
                        </button>
                        <button
                          className="px-2 py-1 bg-blue-600 text-white rounded"
                          onClick={() => openSectionModal(course._id)}
                        >
                          Add Section
                        </button>
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={() => openManageSectionsModal(course._id)}
                        >
                          Manage Sections
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <p className="text-gray-700 dark:text-gray-300">
                Analytics section with charts and graphs...
              </p>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                - New comment on "Space Odyssey"
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                - "Unity Debugging Tips" got new replies
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Mark All as Read
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">
                  View All
                </button>
              </div>
            </div>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-1/3">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Confirm Delete
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Are you sure you want to delete this game? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showSectionModal && currentCourseId && (
          <AddSectionModal
            courseId={currentCourseId}
            onClose={closeSectionModal}
            onSectionCreated={() => { }}
          />
        )}
        {showManageSectionsModal && currentCourseId && (
          <ManageSectionsModal
            courseId={currentCourseId}
            onClose={closeManageSectionsModal}
          />
        )}
      </main>
    </div>
  );
};

export default MyStudioPage;
export { getStudioDetailsServerSideProps as getServerSideProps } from '../../src/serverside/studio.serverside';
