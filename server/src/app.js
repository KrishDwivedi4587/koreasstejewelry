import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import productMockRoutes from './routes/product.mock.routes.js';
import userRoutes from './routes/user.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use mock routes for development if MongoDB is not available
const useMockDB = process.env.USE_MOCK_DB === 'true';

if (useMockDB) {
  console.log('📦 Using Mock Database for Products');
  app.use('/api/products', productMockRoutes);
} else {
  app.use('/api/products', productRoutes);
}

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

export default app;
