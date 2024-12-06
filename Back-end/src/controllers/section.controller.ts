// src/controllers/section.controller.ts
import { Request, Response } from 'express';
import SectionService from '../services/section.service';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
  user?: any;
}

class SectionController {
  public async createSection(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const courseId = req.body.courseId;
      const authorId = req.user ? new mongoose.Types.ObjectId(req.user.id) : undefined;

      if (!courseId || !req.body.sectionTitle) {
        res.status(400).json({ message: 'courseId and sectionTitle are required.' });
        return;
      }

      const sectionData = {
        courseId: new mongoose.Types.ObjectId(courseId),
        authorId: authorId,
        sectionTitle: req.body.sectionTitle,
        createdAt: new Date(),
        updatedAt: new Date(),
        lessons: [],
      };

      const section = await SectionService.createSection(sectionData);
      res.status(201).json(section);
    } catch (error: any) {
      if (error.message === 'Course not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  public async getAllSections(req: Request, res: Response): Promise<void> {
    try {
      const sections = await SectionService.getAllSections();
      res.status(200).json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getSectionById(req: Request, res: Response): Promise<void> {
    try {
      const section = await SectionService.getSectionById(req.params.id);
      if (!section) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }
      res.status(200).json(section);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateSection(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const updatedSection = await SectionService.updateSection(id, req.body);
      if (!updatedSection) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }
      res.status(200).json(updatedSection);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteSection(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedSection = await SectionService.deleteSection(id);
      if (!deletedSection) {
        res.status(404).json({ message: 'Section not found' });
        return;
      }
      res.status(200).json({ message: 'Section deleted successfully', section: deletedSection });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getSectionsByCourseId(req: Request, res: Response): Promise<void> {
    try {
      const sections = await SectionService.getSectionsByCourseId(req.params.courseId);
      res.status(200).json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getSectionsByAuthorId(req: Request, res: Response): Promise<void> {
    try {
      const { authorId } = req.params;
      const sections = await SectionService.getSectionsByAuthorId(authorId);
      res.status(200).json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new SectionController();
