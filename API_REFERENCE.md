# API Reference Guide

Quick reference for all Koreasste Jewelry API endpoints.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require this header:

```
Authorization: Bearer {jwt_token}
```

---

## User Endpoints

### 1. Register User
- **Endpoint**: `POST /users/register`
- **Auth**: Not required
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123",
    "phone": "+1234567890"
  }
  ```
- **Response**: User object + JWT token

### 2. Login User
- **Endpoint**: `POST /users/login`
- **Auth**: Not required
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response**: User object + JWT token

### 3. Get Current User Profile
- **Endpoint**: `GET /users/profile`
- **Auth**: Required
- **Response**: Current user object

### 4. Get User by ID
- **Endpoint**: `GET /users/{userId}`
- **Auth**: Not required
- **Response**: User object

### 5. Update User
- **Endpoint**: `PUT /users/{userId}`
- **Auth**: Not required
- **Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+9876543210",
    "address": {
      "street": "456 Oak St",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02101",
      "country": "USA"
    }
  }
  ```
- **Response**: Updated user object

---

## Product Endpoints

### 1. Get All Products
- **Endpoint**: `GET /products`
- **Auth**: Not required
- **Query**: None
- **Response**: Array of products

### 2. Get Product by ID
- **Endpoint**: `GET /products/{productId}`
- **Auth**: Not required
- **Response**: Product object

### 3. Create Product
- **Endpoint**: `POST /products`
- **Auth**: Not required (should be admin only)
- **Body**:
  ```json
  {
    "name": "Gold Necklace",
    "description": "Beautiful 18K gold necklace with diamond pendant",
    "price": 499.99,
    "category": "Necklaces",
    "image": "https://example.com/image.jpg",
    "stock": 50,
    "rating": 4.5
  }
  ```
- **Response**: Created product object

### 4. Update Product
- **Endpoint**: `PUT /products/{productId}`
- **Auth**: Not required (should be admin only)
- **Body**: Any of the product fields
- **Response**: Updated product object

### 5. Delete Product
- **Endpoint**: `DELETE /products/{productId}`
- **Auth**: Not required (should be admin only)
- **Response**: Success message

---

## Cart Endpoints

### 1. Get Cart
- **Endpoint**: `GET /cart/{userId}`
- **Auth**: Not required
- **Response**: Cart object with items

### 2. Add to Cart
- **Endpoint**: `POST /cart`
- **Auth**: Not required
- **Body**:
  ```json
  {
    "userId": "user_id",
    "productId": "product_id",
    "quantity": 1
  }
  ```
- **Response**: Updated cart

### 3. Update Cart Item
- **Endpoint**: `PUT /cart/{userId}/{productId}`
- **Auth**: Not required
- **Body**:
  ```json
  {
    "quantity": 2
  }
  ```
- **Response**: Updated cart

### 4. Remove from Cart
- **Endpoint**: `DELETE /cart/{userId}/{productId}`
- **Auth**: Not required
- **Response**: Updated cart

---

## Order Endpoints

### 1. Create Order
- **Endpoint**: `POST /orders`
- **Auth**: **Required**
- **Body**:
  ```json
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
- **Response**: Order object

### 2. Get All Orders
- **Endpoint**: `GET /orders`
- **Auth**: **Required**
- **Response**: Array of user's orders

### 3. Get Order by ID
- **Endpoint**: `GET /orders/{orderId}`
- **Auth**: **Required**
- **Response**: Order object

### 4. Update Order Status
- **Endpoint**: `PUT /orders/{orderId}/status`
- **Auth**: **Required** (admin only)
- **Body**:
  ```json
  {
    "status": "shipped"
  }
  ```
- **Valid statuses**: pending, confirmed, shipped, delivered, cancelled
- **Response**: Updated order object

### 5. Cancel Order
- **Endpoint**: `PUT /orders/{orderId}/cancel`
- **Auth**: **Required**
- **Response**: Updated order object

---

## Payment Endpoints

### 1. Process Payment
- **Endpoint**: `POST /payments/process`
- **Auth**: **Required**
- **Body**:
  ```json
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
- **Response**: Payment result with transaction ID

### 2. Get Payment Status
- **Endpoint**: `GET /payments/{transactionId}`
- **Auth**: Not required
- **Response**: Payment status object

### 3. Refund Payment
- **Endpoint**: `POST /payments/refund`
- **Auth**: **Required**
- **Body**:
  ```json
  {
    "orderId": "order_id"
  }
  ```
- **Response**: Refund object with refund ID

---

## Upload Endpoints

### 1. Upload Single Image
- **Endpoint**: `POST /uploads/image`
- **Auth**: **Required**
- **Content-Type**: multipart/form-data
- **Body**: Form data with `image` file
- **Response**:
  ```json
  {
    "url": "https://cloudinary.com/image.jpg",
    "publicId": "koreasste-jewelry/products/xxx",
    "size": 102400,
    "width": 800,
    "height": 600
  }
  ```

### 2. Upload Multiple Images
- **Endpoint**: `POST /uploads/images`
- **Auth**: **Required**
- **Content-Type**: multipart/form-data
- **Body**: Form data with `images` files (max 10)
- **Response**: Array of image objects

### 3. Delete Image
- **Endpoint**: `DELETE /uploads/image`
- **Auth**: **Required**
- **Body**:
  ```json
  {
    "publicId": "koreasste-jewelry/products/xxx"
  }
  ```
- **Response**: Success message

---

## Health Check

### Server Health
- **Endpoint**: `GET /health`
- **Auth**: Not required
- **Response**:
  ```json
  {
    "success": true,
    "message": "Server is running"
  }
  ```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required",
      "value": "invalid"
    }
  ]
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Server Error |

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| General | 100 requests | 15 min |
| Auth | 5 requests | 15 min |
| Payments | 10 requests | 1 min |
| Uploads | 50 requests | 1 hour |

---

## Testing with cURL

### Example: Get All Products
```bash
curl http://localhost:5000/api/products
```

### Example: Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Example: Get User Profile (Protected)
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Validation Rules

### Password
- Minimum 6 characters
- At least one uppercase letter
- At least one number

### Email
- Valid email format

### Product Name
- 3-100 characters

### Product Price
- Positive number (>0.01)

### File Upload
- Supported: JPG, PNG, GIF, WebP
- Max size: 5MB per file
- Max batch: 10 files

---

## Notes

- All timestamps are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- Protected endpoints require valid JWT token
- Most timestamps are automatically managed
- Payment system is simulated (no real charges)
- Image uploads go to Cloudinary
