import express from 'express';
import {
  getStatsMock,
  getAllUsersMock,
  getAllOrdersMock,
  updateOrderStatusAdmin
} from '../controllers/admin.mock.controller.js';

const router = express.Router();

// Dashboard statistics
router.get('/stats', getStatsMock);

// Users management
router.get('/users', getAllUsersMock);

// Orders management
router.get('/orders', getAllOrdersMock);
router.put('/orders/:id/status', updateOrderStatusAdmin);

export default router;
