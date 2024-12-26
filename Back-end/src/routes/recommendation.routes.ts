// routes/recommendation.routes.ts

import { Router } from 'express';
import RecommendationController from '../controllers/recommendation.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Get recommendations for a specific user
router.get('/', authenticateJWT, RecommendationController.recommend.bind(RecommendationController));


export default router;
