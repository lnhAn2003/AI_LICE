// src/services/lesson.service.ts
import Lesson, { ILesson } from '../models/lessons.model';
import Section from '../models/sections.model';
import User from '../models/user.model';

class LessonService {
  public async createLesson(lessonData: Partial<ILesson>): Promise<ILesson> {
    const lesson = new Lesson(lessonData);
    const savedLesson = await lesson.save();

    await User.findByIdAndUpdate(lessonData.authorId, {
      $push: { lessons: savedLesson._id },
    });

    await Section.findByIdAndUpdate(lessonData.sectionId, {
      $push: { lessons: savedLesson._id },
    });

    return savedLesson;
  }

  public async getLessons(): Promise<ILesson[]> {
    return await Lesson.find()
      .populate({ path: 'authorId', select: 'username' })
      .populate({ path: 'sectionId', select: 'sectionTitle' });
  }

  public async getLessonById(id: string): Promise<ILesson | null> {
    const lesson = await Lesson.findById(id)
      .populate([
        { path: 'authorId', select: 'username profile.avatarUrl' },
        {
          path: 'sectionId',
          select: 'sectionTitle',
          populate: { path: 'courseId', select: 'title' },
        },
        {
          path: 'comments',
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
        },
      ])
      .exec();

    return lesson;
  }

  public async getLessonsByAuthorId(authorId: string): Promise<ILesson[]> {
    return await Lesson.find({ authorId })
      .populate({ path: 'authorId', select: 'username' })
      .populate({ path: 'sectionId', select: 'sectionTitle' });
  }

  public async getLessonsBySectionId(sectionId: string): Promise<ILesson[]> {
    return await Lesson.find({ sectionId })
      .populate({ path: 'authorId', select: 'username' })
      .populate({ path: 'sectionId', select: 'sectionTitle' });
  }

  public async updateLesson(id: string, updateData: Partial<ILesson>): Promise<ILesson | null> {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return null;
    }

    lesson.editHistory.push({
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      textContent: lesson.textContent,
      resources: lesson.resources,
      editedAt: new Date(),
    });

    Object.assign(lesson, updateData);
    lesson.isEdited = true;
    lesson.updatedAt = new Date();

    await lesson.save();
    return lesson;
  }

  public async deleteLesson(id: string): Promise<ILesson | null> {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return null;
    }

    await User.findByIdAndUpdate(lesson.authorId, {
      $pull: { lessons: lesson._id },
    });

    await Section.findByIdAndUpdate(lesson.sectionId, {
      $pull: { lessons: lesson._id },
    });

    return await Lesson.findByIdAndDelete(id);
  }
}

export default new LessonService();
