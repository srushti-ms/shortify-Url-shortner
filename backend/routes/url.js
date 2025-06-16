import express from 'express';

import {authenticateToken} from '../middleware/auth.js';

import  {generateNewUrl,  redirectUrl, getcount}  from '../controllers/url.js';

const router = express.Router();

router.post('/create',authenticateToken, generateNewUrl);

router.get('/:shortId', redirectUrl);

router.get('/:shortId/count', getcount);

export default router;