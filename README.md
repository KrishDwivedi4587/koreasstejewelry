# Koreasste Jewelry — E-Commerce Platform

A full-stack e-commerce application for **Koreasste Jewelry & Beauwell Skincare**, built with React (TypeScript/Vite) on the frontend and Node.js/Express on the backend with an in-memory mock database for demo use.

---

## 🚀 Quick Start

### Backend
```bash
cd server
npm install
npm run dev
# → Runs on http://localhost:5000
```

### Frontend
```bash
cd client
npm install
npm run dev
# → Runs on http://localhost:3000
```

---

## 🔐 Credentials

### Admin Panel
- URL: `http://localhost:3000/#/admin`
- Email: `admin@koreasste.com`
- Password: `Koreasste@admin060580`

### Demo User (or register a new one)
Register at `/signup` with any email/password.

---

## ✨ Features

| Feature | Status |
|---|---|
| Product listing & detail pages | ✅ |
| Search & category filtering | ✅ |
| Shopping cart (persistent per user) | ✅ |
| User registration & login | ✅ |
| Session persistence (page refresh) | ✅ |
| Checkout with shipping form | ✅ |
| Mock Razorpay payment modal | ✅ |
| Order history & details | ✅ |
| Printable invoice | ✅ |
| Profile editing | ✅ |
| Admin dashboard | ✅ |
| Admin product CRUD | ✅ |
| Admin order status management | ✅ |
| Admin user listing | ✅ |

---

## 🛠 Tech Stack

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS v3 · React Router v6 · Lucide React

**Backend:** Node.js · Express · JWT · bcryptjs · Helmet · express-rate-limit · express-validator

**Database:** In-memory mock DB (demo) or MongoDB (set `USE_MOCK_DB=false`)

---

## ⚙️ Environment Variables

### `server/.env`
```
PORT=5000
USE_MOCK_DB=true
JWT_SECRET=your-super-secret-jwt-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/koreasste
NODE_ENV=development
PAYMENT_SUCCESS_RATE=95
```

### `client/.env.local`
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📁 Project Structure

```
koreasste-jewelry-advanced/
├── client/                    # React + Vite frontend
│   ├── components/            # Reusable UI components
│   ├── context/               # AuthContext, CartContext
│   ├── pages/                 # Page components
│   ├── services/              # API service layer
│   ├── index.css              # Global styles + Tailwind
│   └── tailwind.config.js     # Tailwind configuration
│
└── server/                    # Express backend
    └── src/
        ├── config/            # DB + mock DB config
        ├── controllers/       # Route handlers (real + mock)
        ├── middlewares/       # Auth, validation, security
        ├── models/            # Mongoose models
        ├── routes/            # Express routes
        └── seeds/             # Product seed data
```

---

## 📝 Notes

- **Data persistence:** The app uses an in-memory mock DB by default. All data (users, orders) is reset on server restart. Switch to MongoDB by setting `USE_MOCK_DB=false` and providing a valid `MONGODB_URI`.
- **Payment:** The Razorpay payment modal is a simulation for demo purposes. Real integration requires Razorpay API keys.
- **Images:** Product images are served from mock data URLs. Cloudinary upload integration requires a valid account.
