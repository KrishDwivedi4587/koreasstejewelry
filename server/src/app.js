import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import productMockRoutes from './routes/product.mock.routes.js';
import userRoutes from './routes/user.routes.js';
import userMockRoutes from './routes/user.mock.routes.js';
import paymentMockRoutes from './routes/payment.mock.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import adminRoutes from './routes/admin.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import { sanitizeInput } from './middlewares/validate.middleware.js';
import {
  securityHeaders,
  generalLimiter,
  authLimiter,
  paymentLimiter,
  uploadLimiter,
  corsOptions
} from './middlewares/security.middleware.js';

const app = express();

app.use(securityHeaders);
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(sanitizeInput);
app.use(generalLimiter);

const useMockDB = process.env.USE_MOCK_DB === 'true';

if (useMockDB) {
  console.log('📦 Using Mock Database for Products, Users, and Payments');
  app.use('/api/products', productMockRoutes);
  app.use('/api/users', authLimiter, userMockRoutes);
  app.use('/api/payments', paymentLimiter, paymentMockRoutes);
} else {
  app.use('/api/products', productRoutes);
  app.use('/api/users', authLimiter, userRoutes);
  app.use('/api/payments', paymentLimiter, paymentRoutes);
}

// These routes handle mock/real internally via USE_MOCK_DB env
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/uploads', uploadLimiter, uploadRoutes);

// Admin panel (mock-only for now)
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    mode: useMockDB ? 'mock' : 'mongodb',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

export default app;
