import express from 'express';
import { registerUser, loginUser, fetchContent } from '../controllers/user.js';
import {authenticateToken} from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/dashboard', authenticateToken, fetchContent);

export default router;