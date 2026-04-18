import express from 'express';
import { body } from 'express-validator';
import {
  registerUserMock,
  loginUserMock,
  getUserByIdMock,
  updateUserMock,
  getCurrentUserMock
} from '../controllers/user.mock.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('phone').optional().trim()
  ],
  handleValidationErrors,
  registerUserMock
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  handleValidationErrors,
  loginUserMock
);

router.get('/profile', authenticate, getCurrentUserMock);

router.get('/:id', getUserByIdMock);

router.put(
  '/:id',
  [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('phone').optional().trim(),
    body('address').optional().isObject()
  ],
  handleValidationErrors,
  updateUserMock
);

export default router;
