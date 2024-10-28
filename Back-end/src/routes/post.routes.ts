import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkPostOwner } from '../middlewares/post.middleware';

const router = Router();

router.post('/', authenticateJWT, PostController.createPost.bind(PostController));
router.get('/', PostController.getPosts.bind(PostController));
router.get('/:id', PostController.getPostById.bind(PostController));
router.put('/:id', authenticateJWT, checkPostOwner, PostController.updatePost.bind(PostController));
router.delete('/:id', authenticateJWT, checkPostOwner, PostController.deletePost.bind(PostController))

export default router;