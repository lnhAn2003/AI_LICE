import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { logActivity } from "../middlewares/log.middleware";

const router = Router();

// Search for courses by title, categories, tags, and minimum rating
router.get('/search', CourseController.searchCourses.bind(CourseController));

// Create a new course (requires authentication and logs the activity)
router.post('/', authenticateJWT, logActivity('user_created_course'), CourseController.createCourse.bind(CourseController));

// Get all courses
router.get('/', CourseController.getCourses.bind(CourseController));

// Get a specific course by ID
router.get('/:id', CourseController.getCourseById.bind(CourseController));

// Update a course by ID (requires authentication)
router.put('/:id', authenticateJWT, logActivity('user_updated_course'), CourseController.updateCourse.bind(CourseController));

// Delete a course by ID (requires authentication and logs the activity)
router.delete('/:id', authenticateJWT, logActivity('user_deleted_course'), CourseController.deleteCourse.bind(CourseController));

// Add a rating to a course (requires authentication and logs the activity)
router.patch("/:id/ratings", authenticateJWT, logActivity('user_rated_course'), CourseController.addRating.bind(CourseController));

// Add a course to favorites (requires authentication and logs the activity)
router.patch("/:id/addfav", authenticateJWT, logActivity('user_favorited_course'), CourseController.addFavorite.bind(CourseController));

// Remove a course from favorites (requires authentication and logs the activity)
router.patch("/:id/removefav", authenticateJWT, logActivity('user_unfavorited_course'), CourseController.removeFavorite.bind(CourseController));

export default router;
