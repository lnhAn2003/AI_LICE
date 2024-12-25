// src/serverside/gameshareds.serverside.tsx

import { GetServerSideProps } from "next";
import axiosInstance from "../../src/utils/axiosInstance";
import { parse } from "cookie";
import mongoose from "mongoose"; 
import { GameData, Comment, Reply, ExternalLink, ChangelogEntry, Rating, RatingReview, CommunityFeedback } from "../types/game";

export const getGameDetailsServerSideProps: GetServerSideProps = async (context) => {
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
    const gameId = params?.id as string;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return { notFound: true };
    }

    const response = await axiosInstance.get(`/gameshareds/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const gameData = response.data;

    const safeString = (value: any): string | null => (typeof value === 'string' ? value : null);

    const externalLinks: ExternalLink[] = gameData.externalLinks?.map((link: any) => ({
      _id: link._id,
      name: link.name,
      url: link.url,
      id: link.id,
    })) || [];

    const changelog: ChangelogEntry[] = gameData.changelog?.map((entry: any) => ({
      date: entry.date,
      description: entry.description,
      _id: entry._id,
      id: entry.id,
    })) || [];

    const ratings: Rating[] = gameData.ratings?.map((rating: any) => ({
      userId: {
        _id: rating.userId._id,
        username: rating.userId.username,
        id: rating.userId.id,
      },
      rating: rating.rating,
      comment: rating.comment,
      createdAt: rating.createdAt,
      _id: rating._id,
      id: rating.id,
    })) || [];

    const reviews: RatingReview[] = gameData.ratings?.map((rating: any) => ({
      username: rating.userId.username || "Anonymous",
      comment: rating.comment || "",
      rating: rating.rating || 0,
    })) || [];

    const communityFeedback: CommunityFeedback = {
      likes: gameData.successVotes.likes || 0,
      dislikes: gameData.successVotes.dislikes || 0,
      successRate: gameData.successVotes.percentage || 0,
      feedbacks: gameData.successVotes.userVotes?.map((vote: any) => ({
        username: vote.userId?.username || "Anonymous",
        comment: vote.vote || "",
      })) || [],
    };

    const mappedComments: Comment[] = gameData.comments?.map((comment: any) => ({
      _id: comment._id,
      targetType: comment.targetType,
      targetId: comment.targetId,
      authorId: {
        _id: comment.authorId._id,
        username: comment.authorId.username,
        profile: comment.authorId.profile || {},
      },
      content: comment.content || "",
      images: comment.images || [],
      fileUrl: safeString(comment.fileUrl),
      isEdited: comment.isEdited,
      isVisible: comment.isVisible,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      editHistory: comment.editHistory || [],
      __v: comment.__v,
      id: comment.id,
      replies: comment.replies?.map((reply: any) => ({
        _id: reply._id,
        targetType: reply.targetType,
        targetId: reply.targetId,
        authorId: {
          _id: reply.authorId._id,
          username: reply.authorId.username,
          profile: reply.authorId.profile || {},
        },
        content: reply.content || "",
        images: reply.images || [],
        isEdited: reply.isEdited,
        isVisible: reply.isVisible,
        parentCommentId: reply.parentCommentId,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
        editHistory: reply.editHistory || [],
        __v: reply.__v,
        id: reply.id,
      })) || [],
    })) || [];

    const game: GameData = {
      _id: gameData._id,
      title: gameData.title || "Untitled Game",
      description: gameData.description || "No description available.",
      uploadedBy: {
        _id: gameData.uploadedBy._id || "unknown",
        username: gameData.uploadedBy.username || "Anonymous",
      },
      images: gameData.images || [],
      fileUrl: safeString(gameData.fileUrl),
      externalLinks: externalLinks,
      createdAt: gameData.createdAt,
      updatedAt: gameData.updatedAt,
      downloadCount: gameData.downloadCount || 0,
      viewCount: gameData.viewCount || 0,
      favorites: gameData.favorites || [],
      tags: gameData.tags || [],
      categories: gameData.categories || [],
      commentId: gameData.commentId || [],
      averageRating: gameData.averageRating || 0,
      ratingCount: gameData.ratingCount || 0,
      newRelease: gameData.newRelease || false,
      version: gameData.version || "1.0.0",
      changelog: changelog,
      ratings: ratings,
      __v: gameData.__v || 0,
      platforms: gameData.platforms || [],
      comments: mappedComments,
      dateUploaded: new Date(gameData.createdAt).toLocaleDateString() || "N/A",
      coverImage: gameData.images?.[0] || "https://via.placeholder.com/150",
      downloadLink: safeString(gameData.fileUrl) || null,
      screenshots: gameData.images || [],
      reviews: reviews,
      communityFeedback: communityFeedback,
    };

    return {
      props: {
        game,
      },
    };
  } catch (error: any) {
    console.error("Error fetching game data:", error.response?.data || error.message);

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
