// src/controllers/lesson.controller.ts

import { Request, Response } from 'express';
import LessonService from '../services/lesson.service';
import UserService from '../services/user.service';
import mongoose from 'mongoose';
import { ILesson } from '../models/lesson.model';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

class LessonController {
  public async createLesson(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const files = req.files as MulterFiles | undefined;
      const resources = files?.['resources']?.map((file) => ({
        buffer: file.buffer,
        mimeType: file.mimetype,
        originalname: file.originalname,
      }));

      const lessonData = {
        ...req.body,
        authorId: new mongoose.Types.ObjectId(user.id),
        sectionId: new mongoose.Types.ObjectId(req.body.sectionId),
      };

      const lesson = await LessonService.createLesson(lessonData, resources);
      res.status(201).json(lesson);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getLessons(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await LessonService.getLessons();
      res.status(200).json(lessons);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getLessonById(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await LessonService.getLessonById(req.params.id);
      if (!lesson) res.status(404).json({ message: 'Lesson not found' });
      else res.status(200).json(lesson);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getLessonsByAuthorId(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await LessonService.getLessonsByAuthorId(req.params.authorId);
      res.status(200).json(lessons);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getLessonsBySectionId(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await LessonService.getLessonsBySectionId(req.params.sectionId);
      res.status(200).json(lessons);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateLesson(req: AuthRequest, res: Response): Promise<void> {
    try {
      const files = req.files as MulterFiles | undefined;
      const resources = files?.['resources']?.map((file) => ({
        buffer: file.buffer,
        mimeType: file.mimetype,
        originalname: file.originalname,
      }));

      const updatedLesson = await LessonService.updateLesson(req.params.id, req.body, resources);

      if (!updatedLesson) {
        res.status(404).json({ message: 'Lesson not found' });
        return;
      }

      res.status(200).json(updatedLesson);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteLesson(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const lesson = await LessonService.deleteLesson(req.params.id);
      if (!lesson) res.status(404).json({ message: 'Lesson not found' });
      else res.status(200).json({ message: 'Lesson deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new LessonController();
