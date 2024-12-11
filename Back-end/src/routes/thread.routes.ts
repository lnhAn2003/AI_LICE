import { Router } from 'express';
import ThreadController from '../controllers/thread.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkThreadOwner } from '../middlewares/thread.middleware';
import { logActivity } from '../middlewares/log.middleware';
import multer from "multer";

const router = Router();
const upload = multer();

// Create a new thread (authentication required, activity logged)
router.post('/', authenticateJWT, logActivity('user_created_thread (userId: {$id}, threadTitle: {$title})'), upload.fields([{ name: "file", maxCount: 1 }, { name: "images", maxCount: 5 }]), ThreadController.createThread.bind(ThreadController));

// Get all threads
router.get('/', ThreadController.getThreads.bind(ThreadController));

// Get threads by userId
router.get('/user/:userId', ThreadController.getThreadsByUserId.bind(ThreadController));

// Get a specific thread by ID
router.get('/:id', ThreadController.getThreadById.bind(ThreadController));

// Update a thread (authentication and ownership check required, activity logged)
router.patch('/:id', authenticateJWT, checkThreadOwner, logActivity('user_updated_thread'), upload.fields([{ name: "file", maxCount: 1 }, { name: "images", maxCount: 5 }]),ThreadController.updateThread.bind(ThreadController));

// Soft delete a thread (authentication and ownership check required, activity logged)
router.delete('/:id', authenticateJWT, checkThreadOwner, logActivity('user_soft_deleted_thread'), ThreadController.softDeleteThread.bind(ThreadController));

// Delete a thread (authentication and ownership check required, activity logged)
router.delete('/permanentDel/:id', authenticateJWT, checkThreadOwner, logActivity('user_deleted_thread'), ThreadController.deleteThread.bind(ThreadController));

export default router;
