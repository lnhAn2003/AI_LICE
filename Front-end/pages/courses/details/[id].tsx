import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { getCourseDetailsServerSideProps } from '../../../src/serverside/courses.serverside';
import axiosInstance from '../../../src/utils/axiosInstance';
import { CourseData } from '../../../src/types/course';

import CourseInfo from '../../../src/components/course/detail/courseinfo';
import Description from '../../../src/components/course/detail/description';
import TagsAndCategories from '../../../src/components/course/detail/tagsandcategories';
import Screenshots from '../../../src/components/course/detail/screenshots';
import ExternalLinks from '../../../src/components/course/detail/externallinks';
import RatingsReviews from '../../../src/components/course/detail/ratingsreviews';
import CommunityFeedback from '../../../src/components/course/detail/communityfeedback';
import CommentsSection from '../../../src/components/course/detail/commentsection';
import CourseSections from '../../../src/components/course/detail/coursesections';

interface CourseDetailPageProps {
  course: CourseData | null;
}

const CourseDetailPage: NextPage<CourseDetailPageProps> = ({ course }) => {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Course details could not be loaded.
        </p>
      </div>
    );
  }

  const fetchProgress = async () => {
    try {
      if (!course._id) {
        console.error('Invalid course data: missing _id.');
        return;
      }

      const response = await axiosInstance.get(`/progress/${course._id}`);
      const progressData = response.data;

      // Update progress-related state
      if (progressData.completedLessons) {
        setCompletedLessonIds(progressData.completedLessons);
      }
      if (progressData.overallProgress) {
        setOverallProgress(progressData.overallProgress);
      }
    } catch (error: any) {
      console.error('Error fetching progress:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [course._id]);

  const refreshProgressAfterUpdate = async () => {
    await fetchProgress();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <div className="pt-8 pb-12 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <CourseInfo course={course} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Description description={course.description} />
        <TagsAndCategories tags={course.tags} categories={course.categories} />
        <Screenshots screenshots={course.screenshot} />

        {/* Progress bar */}
        <div className="mb-8">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overall Progress: {overallProgress}%
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Render course sections */}
        <CourseSections
          sections={course.sections || []}
          completedLessonIds={completedLessonIds}
          onProgressUpdated={refreshProgressAfterUpdate}
        />

        <ExternalLinks resources={course.resource} />
        <RatingsReviews
          averageRating={course.averageRating}
          ratingCount={course.ratingCount}
          ratings={course.ratings}
        />
        <CommunityFeedback comments={course.comments} />
        <CommentsSection comments={course.comments} />
      </main>
    </div>
  );
};

export default CourseDetailPage;
export { getCourseDetailsServerSideProps as getServerSideProps };
