import { Router } from "express";
import courseController from "../controllers/course.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { logActivity } from "../middlewares/log.middleware";

const router = Router();

// Create a new course
router.post("/", authenticateJWT, logActivity("user_created_course"), courseController.createCourse.bind(courseController));

// Get all courses
router.get("/",logActivity("user_viewed_courses"), courseController.getAllCourses.bind(courseController));

// Get a specific course by ID
router.get("/:id", logActivity("user_viewed_course"), courseController.getCourseById.bind(courseController));

// Update a course
router.put("/:id", authenticateJWT, logActivity("user_updated_course"), courseController.updateCourse.bind(courseController));

// Delete a course
router.delete( "/:id", authenticateJWT, logActivity("user_deleted_course"), courseController.deleteCourse.bind(courseController));

// Add a rating to a course
router.patch("/:id/ratings", authenticateJWT, logActivity("user_rated_course"), courseController.addRating.bind(courseController));

export default router;
