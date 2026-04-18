import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from '../controllers/order.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getOrders);

router.post(
  '/',
  authenticate,
  [
    body('shippingAddress')
      .isObject()
      .withMessage('Shipping address is required'),
    body('shippingAddress.street')
      .notEmpty()
      .withMessage('Street is required'),
    body('shippingAddress.city')
      .notEmpty()
      .withMessage('City is required'),
    body('shippingAddress.state')
      .notEmpty()
      .withMessage('State is required'),
    body('shippingAddress.zipCode')
      .notEmpty()
      .withMessage('Zip code is required'),
    body('shippingAddress.country')
      .notEmpty()
      .withMessage('Country is required'),
    body('paymentMethod')
      .trim()
      .notEmpty()
      .withMessage('Payment method is required')
      .isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer'])
      .withMessage('Invalid payment method')
  ],
  handleValidationErrors,
  createOrder
);

router.get('/:id', authenticate, getOrderById);

router.put(
  '/:id/status',
  authenticate,
  [
    body('status')
      .trim()
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ],
  handleValidationErrors,
  updateOrderStatus
);

router.put('/:id/cancel', authenticate, cancelOrder);

export default router;
