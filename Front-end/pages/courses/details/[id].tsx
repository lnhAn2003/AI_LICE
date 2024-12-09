import { NextPage } from 'next';
import { getCourseDetailsServerSideProps } from '../../../src/serverside/courses.serverside';
import CourseInfo from '../../../src/components/course/detail/courseinfo';
import Description from '../../../src/components/course/detail/description';
import TagsAndCategories from '../../../src/components/course/detail/tagsandcategories';
import Screenshots from '../../../src/components/course/detail/screenshots';
import ExternalLinks from '../../../src/components/course/detail/externallinks';
import RatingsReviews from '../../../src/components/course/detail/ratingsreviews';
import CommunityFeedback from '../../../src/components/course/detail/communityfeedback';
import CommentsSection from '../../../src/components/course/detail/commentsection';
import CourseSections from '../../../src/components/course/detail/coursesections';
import { CourseData } from '../../../src/types/course';

interface CourseDetailPageProps {
  course: CourseData | null;
}

const mockUserProgress = (course: CourseData) => {
  const progress: { [key: string]: number } = {};
  for (const section of course.sections) {
    progress[section._id] = Math.floor(section.lessons.length / 2);
  }
  return progress;
};

const CourseDetailPage: NextPage<CourseDetailPageProps> = ({ course }) => {
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Course details could not be loaded.
        </p>
      </div>
    );
  }

  const userProgress = mockUserProgress(course);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">

      {/* Hero Section */}
      <div className="pt-8 pb-12 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <CourseInfo course={course} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Description description={course.description} />

        <TagsAndCategories tags={course.tags} categories={course.categories} />

        <Screenshots screenshots={course.screenshot} />

        <CourseSections sections={course.sections} userProgress={userProgress} />

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