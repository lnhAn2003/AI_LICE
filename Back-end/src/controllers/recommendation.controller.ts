// controllers/recommendation.controller.ts

import { Request, Response } from 'express';
import AIService from '../services/ai.service';

export interface AuthRequest extends Request {
  user?: any;
}

class RecommendationController {
  public async recommend(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const recommendations = await AIService.recommend(user);
      res.status(200).json(recommendations);
    } catch (error: any) {
      console.error('Error generating recommendations:', error.message || error);
      res.status(500).json({ message: error.message || 'Failed to generate recommendations' });
    }
  }
}

export default new RecommendationController();
