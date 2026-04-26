import dotenv from 'dotenv';
import { initializeMockDB } from './config/mockDB.js';

// Load environment variables FIRST, before importing app or anything else that needs them
dotenv.config();

const PORT = process.env.PORT || 5000;
const useMockDB = process.env.USE_MOCK_DB === 'true';

const startServer = async () => {
  try {
    // Dynamically import app after env variables are loaded
    const { default: app } = await import('./app.js');

    if (useMockDB) {
      // Skip MongoDB entirely — use in-memory mock DB
      initializeMockDB();
      console.log('📦 Mock DB mode: Skipping MongoDB connection');
    } else {
      // Connect to real MongoDB and seed products
      const { default: connectDB } = await import('./config/db.js');
      const { seedProducts } = await import('./seeds/products.seed.js');
      await connectDB();
      await seedProducts();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔗 Mode: ${useMockDB ? 'Mock DB (in-memory)' : 'MongoDB'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
