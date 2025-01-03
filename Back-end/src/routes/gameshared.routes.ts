import { Router } from "express";
import multer from 'multer';
import gameSharedController from "../controllers/gameshared.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { checkGameSharedOwner } from "../middlewares/gameshared.middleware";
import { logActivity } from "../middlewares/log.middleware";

const router = Router();
const upload = multer();

// Create a new game
router.post("/", authenticateJWT, logActivity('user_created_game'), upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 5 },]), gameSharedController.createGameShared.bind(gameSharedController));

// Get all games with activity logging
router.get("/", gameSharedController.getAllGameShared.bind(gameSharedController));

// Search games
router.get('/search', gameSharedController.searchGames.bind(gameSharedController));

// Get a specific game by ID
router.get("/:id", gameSharedController.getGameSharedById.bind(gameSharedController));

// Update a game
router.patch("/:id", authenticateJWT, checkGameSharedOwner, logActivity('user_updated_game'), upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 5 }]), gameSharedController.updateGameShared.bind(gameSharedController));

// Delete a game
router.delete("/:id", authenticateJWT, checkGameSharedOwner, logActivity('user_deleted_game'), gameSharedController.deleteGameShared.bind(gameSharedController));

// Increment view count for a game
router.patch("/:id/views", gameSharedController.incrementViewCount.bind(gameSharedController));

// Add a rating to a game
router.patch("/:id/ratings", authenticateJWT, logActivity('user_rated_game'), gameSharedController.addRating.bind(gameSharedController));

// Add a game to favorites
router.patch("/:id/addfav", authenticateJWT, logActivity('user_favorited_game'), gameSharedController.addFavorite.bind(gameSharedController));

// Remove a game from favorites
router.patch("/:id/removefav", authenticateJWT, logActivity('user_unfavorited_game'), gameSharedController.removeFavorite.bind(gameSharedController));

// Vote on game success
router.patch("/:id/successvote", authenticateJWT, logActivity('user_voted_on_game_success'), gameSharedController.SuccessVote.bind(gameSharedController));

// Add a changelog entry
router.patch('/:id/changelog', authenticateJWT, checkGameSharedOwner, logActivity('user_updated_game_changelog'), gameSharedController.addChangelogEntry.bind(gameSharedController));

//Increase download count
router.patch('/:id/download', authenticateJWT, logActivity('user_download_game'), gameSharedController.increaseDownloadCount.bind(gameSharedController));

export default router;
