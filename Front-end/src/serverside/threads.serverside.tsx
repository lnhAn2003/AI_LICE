// src/serverside/threads.serverside.tsx
import { GetServerSideProps } from "next";
import axiosInstance from "../../src/utils/axiosInstance";
import { parse } from "cookie";

export const getThreadDetailsServerSideProps: GetServerSideProps = async (context) => {
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

    try {
        const threadId = params?.id;

        if (!threadId) {
            return {
                notFound: true,
            };
        }

        const response = await axiosInstance.get(`/threads/${threadId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const threadData = response.data;

        const thread = {
            isPinned: threadData.isPinned || false,
            _id: threadData._id || "",
            title: threadData.title || "Untitled Thread",
            authorId: {
                profile: {
                    avatarUrl: threadData.authorId?.profile?.avatarUrl || "",
                },
                _id: threadData.authorId?._id || "",
                username: threadData.authorId?.username || "Anonymous",
            },
            tags: threadData.tags || [],
            content: threadData.content || "No content available",
            posts: threadData.posts.map((post: any) => ({
                _id: post._id,
                content: post.content,
                authorId: post.authorId, 
                comments: post.comments || [],
                createdAt: post.createdAt,
              })),
            createdAt: threadData.createdAt || null,
            updatedAt: threadData.updatedAt || null,
            views: threadData.views || 0,
            isVisible: threadData.isVisible || false,
        };

        return {
            props: {
                thread,
            },
        };
    } catch (error: any) {
        console.error("Error fetching threads data:", error.response?.data || error.message);

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
