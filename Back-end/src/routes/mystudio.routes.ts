import { Router } from "express";
import MyStudioController from "../controllers/mystudio.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

// Fetch all content related to a user 
router.get("/:id/studio", authenticateJWT, MyStudioController.getMyStudio.bind(MyStudioController));

export default router;
