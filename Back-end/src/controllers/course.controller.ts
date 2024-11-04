import { Request, Response } from 'express';
import CourseService from '../services/course.service';
import mongoose from 'mongoose';
import { IComment } from '../models/comment.model';
import { ICourse } from '../models/course.model';

export interface AuthRequest extends Request {
  user?: any;
}

class CourseController {
  public async createCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const createdBy = new mongoose.Types.ObjectId(user.id);

      const courseData = {
        ...req.body,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const course = await CourseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getCourses();
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) res.status(404).json({ message: 'Course not found' });
      else res.status(200).json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const course = await CourseService.updateCourse(req.params.id, req.body);
      if (!course) res.status(404).json({ message: 'Course not found' });
      else res.status(200).json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const course = await CourseService.deleteCourse(req.params.id);
      if (!course) res.status(404).json({ message: 'Course not found' });
      else res.status(200).json({ message: 'Course deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async addRating(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: courseId } = req.params;
      const userId = req.user?.id;
      const { rating, comment } = req.body;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (!rating || rating < 1 || rating > 5) {
        res.status(400).json({ message: 'Rating must be between 1 and 5' });
        return;
      }

      const updatedCourse = await CourseService.addRating(courseId, userId, rating, comment);
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async addFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: courseId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const updatedCourse = await CourseService.addFavorite(courseId, userId);
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async removeFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: courseId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const updatedCourse = await CourseService.removeFavorite(courseId, userId);
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async searchCourses(req: Request, res: Response): Promise<void> {
    try {
      const { title, categories, tags, minRating } = req.query;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const sortField = (req.query.sortField as string) || 'createdAt';
      const sortOrder = (req.query.sortOrder as string) || 'desc';

      const courses = await CourseService.searchCourses({
        title: title as string,
        categories: categories ? (categories as string).split(',') : undefined,
        tags: tags ? (tags as string).split(',') : undefined,
        minRating: minRating ? parseFloat(minRating as string) : undefined
      }, page, limit, sortField as keyof ICourse, sortOrder as 'asc' | 'desc');

      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
