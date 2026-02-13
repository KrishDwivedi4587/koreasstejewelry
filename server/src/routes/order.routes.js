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

const router = express.Router();

router.get('/', getOrders);

router.post(
  '/',
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('paymentMethod').trim().notEmpty().withMessage('Payment method is required')
  ],
  handleValidationErrors,
  createOrder
);

router.get('/:id', getOrderById);

router.put(
  '/:id/status',
  [body('status').trim().notEmpty().withMessage('Status is required')],
  handleValidationErrors,
  updateOrderStatus
);

router.put('/:id/cancel', cancelOrder);

export default router;
