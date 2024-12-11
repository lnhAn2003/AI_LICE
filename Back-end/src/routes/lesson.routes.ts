// src/routes/lesson.routes.ts

import { Router } from 'express';
import lessonController from '../controllers/lesson.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { logActivity } from '../middlewares/log.middleware';

const router = Router();

// Create a new lesson
router.post('/', authenticateJWT, logActivity('user_created_lesson'), lessonController.createLesson.bind(lessonController));

// Get all lessons
router.get('/', logActivity('user_viewed_lessons'), lessonController.getLessons.bind(lessonController));

// Get a specific lesson by ID
router.get('/:id', logActivity('user_viewed_lesson'), lessonController.getLessonById.bind(lessonController));

// Get lessons by author ID
router.get('/author/:authorId', logActivity('user_viewed_lessons_by_author'), lessonController.getLessonsByAuthorId.bind(lessonController));

// Get lessons by section ID
router.get('/section/:sectionId', logActivity('user_viewed_lessons_by_section'), lessonController.getLessonsBySectionId.bind(lessonController));

// Update a lesson
router.patch('/:id', authenticateJWT, logActivity('user_updated_lesson'), lessonController.updateLesson.bind(lessonController));

// Delete a lesson
router.delete('/:id', authenticateJWT, logActivity('user_deleted_lesson'), lessonController.deleteLesson.bind(lessonController));

export default router;
