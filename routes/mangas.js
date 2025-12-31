import express from 'express';
import {
  getAllMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga
} from '../controllers/mangasController.js';

const router = express.Router();

router.get('/', getAllMangas);
router.get('/:id', getMangaById);
router.post('/', createManga);
router.put('/:id', updateManga);
router.patch('/:id', updateManga);
router.delete('/:id', deleteManga);

export default router;


