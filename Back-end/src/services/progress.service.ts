// src/services/progress.service.ts
import Progress, { IProgress } from "../models/progress.model";
import Course from "../models/course.model";
import Section from "../models/section.model";
import Lesson from "../models/lesson.model";
import mongoose from "mongoose";

class ProgressService {
  public async updateProgress(userId: string, courseId: string, lessonId: string): Promise<IProgress> {
    const progress = await Progress.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!progress) {
      throw new Error("Progress not found. Please enroll in the course first.");
    }

    // Update completed lessons
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    if (!progress.completedLessons.includes(lessonObjectId)) {
      progress.completedLessons.push(lessonObjectId);
    }

    // Fetch the corresponding section and update its progress
    const lesson = await Lesson.findById(lessonObjectId);
    if (!lesson) throw new Error("Lesson not found");
    const sectionId = lesson.sectionId;

    await this.updateSectionProgress(progress, sectionId);

    // Update overall course progress
    const totalLessons = await Lesson.countDocuments({
      sectionId: { $in: progress.completedSections.map((section) => section.toString()) },
    });
    progress.overallProgress = (progress.completedLessons.length / totalLessons) * 100;

    progress.lastActivity = new Date();
    return await progress.save();
  }

  private async updateSectionProgress(progress: IProgress, sectionId: mongoose.Types.ObjectId): Promise<void> {
    const sectionLessons = await Lesson.find({ sectionId }, "_id").lean();
    const sectionLessonIds = sectionLessons.map((lesson) => lesson._id.toString());

    // Check if all lessons in the section are completed
    const completedLessons = progress.completedLessons.map((id) => id.toString());
    const completedLessonsInSection = sectionLessonIds.filter((id) =>
      completedLessons.includes(id)
    );

    const isSectionComplete = sectionLessonIds.length === completedLessonsInSection.length;

    // Update the progress of the section in the `completedSections` field
    const sectionObjectId = new mongoose.Types.ObjectId(sectionId);
    if (isSectionComplete && !progress.completedSections.includes(sectionObjectId)) {
      progress.completedSections.push(sectionObjectId);
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
  public async getProgressByCourse(userId: string, courseId: string): Promise<any> {
    const progress = await Progress.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    }).populate("completedLessons", "title");
  
    if (!progress) {
      throw new Error("Progress not found for this course");
    }
  
    const sections = await Section.find({ courseId: new mongoose.Types.ObjectId(courseId) }).populate(
      "lessons"
    );
  
    // Add progress and completion details for each section
    const sectionsWithProgress = sections.map((section) => {
      const sectionLessonIds = section.lessons.map((lesson) => lesson._id.toString());
      const completedLessonsInSection = progress.completedLessons
        .map((id) => id.toString())
        .filter((lessonId) => sectionLessonIds.includes(lessonId));
  
      return {
        ...section.toObject(),
        progress: (completedLessonsInSection.length / sectionLessonIds.length) * 100,
        isComplete: sectionLessonIds.length === completedLessonsInSection.length,
      };
    });
  
    return {
      progress: {
        overallProgress: progress.overallProgress,
        lastActivity: progress.lastActivity,
      },
      sections: sectionsWithProgress,
    };
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
