import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkPostOwner } from '../middlewares/post.middleware';
import { logActivity } from '../middlewares/log.middleware';
import multer from 'multer';
import postController from '../controllers/post.controller';

const router = Router();
const upload = multer();

// Create a new post (authentication required, activity logged)
router.post('/', authenticateJWT, logActivity('user_created_post'), upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 5 }]), PostController.createPost.bind(PostController));

// Get all posts
router.get('/', PostController.getPosts.bind(PostController));

// Get a specific post by ID
router.get('/:id', PostController.getPostById.bind(PostController));

// Get posts by user ID
router.get('/user/:userId', PostController.getPostsByUserId.bind(PostController));

// Get posts by thread ID
router.get('/thread/:threadId', PostController.getPostsByThreadId.bind(PostController));

// Update a post (authentication and ownership check required, activity logged)
router.patch('/:id', authenticateJWT, logActivity('user_updated_post'), upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 5 }]), PostController.updatePost.bind(PostController));

// Delete a post (authentication and ownership check required, activity logged)
router.delete('/:id', authenticateJWT, logActivity('user_deleted_post'), PostController.deletePost.bind(PostController));

// Increment view count for a game
router.patch("/:id/views", postController.incrementViewCount.bind(postController));

export default router;
