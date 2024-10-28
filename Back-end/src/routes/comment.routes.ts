import express from 'express';
import CommentController from '../controllers/comment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkCommentOwner } from '../middlewares/comment.middleware';

const router = express.Router();

router.post('/', authenticateJWT, CommentController.createComment.bind(CommentController));
router.get('/:targetType/:targetId', CommentController.getCommentByTarget.bind(CommentController));
router.get('/:id', CommentController.getCommentById.bind(CommentController));
router.put('/:id', authenticateJWT, checkCommentOwner, CommentController.updateComment.bind(CommentController));
router.delete('/:id', authenticateJWT, checkCommentOwner, CommentController.deleteComment.bind(CommentController));

export default router;
