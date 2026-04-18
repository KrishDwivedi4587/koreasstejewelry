# Koreasste Jewelry - Complete Setup Guide

This guide will help you set up the entire Koreasste Jewelry e-commerce platform from scratch.

## 📋 Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **MongoDB**: Local installation or MongoDB Atlas account
- **Cloudinary**: Free account for image hosting
- **Code Editor**: VS Code recommended

## 🔗 Required Accounts

### 1. MongoDB Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free account
- Create a new cluster
- Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/database`)

### 2. Cloudinary Account
- Go to https://cloudinary.com/
- Sign up for free account
- Get your Cloud Name, API Key, and API Secret from dashboard
- These will be used for image uploads

## 🚀 Setup Steps

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/koreasste-jewelry.git
cd koreasste-jewelry
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
npm install --prefix server

# Install client dependencies
npm install --prefix client
```

### Step 3: Configure Backend Environment

Navigate to server directory:
```bash
cd server
```

Copy example environment file:
```bash
cp .env.example .env
```

Edit `.env` file with your credentials:
```
PORT=5000
NODE_ENV=development

# Database - Use your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/koreasste

# JWT - Generate a random secret (use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRY=7d

# Cloudinary - From your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
CLIENT_URL=http://localhost:3000

# Other
USE_MOCK_DB=false
PAYMENT_SUCCESS_RATE=0.9
```

### Step 4: Configure Frontend Environment

Navigate to client directory:
```bash
cd ../client
```

Edit or create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_gemini_api_key_if_using
```

### Step 5: Start Development Servers

From project root:

**Option A: Start Both Servers (Recommended)**
```bash
npm run dev
```

**Option B: Start Servers Separately**

Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev:client
```

### Step 6: Verify Installation

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

## 🧪 Testing the API

### Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Open Postman
3. Click "Import" button
4. Select `Koreasste_Jewelry_API.postman_collection.json`
5. Set variables:
   - `base_url`: `http://localhost:5000`
6. Test API endpoints

### Quick Test Flow

1. **Register User**
   - POST /api/users/register
   - Save the returned token

2. **Login User**
   - POST /api/users/login
   - Save the returned token

3. **Get Profile**
   - GET /api/users/profile
   - Use token in Authorization header

4. **Get Products**
   - GET /api/products
   - No auth required

5. **Upload Image**
   - POST /api/uploads/image
   - Use token in Authorization header
   - Send image file

## 🗄️ Database Setup

### Using MongoDB Atlas (Cloud - Recommended)

1. Create MongoDB Atlas account
2. Create free cluster
3. Create database user
4. Whitelist your IP
5. Get connection string
6. Add to `.env` file as `MONGODB_URI`

### Using Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/koreasste`
4. Add to `.env` file

### Seed Initial Data

The application automatically seeds products on first run. To reseed:

```bash
npm run seed:products --prefix server
```

## 📸 Cloudinary Setup for Image Uploads

1. **Create Cloudinary Account**
   - Visit https://cloudinary.com/
   - Sign up for free account

2. **Get API Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, API Secret

3. **Configure Upload Folder**
   - Visit Settings > Upload
   - Set upload preset (optional, for signed uploads)
   - Create folder rule for: `koreasste-jewelry/products`

4. **Add to .env**
   ```
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

## 🔑 Environment Variables Reference

### Critical Variables (Must Set)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | Database connection | `mongodb+srv://...` |
| `JWT_SECRET` | Token signing key | Random 32-char string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account | `myaccount` |
| `CLOUDINARY_API_KEY` | Cloudinary key | Your API key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | Your API secret |

### Optional Variables (Recommended)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | 5000 | Server port |
| `JWT_EXPIRY` | 7d | Token expiration |
| `USE_MOCK_DB` | false | Use mock database |
| `NODE_ENV` | development | Environment |

## 🐛 Troubleshooting

### "Cannot find module" errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm install --prefix server
npm install --prefix client
```

### MongoDB Connection Failed

**Solution**: 
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- For local MongoDB, ensure service is running

### Cloudinary Upload Failed

**Solution**:
- Verify credentials in `.env`
- Check file size (max 5MB)
- Ensure file format is supported (JPG, PNG, GIF, WebP)

### Port Already in Use

**Solution**:
```bash
# For Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Errors

**Solution**:
- Check `ALLOWED_ORIGINS` in `.env`
- Ensure frontend URL matches
- Example: `http://localhost:3000`

## 📚 Project Commands

```bash
# Root commands
npm run dev              # Start both servers
npm run dev:server      # Start backend only
npm run dev:client      # Start frontend only
npm run build           # Build for production
npm run install:all     # Install all dependencies

# Server commands
npm run start --prefix server      # Start production server
npm run dev --prefix server        # Start dev server with nodemon

# Client commands
npm run dev --prefix client        # Start Vite dev server
npm run build --prefix client      # Build for production
npm run preview --prefix client    # Preview production build
```

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Update `ALLOWED_ORIGINS` to your domain
- [ ] Enable `SECURE_COOKIES=true`
- [ ] Use HTTPS/SSL certificate
- [ ] Set strong MongoDB password
- [ ] Enable MongoDB whitelist (only your server IP)
- [ ] Rotate Cloudinary API secret
- [ ] Enable two-factor authentication on all accounts
- [ ] Set up error logging
- [ ] Configure automated backups

## 📖 Next Steps

1. **Read Backend Documentation**: [BACKEND_README.md](./BACKEND_README.md)
2. **Review API Endpoints**: [BACKEND_README.md#api-endpoints](./BACKEND_README.md#api-endpoints)
3. **Setup Postman Collection**: `Koreasste_Jewelry_API.postman_collection.json`
4. **Test Authentication Flow**
5. **Create Your First Product**
6. **Test Image Upload**
7. **Test Payment Flow**
8. **Deploy to Production**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🚀 Deployment

For production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

Recommended platforms:
- Render (https://render.com) - Full-stack apps
- Railway (https://railway.app) - Node.js apps
- Vercel (https://vercel.com) - Frontend + serverless API

## 📞 Support

- Check existing issues on GitHub
- Read error messages carefully
- Check `.env` file configuration
- Verify all credentials
- Enable debug mode: `DEBUG=* npm run dev:server`

## 📝 Notes

- Mock database is available if MongoDB is not ready (set `USE_MOCK_DB=true`)
- Payment system is simulated (no real charges)
- Image upload requires Cloudinary account
- JWT tokens expire after 7 days (default)
- All passwords are hashed with bcryptjs

---

**Happy Coding! 🎉**
