// Mock order controller — full CRUD using in-memory mockDB
import mockDB from '../config/mockDB.js';

export const createOrderMock = async (req, res, next) => {
  try {
    const { userId, shippingAddress, paymentMethod, items, totals } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items provided for order'
      });
    }

    // Calculate total from items
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = totals?.shipping ?? (subtotal > 5000 ? 0 : 150);
    const totalAmount = totals?.total ?? (subtotal + shipping);

    const orderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

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
      shippingAddress,
      totalAmount,
      subtotal,
      shipping,
      paymentMethod,
      orderStatus: 'confirmed',
      paymentStatus: 'paid',
      transactionId: `txn_direct_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockDB.orders.push(order);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersMock = async (req, res, next) => {
  try {
    const { userId } = req.query;

    let orders = mockDB.orders;
    if (userId) {
      orders = orders.filter(o => o.userId === userId);
    }

    // Sort newest first
    const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      data: sorted
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = mockDB.orders.find(o => o._id === id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const orderIndex = mockDB.orders.findIndex(o => o._id === id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    mockDB.orders[orderIndex].orderStatus = status;
    mockDB.orders[orderIndex].status = status;
    mockDB.orders[orderIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      data: mockDB.orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrderMock = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orderIndex = mockDB.orders.findIndex(o => o._id === id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = mockDB.orders[orderIndex];
    if (order.orderStatus !== 'pending' && order.orderStatus !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only pending or confirmed orders can be cancelled'
      });
    }

    mockDB.orders[orderIndex].orderStatus = 'cancelled';
    mockDB.orders[orderIndex].status = 'cancelled';
    mockDB.orders[orderIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      data: mockDB.orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
};
