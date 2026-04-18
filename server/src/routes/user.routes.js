import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  getCurrentUser
} from '../controllers/user.controller.js';
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
      .withMessage('Password must be at least 6 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one number'),
    body('phone').optional().trim()
  ],
  handleValidationErrors,
  registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  handleValidationErrors,
  loginUser
);

router.get('/profile', authenticate, getCurrentUser);

router.get('/:id', getUserById);

router.put(
  '/:id',
  [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('phone').optional().trim(),
    body('address').optional().isObject()
  ],
  handleValidationErrors,
  updateUser
);

export default router;
