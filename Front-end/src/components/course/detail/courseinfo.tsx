import React from 'react';
import { CourseData } from '../../../types/course';
import { TAG_COLORS } from '../../../../styles/tagcolors';

const CourseInfo: React.FC<{ course: CourseData }> = ({ course }) => {
  const dateCreated = new Date(course.createdAt).toLocaleDateString();
  const ratingStars = Math.round(course.averageRating);

  return (
    <div
      className="relative shadow-lg rounded-lg p-8 mb-12 transform transition-all hover:shadow-xl"
      style={{
        backgroundImage: "url('https://digitaldefynd.com/wp-content/uploads/2018/10/Best-Game-Design-course-tutorial-class-certification-training-online.jpg')", // Replace with your screenshot path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff', // Ensure text is readable
      }}
    >
      {/* Overlay to Darken Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Course Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-white text-center leading-tight">
            {course.title}
          </h1>
        </div>

        {/* Instructor Information */}
        <div className="flex flex-col items-center mb-6 space-y-3">
          {course.createdBy.profile?.avatarUrl ? (
            <img
              src={course.createdBy.profile.avatarUrl}
              alt={course.createdBy.username}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {course.createdBy.username.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              {course.createdBy.username}
            </p>
            <p className="text-sm text-gray-300">
              Created on: <span>{dateCreated}</span>
            </p>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="flex items-center justify-center mb-6 space-x-3">
          <div className="flex items-center space-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-8 h-8"
                  fill={i < ratingStars ? '#facc15' : '#9ca3af'} // Yellow for active, Gray for inactive
                  stroke="none"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.363 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.359-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.783.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.363-1.118L2.171 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.948z"></path>
                </svg>
              ))}
          </div>
          <div>
            <span
              className="text-white text-xl font-semibold cursor-help"
              title="Average Rating"
            >
              {course.averageRating.toFixed(1)} / 5
            </span>
            <span className="text-gray-300 text-sm ml-1">
              ({course.ratingCount} ratings)
            </span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {course.tags.map((tag, index) => (
            <span
              key={tag}
              className={`text-sm font-medium px-3 py-1 rounded-full shadow-sm transition hover:shadow-md ${
                TAG_COLORS[index % TAG_COLORS.length]
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
