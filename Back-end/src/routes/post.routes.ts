import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkPostOwner } from '../middlewares/post.middleware';
import { logActivity } from '../middlewares/log.middleware';

const router = Router();

// Create a new post (authentication required, activity logged)
router.post('/', authenticateJWT, logActivity('user_created_post'), PostController.createPost.bind(PostController));

// Get all posts
router.get('/', PostController.getPosts.bind(PostController));

// Get a specific post by ID
router.get('/:id', PostController.getPostById.bind(PostController));

// Update a post (authentication and ownership check required, activity logged)
router.put('/:id', authenticateJWT, checkPostOwner, logActivity('user_updated_post'), PostController.updatePost.bind(PostController));

// Delete a post (authentication and ownership check required, activity logged)
router.delete('/:id', authenticateJWT, checkPostOwner, logActivity('user_deleted_post'), PostController.deletePost.bind(PostController));

export default router;
