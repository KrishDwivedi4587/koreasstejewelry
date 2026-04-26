import express from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

const useMockDB = process.env.USE_MOCK_DB === 'true';

// Dynamically import the right controller based on mode
const getControllers = async () => {
  if (useMockDB) {
    return import('../controllers/order.mock.controller.js');
  } else {
    return import('../controllers/order.controller.js');
  }
};

// GET /api/orders — get orders (filtered by userId query param)
router.get('/', authenticate, async (req, res, next) => {
  const { getOrdersMock, getOrders } = await getControllers();
  return (useMockDB ? getOrdersMock : getOrders)(req, res, next);
});

// POST /api/orders — create order
router.post(
  '/',
  authenticate,
  [
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('items').isArray({ min: 1 }).withMessage('Items array is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    const { createOrderMock, createOrder } = await getControllers();
    return (useMockDB ? createOrderMock : createOrder)(req, res, next);
  }
);

// GET /api/orders/:id — get single order
router.get('/:id', authenticate, async (req, res, next) => {
  const { getOrderByIdMock, getOrderById } = await getControllers();
  return (useMockDB ? getOrderByIdMock : getOrderById)(req, res, next);
});

// PUT /api/orders/:id/status — update status
router.put(
  '/:id/status',
  authenticate,
  [
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ],
  handleValidationErrors,
  async (req, res, next) => {
    const { updateOrderStatusMock, updateOrderStatus } = await getControllers();
    return (useMockDB ? updateOrderStatusMock : updateOrderStatus)(req, res, next);
  }
);

// PUT /api/orders/:id/cancel
router.put('/:id/cancel', authenticate, async (req, res, next) => {
  const { cancelOrderMock, cancelOrder } = await getControllers();
  return (useMockDB ? cancelOrderMock : cancelOrder)(req, res, next);
});

export default router;
