import express from 'express';
import {
  getAllMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga
<<<<<<< HEAD
} from '../controllers/mangaController.js';
import { validateManga, validatePagination } from '../middleware/validation.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /mangas - List all mangas (with pagination, search, sort)
router.get('/', validatePagination, getAllMangas);

// GET /mangas/:id - Get single manga
router.get('/:id', getMangaById);

// POST /mangas - Create new manga (authenticated)
router.post('/', authenticate, validateManga, createManga);

// PUT /mangas/:id - Update manga (authenticated)
router.put('/:id', authenticate, validateManga, updateManga);

// DELETE /mangas/:id - Delete manga (admin only)
router.delete('/:id', authenticate, requireAdmin, deleteManga);
=======
} from '../controllers/mangasController.js';

const router = express.Router();

router.get('/', getAllMangas);
router.get('/:id', getMangaById);
router.post('/', createManga);
router.put('/:id', updateManga);
router.patch('/:id', updateManga);
router.delete('/:id', deleteManga);
>>>>>>> 59775988cc5591501086a0950bf39b14e17599d8

export default router;


