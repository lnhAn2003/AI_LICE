// src/serverside/courses.serverside.tsx

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import axiosInstance from '../utils/axiosInstance';
import { CourseData } from '../types/course';
import { parse } from 'cookie';

interface CourseDetailProps {
  course: CourseData;
}

export const getCourseDetailsServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CourseDetailProps>> => {
  const { req, params } = context;
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const courseId = params?.id;

  if (!courseId || typeof courseId !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axiosInstance.get(`/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const courseData = response.data;

    const course: CourseData = {
      _id: courseData._id || "unknown",
      title: courseData.title || "Untitled Course",
      description: courseData.description || "No description available.",
      createdBy: {
        _id: courseData.createdBy?._id || "unknown",
        username: courseData.createdBy?.username || "Anonymous",
        profile: {
          avatarUrl: courseData.createdBy?.profile?.avatarUrl || "https://via.placeholder.com/150",
        },
      },
      sections: courseData.sections?.map((section: any) => ({
        _id: section._id || "unknown",
        courseId: section.courseId || "unknown",
        authorId: section.authorId || "unknown",
        sectionTitle: section.sectionTitle || "Untitled Section",
        lessons: section.lessons?.map((lesson: any) => ({
          _id: lesson._id || "unknown",
          title: lesson.title || "Untitled Lesson",
          videoUrl: lesson.videoUrl || "",
          textContent: lesson.textContent || "",
          resources: lesson.resources || [],
          id: lesson.id || "unknown",
        })) || [],
        createdAt: section.createdAt || new Date().toISOString(),
        updatedAt: section.updatedAt || new Date().toISOString(),
        isEdited: section.isEdited || false,
        editHistory: section.editHistory || [],
        __v: section.__v || 0,
      })) || [],
      tags: courseData.tags || [],
      categories: courseData.categories || [],
      averageRating: courseData.averageRating || 0,
      ratingCount: courseData.ratingCount || 0,
      favorites: courseData.favorites || [],
      comments: courseData.comments?.map((comment: any) => ({
        _id: comment._id || "unknown",
        userId: comment.userId || "unknown",
        username: comment.username || "Anonymous",
        avatarUrl: comment.avatarUrl || "https://via.placeholder.com/150",
        comment: comment.comment || "",
        likes: comment.likes || 0,
        replies: comment.replies?.map((reply: any) => ({
          _id: reply._id || "unknown",
          userId: reply.userId || "unknown",
          username: reply.username || "Anonymous",
          avatarUrl: reply.avatarUrl || "https://via.placeholder.com/150",
          comment: reply.comment || "",
          likes: reply.likes || 0,
          createdAt: reply.createdAt || new Date().toISOString(),
        })) || [],
        createdAt: comment.createdAt || new Date().toISOString(),
      })) || [],
      resource: courseData.resource || [],
      screenshot: courseData.screenshot || [],
      ratings: courseData.ratings?.map((rating: any) => ({
        _id: rating._id || "unknown",
        userId: rating.userId || "unknown",
        rating: rating.rating || 0,
        comment: rating.comment || "",
        createdAt: rating.createdAt || new Date().toISOString(),
      })) || [],
      createdAt: courseData.createdAt || new Date().toISOString(),
      updatedAt: courseData.updatedAt || new Date().toISOString(),
    };

    return {
      props: {
        course,
      },
    };
  } catch (error: any) {
    console.error("Error fetching course data:", error.response?.data || error.message);

    if (error.response?.status === 404) {
      return { notFound: true };
    }

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
