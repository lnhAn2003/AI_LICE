import { GetServerSideProps } from "next";
import axiosInstance from "../../src/utils/axiosInstance";
import { parse } from "cookie";

export const getGameDetailsServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const gameId = params?.id;
    const response = await axiosInstance.get(`/gameshareds/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const gameData = response.data;

    const game = {
      title: gameData.title || "Untitled Game",
      uploadedBy: gameData.uploadedBy?.username || "Anonymous",
      dateUploaded: new Date(gameData.createdAt).toLocaleDateString() || "N/A",
      coverImage: gameData.images?.[0] || "https://via.placeholder.com/150",
      description: gameData.description || "No description available.",
      tags: gameData.tags || [],
      categories: gameData.categories || [],
      platforms: gameData.platforms || ["Unknown"],
      externalLinks: {
        officialWebsite:
          gameData.externalLinks?.find((link: any) => link.name === "Website")?.url ||
          "",
        gameplayVideo:
          gameData.externalLinks?.find((link: any) => link.name === "Gameplay")?.url ||
          "",
        communityForum:
          gameData.externalLinks?.find((link: any) => link.name === "Forum")?.url ||
          "",
      },
      downloadLink: gameData.fileUrl || "",
      screenshots: gameData.images || [],
      changelog:
        gameData.changelog?.map((entry: any) => ({
          date: new Date(entry.date).toLocaleDateString() || "N/A",
          changes: entry.description || "No changes described.",
        })) || [],
      averageRating: gameData.averageRating || 0,
      totalRatings: gameData.ratingCount || 0,
      reviews:
        gameData.ratings?.map((rating: any) => ({
          username: rating.userId?.username || "Anonymous",
          comment: rating.comment || "No comment.",
          rating: rating.rating || 0,
        })) || [],
      communityFeedback: {
        likes: gameData.successVotes?.likes || 0,
        dislikes: gameData.successVotes?.dislikes || 0,
        successRate: gameData.successVotes?.percentage || 0,
        feedbacks:
          gameData.successVotes?.userVotes?.map((vote: any) => ({
            username: vote.userId?.username || "Anonymous",
            comment: vote.vote || "",
          })) || [],
      },
      comments:
        gameData.comments?.map((comment: any) => ({
          username: comment.authorId?.username || "Anonymous",
          date: new Date(comment.createdAt).toLocaleDateString() || "N/A",
          comment: comment.content || "No comment.",
          replies:
            comment.replies?.map((reply: any) => ({
              username: reply.authorId?.username || "Anonymous",
              date: new Date(reply.createdAt).toLocaleDateString() || "N/A",
              comment: reply.content || "No reply.",
            })) || [],
        })) || [],
    };

    return {
      props: {
        game,
      },
    };
  } catch (error: any) {
    console.error("Error fetching games data:", error.response?.data || error.message);
        
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