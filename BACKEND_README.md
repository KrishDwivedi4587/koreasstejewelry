# Koreasste Jewelry - Backend API Documentation

A production-ready e-commerce backend for the Koreasste Jewelry platform built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Security Features](#security-features)
- [Image Upload](#image-upload)
- [Payment System](#payment-system)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)

## 🚀 Features

### Core Features
- ✅ **JWT Authentication** - Secure user registration and login with bcrypt password hashing
- ✅ **User Management** - User profiles, account updates, and password management
- ✅ **Product Management** - Create, read, update, delete products with categories
- ✅ **Shopping Cart** - Add, remove, and update cart items
- ✅ **Order Management** - Create orders, track status, and order history
- ✅ **Payment Processing** - Mock payment integration with transaction tracking
- ✅ **Image Upload** - Cloudinary integration for product images
- ✅ **Mock Database** - In-memory database for development without MongoDB

### Security Features
- 🔒 **Password Hashing** - bcryptjs for secure password storage
- 🔐 **JWT Tokens** - Secure token-based authentication
- 🛡️ **Helmet** - HTTP headers security middleware
- ⏱️ **Rate Limiting** - Protection against brute force attacks
- 🔄 **CORS** - Configurable cross-origin resource sharing
- ✔️ **Input Validation** - Express-validator for comprehensive input validation
- 🧹 **Input Sanitization** - Protection against XSS attacks

### Advanced Features
- 📸 **Multer** - File upload handling with size limits
- 🎨 **Cloudinary** - Cloud-based image storage
- 🗄️ **MongoDB** - NoSQL database with Mongoose ODM
- 📝 **Error Handling** - Comprehensive error handling middleware
- 🔍 **Data Validation** - Request validation with detailed error messages

## 💻 Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 8.0.0 + Mongoose
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **File Upload**: Multer, Cloudinary
- **Security**: Helmet, express-rate-limit
- **Validation**: express-validator
- **Environment**: dotenv

## 📁 Project Structure

```
server/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── mockDB.js          # Mock database
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── payment.controller.js
│   │   └── upload.controller.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   └── upload.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── security.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   └── seeds/
│       └── products.seed.js
├── uploads/                   # Local file uploads (temporary)
├── .env                       # Environment variables
├── .env.example               # Example environment file
├── .gitignore
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/koreasste-jewelry.git
cd koreasste-jewelry
```

2. **Install server dependencies**
```bash
npm install --prefix server
```

3. **Set up environment variables**
```bash
cp server/.env.example server/.env
```

4. **Configure environment variables**
Edit `server/.env` with your actual values:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Start the server**
```bash
npm run dev:server
```

The server will start at `http://localhost:5000`

## 🔑 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/koreasste` |
| `JWT_SECRET` | JWT signing secret | `super-secret-key` |
| `JWT_EXPIRY` | Token expiration time | `7d` |

### Cloudinary Variables

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Security Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `SECURE_COOKIES` | Enable secure cookies | `false` (dev) / `true` (prod) |
| `SAME_SITE_COOKIES` | SameSite cookie policy | `lax` |

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User Profile
```http
GET /api/users/profile
Authorization: Bearer {token}
```

### Products

#### Get All Products
```http
GET /api/products
```

#### Get Product by ID
```http
GET /api/products/{productId}
```

#### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Gold Necklace",
  "description": "Beautiful 18K gold necklace",
  "price": 499.99,
  "category": "Necklaces",
  "image": "https://example.com/image.jpg",
  "stock": 50,
  "rating": 4.5
}
```

#### Update Product
```http
PUT /api/products/{productId}
Content-Type: application/json

{
  "price": 549.99,
  "stock": 45
}
```

#### Delete Product
```http
DELETE /api/products/{productId}
```

### Image Upload

#### Upload Single Image
```http
POST /api/uploads/image
Authorization: Bearer {token}
Content-Type: multipart/form-data

[file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://cloudinary-url.com/image.jpg",
    "publicId": "koreasste-jewelry/products/image_id",
    "size": 102400,
    "width": 800,
    "height": 600
  }
}
```

#### Upload Multiple Images
```http
POST /api/uploads/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

[multiple file uploads]
```

#### Delete Image
```http
DELETE /api/uploads/image
Authorization: Bearer {token}
Content-Type: application/json

{
  "publicId": "koreasste-jewelry/products/image_id"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

#### Get All Orders
```http
GET /api/orders
Authorization: Bearer {token}
```

#### Get Order by ID
```http
GET /api/orders/{orderId}
Authorization: Bearer {token}
```

#### Update Order Status
```http
PUT /api/orders/{orderId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped"
}
```

Valid statuses: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

### Payments

#### Process Payment
```http
POST /api/payments/process
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order_id",
  "amount": 499.99,
  "paymentMethod": "credit_card",
  "cardDetails": {
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123"
  }
}
```

#### Get Payment Status
```http
GET /api/payments/{transactionId}
```

#### Refund Payment
```http
POST /api/payments/refund
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order_id"
}
```

## 🔐 Authentication

### How JWT Authentication Works

1. **User Registration/Login** - User provides credentials
2. **Token Generation** - Server generates JWT token (valid for 7 days)
3. **Token Storage** - Client stores token (usually in localStorage)
4. **Token Transmission** - Client sends token in Authorization header
5. **Token Verification** - Server verifies token on protected routes
6. **Access Granted** - User can access protected resources

### Using Authentication

All protected endpoints require this header:
```
Authorization: Bearer {jwt_token}
```

Example:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:5000/api/users/profile
```

### Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one number

## 🔒 Security Features

### Helmet.js
- Sets secure HTTP headers
- Prevents common vulnerabilities (XSS, Clickjacking, etc.)

### Rate Limiting
- **General**: 100 requests per 15 minutes
- **Auth**: 5 login attempts per 15 minutes
- **Payment**: 10 requests per minute
- **Upload**: 50 uploads per hour

### CORS
- Configured for specific origins (default: localhost:3000)
- Credentials allowed
- Custom headers supported

### Input Validation & Sanitization
- All inputs validated against schema
- HTML special characters escaped
- Unauthorized characters removed
- File type validation for uploads

### Password Security
- Hashed with bcryptjs (salt rounds: 10)
- Never stored in plain text
- Compared securely during login

## 📸 Image Upload

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Limits
- Max file size: 5MB per file
- Max files in batch: 10

### Upload Process
1. File submitted via multipart/form-data
2. Multer validates and stores temporarily
3. File uploaded to Cloudinary
4. Temporary file deleted
5. Cloudinary URL returned

### Cloudinary Setup
1. Create account at https://cloudinary.com
2. Get Cloud Name, API Key, and API Secret
3. Add to `.env` file
4. Images stored in `koreasste-jewelry/products` folder

## 💳 Payment System

### Mock Payment Integration

The payment system simulates real transactions for testing:

- **Success Rate**: 90% (configurable via `PAYMENT_SUCCESS_RATE`)
- **Transaction ID**: Generated using UUID v4
- **No Real Charges**: Completely mock implementation

### Payment Flow

1. Create order with items and shipping address
2. Call payment API with order ID
3. System generates transaction ID
4. Payment status is returned
5. Order status updated automatically

### Payment Statuses

- `pending` - Payment not yet attempted
- `paid` - Payment successful
- `failed` - Payment failed (retry possible)
- `refunded` - Payment refunded

## 💾 Database Schema

### User Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number (0-5),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: User),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: Object,
  status: String (pending/confirmed/shipped/delivered/cancelled),
  paymentMethod: String,
  paymentStatus: String (pending/paid/failed/refunded),
  transactionId: String,
  refundId: String,
  paymentDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## ❌ Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required",
      "value": "invalid-email"
    }
  ]
}
```

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Validation failed | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too many requests | Rate limit exceeded |
| 500 | Internal error | Server error |

## ⏱️ Rate Limiting

Rate limits apply per IP address:

| Endpoint | Limit | Window |
|----------|-------|--------|
| General | 100 | 15 min |
| Auth (/login) | 5 | 15 min |
| Payments | 10 | 1 min |
| Uploads | 50 | 1 hour |

Response when limit exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again after 15 minutes"
}
```

## 🚀 Deployment

### Recommended Platforms

1. **Render** - Best for full-stack apps
2. **Railway** - Great for Node.js
3. **AWS** - Most scalable
4. **DigitalOcean** - Budget-friendly
5. **Vercel** - Best for frontend

### Pre-Deployment Checklist

- [ ] Update `NODE_ENV` to `production`
- [ ] Generate strong `JWT_SECRET`
- [ ] Set up MongoDB Atlas or managed database
- [ ] Configure Cloudinary account
- [ ] Set `ALLOWED_ORIGINS` to production domain
- [ ] Enable `SECURE_COOKIES=true`
- [ ] Test all APIs in production environment
- [ ] Set up monitoring and logging
- [ ] Configure automatic backups

### Production Environment Example

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/koreasste
JWT_SECRET=very-long-random-secret-key-generate-new
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CLIENT_URL=https://yourdomain.com
SECURE_COOKIES=true
SAME_SITE_COOKIES=strict
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔨 Development

### Running Locally

```bash
# Start server with auto-reload
npm run dev:server

# Start both client and server
npm run dev

# Run tests (when available)
npm test

# Build for production
npm run build
```

### Testing with Postman

1. Import `Koreasste_Jewelry_API.postman_collection.json`
2. Set base_url variable to `http://localhost:5000`
3. Run test requests

### Debug Mode

Set `DEBUG=*` environment variable:
```bash
DEBUG=* npm run dev:server
```

## 📊 Monitoring

Monitor these key metrics:
- Request response time
- Error rate
- Database query performance
- File upload success rate
- Payment transaction success rate
- Authentication failures
- Rate limit violations

## 🤝 Contributing

### Code Style
- Use consistent indentation (2 spaces)
- Use descriptive variable names
- Add comments for complex logic
- Follow existing patterns

### Adding New Features
1. Create feature branch
2. Implement changes
3. Add validation for inputs
4. Test thoroughly
5. Create pull request

## 📝 License

MIT License - see LICENSE file for details

## 📧 Support

For issues and questions:
- Email: support@koreasste-jewelry.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/koreasste-jewelry/issues)

## 🔄 Version History

### v1.0.0 (Current)
- JWT authentication with bcrypt
- Product management CRUD
- Order management system
- Mock payment integration
- Image upload with Cloudinary
- Comprehensive validation
- Security middleware (Helmet, CORS, Rate limiting)
- Error handling middleware
- Input sanitization

---

**Last Updated**: April 2026
