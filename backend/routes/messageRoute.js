// routes/messageRoute.js
import express from 'express';
import { getMessages, saveMessage } from '../controllers/messageController.js';
const router = express.Router();

// GET messages by appointmentId
router.get('/:appointmentId', getMessages);

// POST new message
router.post('/', saveMessage);

export default router;
