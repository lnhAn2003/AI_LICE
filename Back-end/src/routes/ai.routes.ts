// routes/ai.routes.ts

import { Router } from 'express';
import aiController from '../controllers/ai.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = Router();

const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many AI requests from this IP, please try again after 15 minutes.',
});

const aiValidationRules = [
  body('interactionType').isString().withMessage('interactionType must be a string.').notEmpty().withMessage('interactionType is required.'),
  body('request').isString().withMessage('request must be a string.').notEmpty().withMessage('request is required.'),
  body('sourceLanguage').optional().isString().withMessage('sourceLanguage must be a string.'),
  body('targetLanguage').optional().isString().withMessage('targetLanguage must be a string.'),
];

// Route to handle AI interactions
router.post('/interact', aiRateLimiter, authenticateJWT, aiValidationRules, aiController.interact.bind(aiController));

// Fetch past interactions for the authenticated user
router.get('/past-interactions', authenticateJWT, aiController.getPastInteractions.bind(aiController));


export default router;
