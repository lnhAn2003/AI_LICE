import { Request, Response } from 'express';
import AIInteractionService from '../services/ai.service';

class AIInteractionController {
  public async createInteraction(req: Request, res: Response): Promise<void> {
    try {
      const interaction = await AIInteractionService.createInteraction(req.body);
      res.status(201).json(interaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getInteractionsByUser(req: Request, res: Response): Promise<void> {
    try {
      const interactions = await AIInteractionService.getInteractionsByUser(req.params.userId);
      res.status(200).json(interactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getInteractionById(req: Request, res: Response): Promise<void> {
    try {
      const interaction = await AIInteractionService.getInteractionById(req.params.id);
      if (!interaction) res.status(404).json({ message: 'Interaction not found' });
      else res.status(200).json(interaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteInteraction(req: Request, res: Response): Promise<void> {
    try {
      const interaction = await AIInteractionService.deleteInteraction(req.params.id);
      if (!interaction) res.status(404).json({ message: 'Interaction not found' });
      else res.status(200).json({ message: 'Interaction deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AIInteractionController();
