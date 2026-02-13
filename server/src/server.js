import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { seedProducts } from './seeds/products.seed.js';
import { initializeMockDB } from './config/mockDB.js';

// Load environment variables FIRST, before importing app or anything else that needs them
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Dynamically import app after env variables are loaded
    const { default: app } = await import('./app.js');
    
    // Try to connect to MongoDB
    await connectDB();
    
    // Initialize mock database if needed
    if (process.env.USE_MOCK_DB === 'true') {
      initializeMockDB();
    } else {
      await seedProducts();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
