import { Router } from "express";
import gameSharedController from "../controllers/gameshared.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { checkGameSharedOwner } from "../middlewares/gameshared.middleware";

const router = Router();

router.post("/", authenticateJWT, gameSharedController.createGameShared.bind(gameSharedController));
router.get("/", gameSharedController.getAllGameShared.bind(gameSharedController));
router.get("/:id", gameSharedController.getGameSharedById.bind(gameSharedController));
router.put("/:id", authenticateJWT, checkGameSharedOwner, gameSharedController.updateGameShared.bind(gameSharedController));
router.delete("/:id", authenticateJWT, checkGameSharedOwner, gameSharedController.deleteGameShared.bind(gameSharedController));
router.patch("/:id/views", gameSharedController.incrementViewCount.bind(gameSharedController));
router.patch("/:id/ratings",authenticateJWT, gameSharedController.addRating.bind(gameSharedController));
router.patch("/:id/addfav", authenticateJWT, gameSharedController.addFavorite.bind(gameSharedController));
router.patch("/:id/removefav", authenticateJWT, gameSharedController.removeFavorite.bind(gameSharedController));
router.patch("/:id/successvote", authenticateJWT, gameSharedController.SuccessVote.bind(gameSharedController));
router.patch('/:id/changelog', authenticateJWT, checkGameSharedOwner, gameSharedController.addChangelogEntry.bind(gameSharedController));

export default router;
