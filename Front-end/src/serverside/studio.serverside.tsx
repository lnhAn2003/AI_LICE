// src/serverside/studio.serverside.tsx
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import axiosInstance from '../utils/axiosInstance';
import { parse } from 'cookie';
import { MyStudioData } from '../types/studio';

interface MyStudioProps {
  studioData: MyStudioData;
}

export const getStudioDetailsServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<MyStudioProps>> => {
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

  const userId = params?.id;

  if (!userId || typeof userId !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axiosInstance.get(`/mystudio/${userId}/studio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data?.data || {};

    const userData = data.user || {};
    const threadsData = Array.isArray(data.threads) ? data.threads : [];
    const postsData = Array.isArray(data.posts) ? data.posts : [];
    const coursesData = Array.isArray(data.courses) ? data.courses : [];
    const gamesData = Array.isArray(data.gamesShared) ? data.gamesShared : [];

    const studioData: MyStudioData = {
      user: {
        _id: userData._id || "unknown",
        username: userData.username || "UnknownUser",
        email: userData.email || "unknown@example.com",
        profile: {
          avatarUrl: userData.profile?.avatarUrl || "/default-avatar.png",
        },
        roleId: userData.roleId || "unknown",
        joinedAt: userData.joinedAt || new Date().toISOString(),
        lastLogin: userData.lastLogin || new Date().toISOString(),
      },
      threads: threadsData.map((t: any) => ({
        _id: t._id || "unknown",
        title: t.title || "Untitled Thread",
        tags: Array.isArray(t.tags) ? t.tags : [],
        content: t.content || "",
        createdAt: t.createdAt || new Date().toISOString(),
        updatedAt: t.updatedAt || new Date().toISOString(),
        views: typeof t.views === 'number' ? t.views : 0,
        isPinned: !!t.isPinned,
      })),
      posts: postsData.map((p: any) => ({
        _id: p._id || "unknown",
        threadId: {
          _id: p.threadId?._id || "unknown",
          title: p.threadId?.title || "Unknown Thread",
        },
        content: p.content || "",
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
        isEdited: !!p.isEdited,
      })),
      courses: coursesData.map((c: any) => ({
        _id: c._id || "unknown",
        title: c.title || "Untitled Course",
        description: c.description || "",
        tags: Array.isArray(c.tags) ? c.tags : [],
        categories: Array.isArray(c.categories) ? c.categories : [],
        createdAt: c.createdAt || new Date().toISOString(),
        updatedAt: c.updatedAt || new Date().toISOString(),
        averageRating: typeof c.averageRating === 'number' ? c.averageRating : 0,
        sections: (Array.isArray(c.sections) ? c.sections : []).map((sec: any) => ({
          _id: sec._id || "unknown",
          sectionTitle: sec.sectionTitle || "Untitled Section",
          lessons: (Array.isArray(sec.lessons) ? sec.lessons : []).map((lesson: any) => ({
            _id: lesson._id || "unknown",
            title: lesson.title || "Untitled Lesson",
            videoUrl: lesson.videoUrl || "",
          })),
        })),
      })),
      gamesShared: gamesData.map((g: any) => ({
        _id: g._id || "unknown",
        title: g.title || "Untitled Game",
        description: g.description || "",
        images: Array.isArray(g.images) ? g.images : [],
        fileUrl: g.fileUrl || "",
        createdAt: g.createdAt || new Date().toISOString(),
        updatedAt: g.updatedAt || new Date().toISOString(),
        downloadCount: typeof g.downloadCount === 'number' ? g.downloadCount : 0,
        viewCount: typeof g.viewCount === 'number' ? g.viewCount : 0,
        tags: Array.isArray(g.tags) ? g.tags : [],
        categories: Array.isArray(g.categories) ? g.categories : [],
        averageRating: typeof g.averageRating === 'number' ? g.averageRating : 0,
      })),
    };

    return {
      props: {
        studioData,
      },
    };
  } catch (error: any) {
    console.error("Error fetching studio data:", error.response?.data || error.message);

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
