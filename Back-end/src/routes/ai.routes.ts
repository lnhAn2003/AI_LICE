import { Router } from 'express';
import AIInteractionController from '../controllers/ai.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, AIInteractionController.createInteraction.bind(AIInteractionController));
router.get('/user/:userId', authenticateJWT, AIInteractionController.getInteractionsByUser.bind(AIInteractionController));
router.get('/:id', authenticateJWT, AIInteractionController.getInteractionById.bind(AIInteractionController));
router.delete('/:id', authenticateJWT, AIInteractionController.deleteInteraction.bind(AIInteractionController));

export default router;
