import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
import { validateNews, validateNewsUpdate, validatePagination } from '../middleware/validation.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /news - List all news (with pagination, search, filter)
router.get('/', validatePagination, getAllNews);

// GET /news/:id - Get single news
router.get('/:id', getNewsById);

// POST /news - Create new news (authenticated)
router.post('/', authenticate, validateNews, createNews);

// PUT /news/:id - Update news (authenticated)
router.put('/:id', authenticate, validateNewsUpdate, updateNews);

// DELETE /news/:id - Delete news (admin only)
router.delete('/:id', authenticate, requireAdmin, deleteNews);

export default router;


