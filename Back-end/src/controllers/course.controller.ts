import { Request, Response } from "express";
import CourseService from "../services/course.service";

export interface AuthRequest extends Request {
  user?: { id: string };
}

class CourseController {
  public async createCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const courseData = {
        ...req.body,
        createdBy: user.id,
      };

      const course = await CourseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
      res.status(200).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const updatedCourse = await CourseService.updateCourse(
        req.params.id,
        req.body
      );
      if (!updatedCourse) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteCourse(req: AuthRequest, res: Response): Promise<void> {
    try {
      const deletedCourse = await CourseService.deleteCourse(req.params.id);
      if (!deletedCourse) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async addRating(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: courseId } = req.params;
      const userId = req.user?.id;
      const { rating, comment } = req.body;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const updatedCourse = await CourseService.addRating(
        courseId,
        userId,
        rating,
        comment
      );
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
