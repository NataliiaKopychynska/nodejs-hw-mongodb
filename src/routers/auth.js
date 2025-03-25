import express from 'express';

import {
  registerController,
  loginController,
  logoutController,
  refreshController,
} from '../controllers/auth.js';
import { ctrWrapper } from '../utils/ctrlWrapper.js';
import { registerSchema, loginSchema } from '../validation/userSchema.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrWrapper(registerController),
);

router.post(
  '/auth/login',
  jsonParser,
  validateBody(loginSchema),
  ctrWrapper(loginController),
);

router.post('/auth/refresh', ctrWrapper(refreshController));

router.post('/auth/logout', ctrWrapper(logoutController));

export default router;
