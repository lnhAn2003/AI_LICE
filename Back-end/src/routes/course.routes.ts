import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, CourseController.createCourse.bind(CourseController));
router.get('/', CourseController.getCourses.bind(CourseController));
router.get('/:id', CourseController.getCourseById.bind(CourseController));
router.put('/:id', authenticateJWT, CourseController.updateCourse.bind(CourseController));
router.delete('/:id', authenticateJWT, CourseController.deleteCourse.bind(CourseController));

export default router;
