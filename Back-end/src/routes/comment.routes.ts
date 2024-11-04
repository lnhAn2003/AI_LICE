import express from 'express';
import CommentController from '../controllers/comment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkCommentOwner } from '../middlewares/comment.middleware';

const router = express.Router();

// Create a new comment (requires authentication)
router.post('/', authenticateJWT, CommentController.createComment.bind(CommentController));

// Get all comments for a specific target type and ID (e.g., for a course, game, etc.)
router.get('/:targetType/:targetId', CommentController.getCommentByTarget.bind(CommentController));

// Get a specific comment by ID
router.get('/:id', CommentController.getCommentById.bind(CommentController));

// Update a comment by ID (requires authentication and comment ownership check)
router.put('/:id', authenticateJWT, checkCommentOwner, CommentController.updateComment.bind(CommentController));

// Delete a comment by ID (requires authentication and comment ownership check)
router.delete('/:id', authenticateJWT, checkCommentOwner, CommentController.deleteComment.bind(CommentController));

export default router;
