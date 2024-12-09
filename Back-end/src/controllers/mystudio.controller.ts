import { Request, Response } from "express";
import MyStudioService from "../services/mystudio.service";

class MyStudioController {
  public async getMyStudio(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id; 
      const studioContent = await MyStudioService.fetchUserContent(userId);

      res.status(200).json({ success: true, data: studioContent });
    } catch (error: any) {
      console.error("Error fetching My Studio content:", error);
      res.status(500).json({ success: false, message: "Unable to fetch My Studio content" });
    }
  }
}

export default new MyStudioController();
