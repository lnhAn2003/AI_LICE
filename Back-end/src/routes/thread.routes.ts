import { Router } from 'express';
import ThreadController from '../controllers/thread.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkThreadOwner } from '../middlewares/thread.middleware';
import { logActivity } from '../middlewares/log.middleware';

const router = Router();

// Create a new thread (authentication required, activity logged)
router.post('/', authenticateJWT, logActivity('user_created_thread (userId: {$id}, threadTitle: {$title})'), ThreadController.createThread.bind(ThreadController));

// Get all threads
router.get('/', ThreadController.getThreads.bind(ThreadController));

// Get a specific thread by ID
router.get('/:id', ThreadController.getThreadById.bind(ThreadController));

// Update a thread (authentication and ownership check required, activity logged)
router.put('/:id', authenticateJWT, checkThreadOwner, logActivity('user_updated_thread'), ThreadController.updateThread.bind(ThreadController));

// Delete a thread (authentication and ownership check required, activity logged)
router.delete('/:id', authenticateJWT, checkThreadOwner, logActivity('user_deleted_thread'), ThreadController.deleteThread.bind(ThreadController));

export default router;
