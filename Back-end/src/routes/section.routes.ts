// src/routes/section.routes.ts

import { Router } from 'express';
import sectionController from '../controllers/section.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { logActivity } from '../middlewares/log.middleware';

const router = Router();

// Create a new section in a course
router.post('/', authenticateJWT, logActivity('user_created_section'), sectionController.createSection.bind(sectionController));

// Get all sections
router.get('/', logActivity('user_viewed_sections'), sectionController.getAllSections.bind(sectionController));

// Get sections by course ID
router.get('/course/:courseId', logActivity('user_viewed_sections_by_course'), sectionController.getSectionsByCourseId.bind(sectionController));

// If you track sections by author
router.get('/author/:authorId', logActivity('user_viewed_sections_by_author'), sectionController.getSectionsByAuthorId.bind(sectionController));

// Get a section by ID
router.get('/:id', logActivity('user_viewed_section'), sectionController.getSectionById.bind(sectionController));

// Update a section
router.patch('/:id', authenticateJWT, logActivity('user_updated_section'), sectionController.updateSection.bind(sectionController));

// Delete a section
router.delete('/:id', authenticateJWT, logActivity('user_deleted_section'), sectionController.deleteSection.bind(sectionController));

export default router;
