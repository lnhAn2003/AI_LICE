import express from 'express';
import CommentController from '../controllers/comment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkCommentOwner } from '../middlewares/comment.middleware';
import multer from "multer";

const router = express.Router();
const upload = multer();

// Create a new comment (requires authentication)
router.post('/', authenticateJWT, upload.fields([{ name: "file", maxCount: 1 }, { name: "images", maxCount: 5 }]), CommentController.createComment.bind(CommentController));

// Get all comments for a specific target type and ID (e.g., for a course, game, etc.)
router.get('/:targetType/:targetId', CommentController.getCommentByTarget.bind(CommentController));

// Get a specific comment by ID
router.get('/:id', CommentController.getCommentById.bind(CommentController));

// Update a comment by ID (requires authentication and comment ownership check)
router.patch('/:id', authenticateJWT, checkCommentOwner, upload.fields([{ name: "file", maxCount: 1 }, { name: "images", maxCount: 5 }]), CommentController.updateComment.bind(CommentController));

// Delete a comment by ID (requires authentication and comment ownership check)
router.delete('/:id', authenticateJWT, checkCommentOwner, CommentController.softDeleteComment.bind(CommentController));

export default router;
