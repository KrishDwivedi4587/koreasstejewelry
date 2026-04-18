import express from 'express';
import { body } from 'express-validator';
import {
  createPaymentIntentMock,
  verifyPaymentMock,
  getPaymentStatusMock
} from '../controllers/payment.mock.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/create-intent',
  authenticate,
  [
    body('items').isArray({ min: 1 }).withMessage('Items array is required'),
    body('shippingMethod').isIn(['standard', 'express']).withMessage('Valid shipping method is required')
  ],
  handleValidationErrors,
  createPaymentIntentMock
);

router.post(
  '/verify',
  authenticate,
  [
    body('razorpay_order_id').notEmpty().withMessage('Order ID is required'),
    body('razorpay_payment_id').notEmpty().withMessage('Payment ID is required'),
    body('userId').notEmpty().withMessage('User ID is required'),
    body('items').isArray().withMessage('Items array is required'),
    body('shippingDetails').isObject().withMessage('Shipping details are required'),
    body('totals').isObject().withMessage('Totals are required')
  ],
  handleValidationErrors,
  verifyPaymentMock
);

router.get(
  '/:transactionId',
  getPaymentStatusMock
);

export default router;
