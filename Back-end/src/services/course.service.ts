import mongoose from "mongoose";
import Course, { ICourse } from "../models/course.model";
import Section from "../models/section.model";
import Lesson, { ILesson } from "../models/lesson.model";
import { fileUpload } from "../utils/awsS3";

class CourseService {
  public async createCourse(
    courseData: Partial<ICourse>,
    images?: { buffer: Buffer; mimeType: string }[],
    resources?: { buffer: Buffer; mimeType: string }[]
  ): Promise<ICourse> {
    const folder = `courses/${courseData.title || Date.now()}`;

    const screenshotUrls = images
      ? await Promise.all(
          images.map((image, index) =>
            fileUpload(image.buffer, `${folder}/images`, `screenshot-${index + 1}.jpg`, image.mimeType)
          )
        )
      : [];

    const resourceUrls = resources
      ? await Promise.all(
          resources.map((resource, index) =>
            fileUpload(resource.buffer, `${folder}/resources`, `resource-${index + 1}`, resource.mimeType)
          )
        )
      : [];

    const course = new Course({
      ...courseData,
      screenshot: screenshotUrls,
      resource: resourceUrls,
    });

    return await course.save();
  }

  public async getAllCourses(): Promise<ICourse[]> {
    return await Course.find()
      .populate({ path: "createdBy", select: "username" })
      .populate({ path: "categories", select: "_id name" })
      .populate({
        path: "sections",
        populate: { path: "lessons", select: "title videoUrl" },
      });
  }

  public async getCourseById(id: string): Promise<ICourse | null> {
    return await Course.findById(id)
      .populate({ path: "createdBy", select: "username profile.avatarUrl" })
      .populate({ path: "categories", select: "_id name" })
      .populate({
        path: "sections",
        populate: { path: "lessons", select: "title videoUrl" },
      })
      .populate({
        path: "comments",
        match: { isVisible: true, parentCommentId: null },
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: 'authorId', select: 'username profile.avatarUrl' },
          {
            path: 'replies',
            match: { isVisible: true },
            options: { sort: { createdAt: -1 } },
            populate: { path: 'authorId', select: 'username profile.avatarUrl' },
          },
        ],
      });
  }

  public async updateCourse(
    id: string,
    updateData: Partial<ICourse>,
    images?: { buffer: Buffer; mimeType: string }[],
    resources?: { buffer: Buffer; mimeType: string }[]
  ): Promise<ICourse | null> {
    const course = await Course.findById(id);
    if (!course) {
      throw new Error("Course not found");
    }

    const folder = `courses/${course.title || id}`;

    if (images && images.length > 0) {
      const screenshotUrls = await Promise.all(
        images.map((image, index) =>
          fileUpload(image.buffer, `${folder}/images`, `screenshot-${index + 1}.jpg`, image.mimeType)
        )
      );
      updateData.screenshot = [...(course.screenshot || []), ...screenshotUrls];
    }

    if (resources && resources.length > 0) {
      const resourceUrls = await Promise.all(
        resources.map((resource, index) =>
          fileUpload(resource.buffer, `${folder}/resources`, `resource-${index + 1}`, resource.mimeType)
        )
      );
      updateData.resource = [...(course.resource || []), ...resourceUrls];
    }

    return await Course.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async deleteCourse(id: string): Promise<ICourse | null> {
    const course = await Course.findById(id);
    if (!course) return null;

    await Promise.all(
      course.sections.map(async (sectionId) => {
        const section = await Section.findById(sectionId);
        if (section) {
          await Promise.all(section.lessons.map((lessonId) => Lesson.findByIdAndDelete(lessonId)));
          await Section.findByIdAndDelete(sectionId);
        }
      })
    );

    return await Course.findByIdAndDelete(id);
  }

  public async addRating(
    courseId: string,
    userId: string,
    ratingValue: number,
    comment: string
  ): Promise<ICourse> {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");

    const existingRatingIndex = course.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingRatingIndex >= 0) {
      course.ratings[existingRatingIndex].rating = ratingValue;
      course.ratings[existingRatingIndex].comment = comment;
      course.ratings[existingRatingIndex].createdAt = new Date();
    } else {
      course.ratings.push({
        userId: new mongoose.Types.ObjectId(userId),
        rating: ratingValue,
        comment: comment,
        createdAt: new Date(),
      });
      course.ratingCount += 1;
    }

    const totalRatingSum = course.ratings.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = totalRatingSum / course.ratingCount;

    await course.save();
    return course;
  }

}

export default new CourseService();
