// Mock payment controller for development without real payment gateway
import mockDB from '../config/mockDB.js';
import { v4 as uuidv4 } from 'uuid';

export const createPaymentIntentMock = async (req, res, next) => {
  try {
    const { items, shippingMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in cart'
      });
    }

    // Calculate totals
    let subtotal = 0;
    items.forEach(item => {
      subtotal += (item.price || 0) * (item.quantity || 1);
    });

    const shipping = subtotal > 5000 ? 0 : (shippingMethod === 'standard' ? 150 : 350);
    const total = subtotal + shipping;

    // Create gateway order ID (simulating Razorpay order)
    const gatewayOrderId = `order_${Date.now()}_${uuidv4().substring(0, 8)}`;

    const paymentIntent = {
      gatewayOrderId,
      subtotal,
      shipping,
      amount: total,
      items,
      shippingMethod,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60000) // 15 minutes
    };

    res.status(200).json({
      success: true,
      message: 'Payment intent created',
      data: paymentIntent
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentMock = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      shippingDetails,
      totals
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment details'
      });
    }

    // Mock payment success rate from env (default 90%)
    const successRate = parseFloat(process.env.PAYMENT_SUCCESS_RATE || '0.9');
    const isSuccess = Math.random() < successRate;

    if (!isSuccess) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please try again.'
      });
    }

    // Create order in mock DB
    const orderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const subtotalVal = totals?.subtotal ?? items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const shippingVal = totals?.shipping ?? 0;

    const order = {
      _id: orderId,
      userId,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
      })),
      shippingAddress: shippingDetails,
      totalAmount: totals?.total ?? (subtotalVal + shippingVal),
      subtotal: subtotalVal,
      shipping: shippingVal,
      paymentMethod: 'mock_payment',
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      status: 'confirmed',
      transactionId: razorpay_payment_id,
      gatewayOrderId: razorpay_order_id,
      paymentDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockDB.orders.push(order);

    res.status(200).json({
      success: true,
      message: 'Payment verified and order created',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatusMock = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const order = mockDB.orders.find(o => o.transactionId === transactionId);

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
        orderStatus: order.orderStatus
      }
    });
  } catch (error) {
    next(error);
  }
};
