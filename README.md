# Koreasste E-Commerce Project

Complete full-stack e-commerce solution with React frontend and Node.js/Express/MongoDB backend.

## Project Structure

```
koreasste-jewelry-advanced/
├── client/          (React + TypeScript + Vite)
├── server/          (Node.js + Express + MongoDB)
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

Configure MongoDB in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/koreasste-jewelry
NODE_ENV=development
```

Start the backend:
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

The server will automatically seed all 47 products on first startup.

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev    # Start Vite dev server
```

Frontend runs on `http://localhost:5173` and connects to backend at `http://localhost:5000/api`.

## API Endpoints

### Products
- `GET /api/products` - Get all products (optional: `?category=Earrings`)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `PUT /api/cart/:userId/item` - Update cart item quantity
- `DELETE /api/cart/:userId/remove` - Remove item from cart
- `DELETE /api/cart/:userId` - Clear entire cart

### Orders
- `POST /api/orders` - Create order (from cart)
- `GET /api/orders?userId=...` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel pending order

## Available Products

The system comes with 47 pre-loaded products:
- **Lifestyle Jewelry**: 41 products (Earrings, Necklaces, Bracelets, Full Sets)
- **Beauwell Skincare**: 6 products (Masks, Anti-Aging, Moisturizers, Exfoliators, Device Tech)

## Features

✅ Complete REST API with Express  
✅ MongoDB database with Mongoose models  
✅ Request validation with express-validator  
✅ Centralized error handling  
✅ MVC architecture pattern  
✅ Product catalog with categories  
✅ User registration and authentication  
✅ Shopping cart management  
✅ Order management system  
✅ Stock tracking  
✅ TypeScript support (frontend)  
✅ Vite for fast development  

## Development Workflow

**Terminal 1 - Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client && npm run dev
```

Visit `http://localhost:5173` in your browser.

## Key Files

### Backend
- `server/src/app.js` - Express app configuration
- `server/src/server.js` - Entry point
- `server/src/seeds/products.seed.js` - Product data seeding
- `server/src/models/` - Database schemas
- `server/src/controllers/` - Business logic
- `server/src/routes/` - API route definitions

### Frontend
- `client/services/api.ts` - Backend API integration
- `client/context/` - State management (Auth, Cart)
- `client/pages/` - Page components
- `client/components/` - Reusable UI components

## Notes

- Passwords are stored as plain text (for development only - use bcrypt in production)
- Authentication uses simulated tokens (implement JWT for production)
- CORS is enabled for local development
- MongoDB must be running before starting the server

## Next Steps

1. Implement proper password hashing (bcrypt)
2. Add JWT-based authentication
3. Implement payment gateway integration
4. Add image upload functionality
5. Set up deployment (Vercel for frontend, Heroku/Railway for backend)
