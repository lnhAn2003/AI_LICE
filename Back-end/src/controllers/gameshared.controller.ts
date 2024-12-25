import { Request, Response } from "express";
import GameSharedService from "../services/gameshared.service";
import mongoose from "mongoose";
import { IGameShared } from "../models/gameshared.model";
import notificationService from "../services/notification.service";

export interface AuthRequest extends Request {
  user?: any;
}

export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

class GameSharedController {
  public async createGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const uploadedBy = new mongoose.Types.ObjectId(user.id);

      const files = req.files as MulterFiles;

      if (!files || !files['file'] || !files['images']) {
        res.status(400).json({ message: 'File and images are required' });
        return;
      }

      if (!req.body.title || !req.body.description) {
        res.status(400).json({ message: "Title and description are required." });
        return;
      }

      const categories = req.body.categories ? JSON.parse(req.body.categories) : [];
      const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
      const platforms = req.body.platforms ? JSON.parse(req.body.platforms) : [];
      const externalLinks = req.body.externalLinks ? JSON.parse(req.body.externalLinks) : [];


      const gameFile = files['file'][0];
      const imageFiles = files['images'];

      const fileData = {
        buffer: gameFile.buffer,
        mimeType: gameFile.mimetype,
      };

      const imageData = imageFiles.map((img: Express.Multer.File) => ({
        buffer: img.buffer,
        mimeType: img.mimetype,
      }));

      const gameData = {
        ...req.body,
        categories,
        tags,
        platforms,
        externalLinks,
        uploadedBy,
        newRelease: true,
        viewCount: 0,
        downloadCount: 0,
      };

      const game = await GameSharedService.createGameShared(gameData, fileData, imageData);
      const gameId = new mongoose.Types.ObjectId(gameData.id);
      await notificationService.createNotification({
        userId: uploadedBy,
        type: "game_uploaded",
        referenceId: gameId,
        referenceType: "Gameshared",
        message: "You have published new game !",
      });
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
      if (!game) {
        res.status(404).json({ message: "Game not found" });
      } else {
        await GameSharedService.incrementViewCount(req.params.id);
        res.status(200).json(game);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {

      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { id } = req.params;

      const existingGame = await GameSharedService.getGameSharedById(id);
      if (!existingGame) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      if (req.body.externalLinks && typeof req.body.externalLinks === 'string') {
        req.body.externalLinks = JSON.parse(req.body.externalLinks);
      }

      const files = req.files as MulterFiles | undefined;

      const fileData = files?.['file']?.[0]
        ? {
          buffer: files['file'][0].buffer,
          mimeType: files['file'][0].mimetype,
        }
        : undefined;

      const imageData = files?.['images']
        ? files['images'].map((img: Express.Multer.File) => ({
          buffer: img.buffer,
          mimeType: img.mimetype,
        }))
        : undefined;

      const categories =
        typeof req.body.categories === "string"
          ? JSON.parse(req.body.categories)
          : req.body.categories || existingGame.categories;

      const tags =
        typeof req.body.tags === "string"
          ? JSON.parse(req.body.tags)
          : req.body.tags || existingGame.tags;

      const platforms =
        typeof req.body.platforms === "string"
          ? JSON.parse(req.body.platforms)
          : req.body.platforms || existingGame.platforms;

      const updateData = {
        ...req.body,
        categories,
        tags,
        platforms,
      };

      const updatedGame = await GameSharedService.updateGameShared(
        id,
        updateData,
        fileData,
        imageData
      );

      if (!updatedGame) {
        res.status(404).json({ message: "Game not found" });
        return;
      }


      const userId = new mongoose.Types.ObjectId(user.id);
      await notificationService.createNotification({
        userId: userId,
        type: "game_updated",
        referenceId: updatedGame.id,
        referenceType: "Gameshared",
        message: `You have updated your game (${updatedGame.title}) at ${updatedGame.updatedAt}`,
      });

      res.status(200).json(updatedGame);
    } catch (error: any) {
      console.error("Error updating game:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteGameShared(req: AuthRequest, res: Response): Promise<void> {
    try {
      const game = await GameSharedService.deleteGameShared(req.params.id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
      } else {
        res.status(200).json({ message: "Game deleted" });
      }
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

      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
        return;
      }

      const updatedGame = await GameSharedService.addRating(gameId, userId, rating, comment);
      res.status(200).json(updatedGame);
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

      const updatedGame = await GameSharedService.addFavoriteToGame(gameId, userId);
      if (!updatedGame) {
        res.status(404).json({ message: 'Game not found' });
        return;
      }

      await GameSharedService.addFavoriteToUser(userId, gameId);
      res.status(200).json(updatedGame);
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

      const updatedGame = await GameSharedService.removeFavoriteFromGame(gameId, userId);
      if (!updatedGame) {
        res.status(404).json({ message: 'Game not found' });
        return;
      }

      await GameSharedService.removeFavoriteFromUser(userId, gameId);
      res.status(200).json(updatedGame);
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

  public async increaseDownloadCount(req: Request, res: Response): Promise<void> {
    try {
      await GameSharedService.incrementDownloadCount(req.params.id) 
    } catch (error: any) {
      res.status(500).json({ message: error.message});
    }
  }
}

export default new GameSharedController();
