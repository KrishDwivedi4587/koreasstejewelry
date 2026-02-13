// Mock in-memory database for development without MongoDB
const mockDB = {
  products: [],
  users: [],
  carts: {},
  orders: []
};

// Initialize mock database with products seed data
import { productsData } from '../seeds/products.seed.js';

export const initializeMockDB = () => {
  mockDB.products = productsData.map((p, idx) => ({
    ...p,
    _id: `mock_id_${idx}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  console.log(`✅ Mock DB initialized with ${mockDB.products.length} products`);
};

export default mockDB;
