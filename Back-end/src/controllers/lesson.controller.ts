// src/controllers/lesson.controller.ts

import { Request, Response } from 'express';
import LessonService from '../services/lesson.service';
import UserService from '../services/user.service';
import mongoose from 'mongoose';
import { ILesson } from '../models/lessons.model';

export interface AuthRequest extends Request {
  user?: { id: string };
}

class LessonController {
  public async createLesson(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      await UserService.updateLastActiveStatus(user.id, true);

      const authorId = new mongoose.Types.ObjectId(user.id);
      const lessonData: Partial<ILesson> = {
        authorId,
        sectionId: new mongoose.Types.ObjectId(req.body.sectionId),
        title: req.body.title,
        videoUrl: req.body.videoUrl,
        textContent: req.body.textContent,
        resources: req.body.resources,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const lesson = await LessonService.createLesson(lessonData);
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
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const lesson = await LessonService.updateLesson(req.params.id, req.body);
      if (!lesson) {
        res.status(404).json({ message: 'Lesson not found' });
      } else {
        res.status(200).json(lesson);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
