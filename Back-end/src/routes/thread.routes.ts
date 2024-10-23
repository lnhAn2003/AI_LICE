import { Router } from 'express';
import ThreadController from '../controllers/thread.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkThreadOwner } from '../middlewares/thread.middleware';

const router = Router();

router.post('/', authenticateJWT, ThreadController.createThread.bind(ThreadController));
router.get('/', ThreadController.getThreads.bind(ThreadController));
router.get('/:id', ThreadController.getThreadById.bind(ThreadController));
router.put('/:id', authenticateJWT, ThreadController.updateThread.bind(ThreadController));
router.delete('/:id', authenticateJWT,checkThreadOwner, ThreadController.deleteThread.bind(ThreadController));

export default router;
