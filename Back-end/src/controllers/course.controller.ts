import { Request, Response } from 'express';
import CourseService from '../services/course.service';

class CourseController {
    public async createCourse(req: Request, res: Response): Promise<void> {
        try {
            const course = await CourseService.createCourse(req.body);
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

    public async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            const course = await CourseService.updateCourse(req.params.id, req.body);
            if (!course) res.status(404).json({ message: 'Course not found' });
            else res.status(200).json(course);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteCourse(req: Request, res: Response): Promise<void> {
        try {
            const course = await CourseService.deleteCourse(req.params.id);
            if (!course) res.status(404).json({ message: 'Course not found' });
            else res.status(200).json({ message: 'Course deleted' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CourseController();
