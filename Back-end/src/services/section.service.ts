// src/services/section.service.ts
import Section, { ISection } from '../models/section.model';
import Course from '../models/course.model';
import User from '../models/user.model'; 

class SectionService {
  public async createSection(sectionData: Partial<ISection>): Promise<ISection> {
    const section = new Section(sectionData);
    const savedSection = await section.save();

    if (sectionData.authorId) {
      await User.findByIdAndUpdate(sectionData.authorId, {
        $push: { sections: savedSection._id },
      });
    }

    await Course.findByIdAndUpdate(sectionData.courseId, {
      $push: { sections: savedSection._id },
    });

    return savedSection;
  }

  public async getAllSections(): Promise<ISection[]> {
    return await Section.find()
      .populate('courseId', 'title')
      .populate('authorId', 'username email')
      .populate('lessons', 'title videoUrl');
  }

  public async getSectionById(id: string): Promise<ISection | null> {
    return await Section.findById(id)
      .populate('courseId', 'title')
      .populate('lessons', 'title videoUrl');
  }

  public async updateSection(id: string, updateData: Partial<ISection>): Promise<ISection | null> {
    const section = await Section.findById(id);
    if (!section) return null;

    section.editHistory.push({
      sectionTitle: section.sectionTitle,
      editedAt: new Date(),
    });

    if (updateData.sectionTitle) section.sectionTitle = updateData.sectionTitle;
    section.isEdited = true;
    section.updatedAt = new Date();

    await section.save();
    return section;
  }

  public async deleteSection(id: string): Promise<ISection | null> {
    const section = await Section.findById(id);
    if (!section) return null;

    if (section.authorId) {
      await User.findByIdAndUpdate(section.authorId, {
        $pull: { sections: section._id },
      });
    }

    // Remove the section from the course's sections array
    await Course.findByIdAndUpdate(section.courseId, {
      $pull: { sections: section._id },
    });

    // Optionally delete associated lessons if needed:
    // const Lesson = require('../models/lesson.model').default;
    // await Lesson.deleteMany({ _id: { $in: section.lessons } });

    return await Section.findByIdAndDelete(id);
  }

  public async getSectionsByCourseId(courseId: string): Promise<ISection[]> {
    return await Section.find({ courseId: courseId })
    .populate({ path: 'authorId', select: 'username' })

  }

  public async getSectionsByAuthorId(authorId: string): Promise<ISection[]> {
    return await Section.find({ authorId })
  }
}

export default new SectionService();
