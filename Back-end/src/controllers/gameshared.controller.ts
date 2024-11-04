import { Request, Response } from "express";
import GameSharedService from "../services/gameshared.service";
import mongoose from "mongoose";
import { IGameShared } from "../models/gameshared.model";

export interface AuthRequest extends Request {
  user?: any;
}

class GameSharedController {
  public async createGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const uploadedBy = new mongoose.Types.ObjectId(user.id);

      const gameData = {
        ...req.body,
        uploadedBy,
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0,
        downloadCount: 0,
      };

      const game = await GameSharedService.createGameShared(gameData);
      res.status(201).json(game);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getAllGameShared(req: Request, res: Response): Promise<void> {
    try {
      const games = await GameSharedService.getAllGameShared();
      res.status(200).json(games);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getGameSharedById(req: Request, res: Response): Promise<void> {
    try {
      const game = await GameSharedService.getGameSharedById(req.params.id);
      if (!game) res.status(404).json({ message: "Game not found" });
      else res.status(200).json(game);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {
      const game = await GameSharedService.updateGameShared(req.params.id, req.body);
      if (!game) res.status(404).json({ message: "Game not found" });
      else res.status(200).json(game);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {
      const game = await GameSharedService.deleteGameShared(req.params.id);
      if (!game) res.status(404).json({ message: "Game not found" });
      else res.status(200).json({ message: "Game deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async incrementViewCount(req: Request, res: Response): Promise<void> {
    try {
      await GameSharedService.incrementViewCount(req.params.id);
      res.status(200).json({ message: "Game view incremented" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async addRating(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: gameId } = req.params;
      const userId = req.user?.id;
      const { comment, rating } = req.body;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (!rating || rating < 1 && rating > 5) {
        res.status(400).json({ message: 'Rating must have value from 1 to 5' });
        return;
      }

      const updateGame = await GameSharedService.addRating(gameId, userId, comment, rating);
      res.status(200).json(updateGame);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async addFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: gameId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const updateGame = await GameSharedService.addFavorite(gameId, userId);
      res.status(200).json(updateGame);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async removeFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: gameId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const updateGame = await GameSharedService.removeFavorite(gameId, userId);
      res.status(200).json(updateGame);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async SuccessVote(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id: gameId } = req.params;
      const userId = req.user?.id;
      const { vote } = req.body;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (vote !== 'like' && vote !== 'dislike') {
        res.status(400).json({ message: 'Vote must be either "like" or "dislike".' });
        return;
      }

      const updatedGame = await GameSharedService.SuccessVote(gameId, userId, vote);
      res.status(200).json(updatedGame);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async addChangelogEntry(req: Request, res: Response): Promise<void> {
    try {
        const { id: gameId } = req.params;
        const { description } = req.body;

        if (!description) {
            res.status(400).json({ message: 'Description is required' });
            return;
        }

        const updatedGame = await GameSharedService.addChangelogEntry(gameId, description);
        res.status(200).json(updatedGame);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  public async searchGames(req: Request, res: Response): Promise<void> {
    try {
      const { title, categories, tags, minRating } = req.query;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const sortField = (req.query.sortField as string) || 'createdAt';
      const sortOrder = (req.query.sortOrder as string) || 'desc';

      const games = await GameSharedService.searchGames({
        title: title as string,
        categories: categories ? (categories as string).split(',') : undefined,
        tags: tags ? (tags as string).split(',') : undefined,
        minRating: minRating ? parseFloat(minRating as string) : undefined
      },
      page, limit, sortField as keyof IGameShared, sortOrder as 'asc' | 'desc'
    );

    res.status(200).json(games);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new GameSharedController();
