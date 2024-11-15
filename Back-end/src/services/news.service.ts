import mongoose from "mongoose";
import News, { INews } from "../models/news.model";

class NewsService {
  public async createNews(newsData: Partial<INews>): Promise<INews> {
    const news = new News(newsData);
    return await news.save();
  }

  public async getAllNews(): Promise<INews[]> {
    return await News.find().populate({ path: 'authorId', select: 'username' });
  }

  public async getNewsById(id: string): Promise<INews | null> {
    return await News.findById(id).populate({ path: 'authorId', select: 'username' });
  }

  public async updateNews(id: string, updateData: Partial<INews>): Promise<INews | null> {
    return await News.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async deleteNews(id: string): Promise<INews | null> {
    return await News.findByIdAndDelete(id);
  }

  public async incrementViewCount(id: string): Promise<void> {
    await News.findByIdAndUpdate(id, { $inc: { views: 1 } });
  }
}

export default new NewsService();
