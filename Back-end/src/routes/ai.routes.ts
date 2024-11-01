import { Router } from 'express';
import AIInteractionController from '../controllers/ai.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Create a new AI interaction (requires authentication)
router.post('/', authenticateJWT, AIInteractionController.createInteraction.bind(AIInteractionController));

// Get all AI interactions for a specific user by user ID (requires authentication)
router.get('/user/:userId', authenticateJWT, AIInteractionController.getInteractionsByUser.bind(AIInteractionController));

// Get a specific AI interaction by interaction ID (requires authentication)
router.get('/:id', authenticateJWT, AIInteractionController.getInteractionById.bind(AIInteractionController));

// Delete a specific AI interaction by interaction ID (requires authentication)
router.delete('/:id', authenticateJWT, AIInteractionController.deleteInteraction.bind(AIInteractionController));

export default router;
