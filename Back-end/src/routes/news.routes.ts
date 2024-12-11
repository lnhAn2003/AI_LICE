import { Router } from "express";
import newsController from "../controllers/news.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { checkRoleAndPermission } from '../middlewares/role.middleware';

const router = Router();

// Create a new news article
router.post("/", authenticateJWT,  checkRoleAndPermission('Admin', 'manage_news'), newsController.createNews.bind(newsController));

// Get all news articles
router.get("/", newsController.getAllNews.bind(newsController));

// Get a specific news article by ID
router.get("/:id", newsController.getNewsById.bind(newsController));

// Update a news article
router.patch("/:id", authenticateJWT,  checkRoleAndPermission('Admin', 'manage_news'), newsController.updateNews.bind(newsController));

// Delete a news article
router.delete("/:id", authenticateJWT,  checkRoleAndPermission('Admin', 'manage_news'), newsController.deleteNews.bind(newsController));

// Increment view count for a news article
router.patch("/:id/views", newsController.incrementViewCount.bind(newsController));

export default router;
