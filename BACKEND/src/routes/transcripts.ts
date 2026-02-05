import { Router } from 'express';
import { verifyAuth } from '../middleware/auth.js';
import {
  createTranscript,
  getTranscripts,
  getTranscript,
  updateTranscript,
  deleteTranscript
} from '../controllers/transcriptController.js';

const router = Router();

router.post('/', verifyAuth, createTranscript);
router.get('/', verifyAuth, getTranscripts);
router.get('/:id', verifyAuth, getTranscript);
router.patch('/:id', verifyAuth, updateTranscript);
router.delete('/:id', verifyAuth, deleteTranscript);

export default router;
