import express from 'express';
import { body } from 'express-validator';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../controllers/cart.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/:userId', getCart);

router.post(
  '/:userId/add',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  handleValidationErrors,
  addToCart
);

router.put(
  '/:userId/item',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  handleValidationErrors,
  updateCartItem
);

router.delete(
  '/:userId/remove',
  [body('productId').notEmpty().withMessage('Product ID is required')],
  handleValidationErrors,
  removeFromCart
);

router.delete('/:userId', clearCart);

export default router;
