import express from 'express';

import * as userController from '../controller/user.js';
import isAuth from '../middleware/isAuth.js';
import authValidation from '../middleware/validation/authValidation.js';

const router = express.Router();

router.post('/login', userController.login);

router.post('/register', authValidation.signup, userController.register);

router.get('/logout', isAuth, userController.logout);

router.get('/me', isAuth, userController.me);

router.get('/', userController.getUsers);

export default router;
