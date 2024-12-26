// controllers/ai.controller.ts
import { Request, Response } from 'express';
import AIService from '../services/ai.service';
import IAIInteraction from '../models/ai.model';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

class AIController {
  public async interact(req: AuthRequest, res: Response): Promise<void> {
    const { interactionType, request, sourceLanguage, targetLanguage } = req.body;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const aiResponse = await AIService.interact(
        user.id,
        interactionType,
        request,
        sourceLanguage,
        targetLanguage
      );
      res.status(200).json({ response: aiResponse });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  public async getPastInteractions(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id; // Assuming `authenticateJWT` middleware adds user info to the request

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const interactions = await IAIInteraction.find({ userId })
        .sort({ createdAt: -1 }) // Most recent interactions first
        .select('interactionType request response createdAt') // Include only relevant fields
        .lean();

      res.status(200).json(interactions);
    } catch (error: any) {
      console.error('Error fetching past interactions:', error.message || error);
      res.status(500).json({ message: 'Failed to fetch past interactions' });
    }
  }
}

export default new AIController();
