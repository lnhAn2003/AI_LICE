// src/serverside/notification.serverside.tsx
import { GetServerSideProps } from "next";
import axiosInstance from "../utils/axiosInstance";
import { parse } from "cookie";
import { NotificationData } from "../types/notification";

export const getNotificationServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
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
    const userId = context.params?.id as string; 
    const response = await axiosInstance.get<NotificationData[]>(`/notification/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      props: {
        notifications: response.data,
      },
    };
  } catch (error: any) {
    console.error("Error fetching notifications:", error.response?.data || error.message);
    return { notFound: true };
  }
};
