// Admin mock controller — stats, user management, order management
import mockDB from '../config/mockDB.js';

export const getStatsMock = async (req, res, next) => {
  try {
    const totalProducts = mockDB.products.length;
    const totalUsers = mockDB.users.length;
    const totalOrders = mockDB.orders.length;
    const totalRevenue = mockDB.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const ordersByStatus = {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    mockDB.orders.forEach(o => {
      const status = o.orderStatus || o.status || 'confirmed';
      if (ordersByStatus[status] !== undefined) {
        ordersByStatus[status]++;
      }
    });

    // Recent 5 orders
    const recentOrders = [...mockDB.orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Top 5 products by stock sold (approximate)
    const topProducts = [...mockDB.products]
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue,
        ordersByStatus,
        recentOrders,
        topProducts
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersMock = async (req, res, next) => {
  try {
    const users = mockDB.users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrdersMock = async (req, res, next) => {
  try {
    const orders = [...mockDB.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const orderIndex = mockDB.orders.findIndex(o => o._id === id);
    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
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
