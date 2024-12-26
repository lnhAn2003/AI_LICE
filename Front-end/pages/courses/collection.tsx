// pages/courses/collection.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../src/utils/axiosInstance';
import { CourseData, Category } from '../../src/types/course';
import FilterSortComponent from '../../src/components/course/filtersort';
import Pagination from '../../src/components/index/pagination'; 

const ITEMS_PER_PAGE = 8;

const CourseCollection: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [courseCategories, setCourseCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>('Most Recent');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        const courseResponse = await axiosInstance.get('/courses');
        const allCourses = courseResponse.data as CourseData[];
        setCourses(allCourses);
        setFilteredCourses(allCourses);

        const categoryResponse = await axiosInstance.get('/categories');
        const allCategories = categoryResponse.data as Category[];
        const courseCats = allCategories.filter((cat) => cat.key === 'course_key');
        setCourseCategories(courseCats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoursesAndCategories();
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...courses];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(keyword)
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((course) =>
        filters.categories.every((selectedCatId: string) =>
          Array.isArray(course.categories) &&
          course.categories.some((category) => category._id === selectedCatId)
        )
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((course) =>
        filters.tags.every((selectedTag: string) =>
          Array.isArray(course.tags) && course.tags.includes(selectedTag)
        )
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(
        (course) => course.averageRating >= parseInt(filters.rating, 10)
      );
    }

    if (filters.minRatings) {
      filtered = filtered.filter(
        (course) => course.ratingCount >= parseInt(filters.minRatings, 10)
      );
    }

    if (filters.dateRange) {
      const now = new Date();
      let startDate: Date | null = null;

      if (filters.dateRange === 'Last 7 Days') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (filters.dateRange === 'Last 30 Days') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (filters.dateRange === 'Last Year') {
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      }

      if (startDate) {
        filtered = filtered.filter((course) => {
          const courseDate = new Date(course.createdAt);
          return courseDate >= startDate!;
        });
      }
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: string) => {
    let sortedCourses = [...filteredCourses];

    if (sortBy === 'Highest Rated') {
      sortedCourses.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortBy === 'Most Popular') {
      sortedCourses.sort((a, b) => b.ratingCount - a.ratingCount);
    } else {
      sortedCourses.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setSortBy(sortBy);
    setFilteredCourses(sortedCourses);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const indexOfLastCourse = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Filter Component */}
        <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
          <FilterSortComponent
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            courseCategories={courseCategories}
          />
        </div>

        {/* Course List */}
        <div className="w-full lg:w-3/4">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Course Collection
            </h1>
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-gray-700 font-medium dark:text-gray-300">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="Most Popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Course Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ minHeight: '500px' }}
          >
            {currentCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-100 border border-gray-400 dark:border-transparent"
                style={{ height: '250px' }}
              >
                <Link href={`/courses/details/${course._id}`}>
                  <div className="cursor-pointer">
                    <div className="relative">
                      <img
                        src={course.screenshot?.[0] || '/placeholder-image.png'}
                        alt={course.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                        {course.title}
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        By {course.createdBy?.username || 'Anonymous'}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.averageRating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 576 512"
                            >
                              <path d="M259.3 17.8L194 150.2 47.9 171.5C27.7 174.1 21.9 197.5 35.7 209.1L129.1 300.6 106.8 454.3C104.2 472.1 120.5 485.4 136.1 479.6L288 439.6 439.9 479.6C455.5 485.4 471.8 472.1 469.2 454.3L446.9 300.6 540.3 209.1C554.1 197.5 548.3 174.1 528.1 171.5L382 150.2 316.7 17.8C308.3 0.7 267.7 0.7 259.3 17.8Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                          ({course.ratingCount})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
                        {course.tags.map((tag) => (
                          <span key={tag} className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* Placeholder cards for empty spaces */}
            {Array.from({ length: ITEMS_PER_PAGE - currentCourses.length }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="bg-transparent"
                style={{ height: '250px' }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCollection;
