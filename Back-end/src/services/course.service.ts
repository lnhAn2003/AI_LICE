import mongoose from "mongoose";
import Course, { ICourse } from "../models/course.model";
import Section from "../models/sections.model";
import Lesson, { ILesson } from "../models/lessons.model";

class CourseService {
  public async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    const course = new Course(courseData);
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
      .populate({ path: "createdBy", select: "username" })
      .populate({ path: "categories", select: "_id name" })
      .populate({
        path: "sections",
        populate: { path: "lessons", select: "title videoUrl" },
      });
  }

  public async updateCourse(
    id: string,
    updateData: Partial<ICourse>
  ): Promise<ICourse | null> {
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
