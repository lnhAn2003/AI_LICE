// src/services/progress.service.ts
import Progress, { IProgress } from "../models/progress.model";
import Course from "../models/course.model";
import Lesson from "../models/lesson.model";
import mongoose from "mongoose";

class ProgressService {
  public async updateProgress(userId: string, courseId: string, lessonId: string): Promise<IProgress> {
    const progress = await Progress.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    const course = await Course.findById(new mongoose.Types.ObjectId(courseId));
    if (!course) throw new Error("Course not found");

    const lesson = await Lesson.findById(new mongoose.Types.ObjectId(lessonId));
    if (!lesson) throw new Error("Lesson not found");

    // Create new progress if it doesn't exist
    if (!progress) {
      const newProgress = new Progress({
        userId: new mongoose.Types.ObjectId(userId),
        courseId: new mongoose.Types.ObjectId(courseId),
        completedLessons: [new mongoose.Types.ObjectId(lessonId)],
        completedSections: [],
        overallProgress: 0,
        lastActivity: new Date(),
      });

      // Check if the section should be marked as complete
      await this.checkAndMarkSectionComplete(newProgress, lesson.sectionId);
      return await newProgress.save();
    } else {
      // Add the lesson to completedLessons if not already present
      const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
      if (!progress.completedLessons.includes(lessonObjectId)) {
        progress.completedLessons.push(lessonObjectId);

        // Check if the section should be marked as complete
        await this.checkAndMarkSectionComplete(progress, lesson.sectionId);

        // Recalculate overall progress
        const totalLessons = await Lesson.countDocuments({
          sectionId: { $in: course.sections },
        });
        progress.overallProgress = (progress.completedLessons.length / totalLessons) * 100;

        progress.lastActivity = new Date();
      }

      return await progress.save();
    }
  }

  private async checkAndMarkSectionComplete(progress: IProgress, sectionId: mongoose.Types.ObjectId): Promise<void> {
    const sectionLessons = await Lesson.find({ sectionId }, "_id").lean();
    const sectionLessonIds = sectionLessons.map((lesson) => lesson._id.toString());

    // Check if all lessons in the section are completed
    const allLessonsCompleted = sectionLessonIds.every((lessonId) =>
      progress.completedLessons.some((completedLessonId) => completedLessonId.toString() === lessonId)
    );

    if (allLessonsCompleted) {
      // Mark section as complete
      const sectionObjectId = new mongoose.Types.ObjectId(sectionId);
      if (!progress.completedSections.some((id) => id.equals(sectionObjectId))) {
        progress.completedSections.push(sectionObjectId);
      }
    }
  }


  // Get progress for a user in a specific course
  public async getProgressByCourse(userId: string, courseId: string): Promise<IProgress | null> {
    return await Progress.findOne({ userId, courseId })
      .populate("completedLessons", "title")
      .populate("courseId", "title");
  }

  // Get all progress for a user
  public async getAllProgress(userId: string): Promise<IProgress[]> {
    return await Progress.find({ userId }).populate("courseId", "title");
  }

  public async markSectionComplete(userId: string, courseId: string, sectionId: string): Promise<IProgress> {
    const progress = await Progress.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!progress) {
      throw new Error("Progress not found for this user and course");
    }

    const sectionLessons = await Lesson.find({ sectionId: new mongoose.Types.ObjectId(sectionId) }, "_id");
    const sectionLessonIds = sectionLessons.map((lesson) => lesson._id as mongoose.Types.ObjectId);

    const allLessonsCompleted = sectionLessonIds.every((lessonId) =>
      progress.completedLessons.some((completedLessonId) => completedLessonId.equals(lessonId))
    );

    if (!allLessonsCompleted) {
      throw new Error("Not all lessons in the section are completed");
    }

    const sectionObjectId = new mongoose.Types.ObjectId(sectionId);
    if (!progress.completedSections.some((id) => id.equals(sectionObjectId))) {
      progress.completedSections.push(sectionObjectId);
      progress.lastActivity = new Date();
      await progress.save();
    }

    return progress;
  }
}

export default new ProgressService();
