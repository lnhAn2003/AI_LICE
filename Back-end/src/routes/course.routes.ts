import { Router } from "express";
import multer from 'multer';
import courseController from "../controllers/course.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { logActivity } from "../middlewares/log.middleware";

const router = Router();
const upload = multer();

// Create a new course
router.post("/", authenticateJWT, logActivity("user_created_course"), upload.fields([{ name: "images", maxCount: 5 }, { name: "resources", maxCount: 10 }]),courseController.createCourse.bind(courseController));

// Get all courses
router.get("/",logActivity("user_viewed_courses"), courseController.getAllCourses.bind(courseController));

// Get a specific course by ID
router.get("/:id", logActivity("user_viewed_course"), courseController.getCourseById.bind(courseController));

// Update a course
router.patch("/:id", authenticateJWT, logActivity("user_updated_course"), upload.fields([{ name: "images", maxCount: 5 }, { name: "resources", maxCount: 10 }]), courseController.updateCourse.bind(courseController));

// Delete a course
router.delete( "/:id", authenticateJWT, logActivity("user_deleted_course"), courseController.deleteCourse.bind(courseController));

// Add a rating to a course
router.patch("/:id/ratings", authenticateJWT, logActivity("user_rated_course"), courseController.addRating.bind(courseController));

export default router;
