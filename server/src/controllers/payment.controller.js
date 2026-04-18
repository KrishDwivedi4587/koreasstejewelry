import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';

export const processPayment = async (req, res, next) => {
  try {
    const { orderId, amount, paymentMethod, cardDetails } = req.body;
    const userId = req.userId;

    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment fields'
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to process this payment'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be paid in its current status'
      });
    }

    const transactionId = uuidv4();
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      order.status = 'confirmed';
      order.paymentStatus = 'paid';
      order.transactionId = transactionId;
      order.paymentDate = new Date();

      await order.save();

      res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        data: {
          orderId: order._id,
          transactionId,
          amount,
          status: 'completed',
          timestamp: new Date()
        }
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Payment processing failed. Please try again.',
        data: {
          orderId,
          transactionId,
          amount,
          status: 'failed',
          timestamp: new Date()
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatus = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const order = await Order.findOne({ transactionId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        transactionId,
        orderId: order._id,
        status: order.paymentStatus,
        amount: order.totalAmount,
        paymentDate: order.paymentDate,
        orderStatus: order.status
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refundPayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const userId = req.userId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to refund this order'
      });
    }

    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Only paid orders can be refunded'
      });
    }

    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot refund orders that have been shipped or delivered'
      });
    }

    const refundId = uuidv4();

    order.paymentStatus = 'refunded';
    order.refundId = refundId;
    order.status = 'cancelled';

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        orderId: order._id,
        refundId,
        amount: order.totalAmount,
        status: 'refunded',
        timestamp: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
};
