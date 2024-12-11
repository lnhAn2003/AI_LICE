import User from "../models/user.model";
import Thread from "../models/thread.model";
import Post from "../models/post.model";
import Course from "../models/course.model";
import GameShared from "../models/gameshared.model";

class MyStudioService {
  public async fetchUserContent(userId: string) {
    try {
      const user = await User.findById(userId)
        .select("username email profile.status profile.avatarUrl roleId joinedAt lastLogin")
        .lean();

      if (!user) {
        throw new Error("User not found");
      }

      const threads = await Thread.find({ authorId: userId })
        .select("title tags content createdAt updatedAt views isPinned")
        .lean();

      const posts = await Post.find({ authorId: userId })
        .select("threadId content createdAt updatedAt isEdited")
        .populate({
          path: "threadId",
          select: "title",
        })
        .lean();

      const courses = await Course.find({ createdBy: userId })
        .select("title description tags categories createdAt updatedAt averageRating")
        .populate({
          path: "sections",
          select: "sectionTitle lessons",
          populate: {
            path: "lessons",
            select: "title videoUrl",
          },
        })
        .lean();

      const gamesShared = await GameShared.find({ uploadedBy: userId })
        .select("title description images fileUrl tags categories createdAt updatedAt averageRating viewCount downloadCount")
        .lean();

      return {
        user,
        threads,
        posts,
        courses,
        gamesShared,
      };
    } catch (error) {
      console.error("Error fetching user content:", error);
      throw new Error("Unable to fetch user content");
    }
  }
}

export default new MyStudioService();
