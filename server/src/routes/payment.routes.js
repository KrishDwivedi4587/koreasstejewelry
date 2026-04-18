import express from 'express';
import { body } from 'express-validator';
import {
  processPayment,
  getPaymentStatus,
  refundPayment
} from '../controllers/payment.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/process',
  authenticate,
  [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required'),
    body('cardDetails').optional().isObject()
  ],
  handleValidationErrors,
  processPayment
);

router.get('/:transactionId', getPaymentStatus);

router.post(
  '/refund',
  authenticate,
  [
    body('orderId').notEmpty().withMessage('Order ID is required')
  ],
  handleValidationErrors,
  refundPayment
);

export default router;
