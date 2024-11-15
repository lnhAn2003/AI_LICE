import { Request, Response } from "express";
import NewsService from "../services/news.service";
import mongoose from "mongoose";
import { INews } from "../models/news.model";

export interface AuthRequest extends Request {
  user?: any;
}

class NewsController {
  public async createNews(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const authorId = new mongoose.Types.ObjectId(user.id);

      const newsData = {
        ...req.body,
        authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const news = await NewsService.createNews(newsData);
      res.status(201).json(news);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getAllNews(req: Request, res: Response): Promise<void> {
    try {
      const newsList = await NewsService.getAllNews();
      res.status(200).json(newsList);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getNewsById(req: Request, res: Response): Promise<void> {
    try {
      const news = await NewsService.getNewsById(req.params.id);
      if (!news) res.status(404).json({ message: "News not found" });
      else res.status(200).json(news);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateNews(req: AuthRequest, res: Response): Promise<void> {
    try {
      const news = await NewsService.updateNews(req.params.id, req.body);
      if (!news) res.status(404).json({ message: "News not found" });
      else res.status(200).json(news);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteNews(req: AuthRequest, res: Response): Promise<void> {
    try {
      const news = await NewsService.deleteNews(req.params.id);
      if (!news) res.status(404).json({ message: "News not found" });
      else res.status(200).json({ message: "News deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async incrementViewCount(req: Request, res: Response): Promise<void> {
    try {
      await NewsService.incrementViewCount(req.params.id);
      res.status(200).json({ message: "News view incremented" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new NewsController();
