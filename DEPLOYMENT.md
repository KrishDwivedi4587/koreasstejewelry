# Deployment Configuration Files

This directory contains deployment configurations for various hosting platforms.

## Platforms Supported

1. **Render** - Recommended for small to medium projects
2. **Railway** - Good for Node.js applications
3. **Vercel** - Excellent for frontend, API routes for backend
4. **AWS** - Scalable enterprise solution
5. **DigitalOcean** - Affordable and reliable

## Quick Start Guides

### Render Deployment

1. Create account at https://render.com
2. Connect your GitHub repository
3. Create new Web Service
4. Environment: Node
5. Build Command: `npm install && npm install --prefix server && npm run build --prefix client`
6. Start Command: `npm run dev:server`
7. Add environment variables in Render dashboard
8. Deploy

### Railway Deployment

1. Create account at https://railway.app
2. Connect GitHub repository
3. Create new project
4. Add MongoDB plugin
5. Set environment variables
6. Deploy

### Vercel (Frontend + Serverless Backend)

1. Deploy frontend to Vercel (automatic from GitHub)
2. Use Vercel Functions for API endpoints
3. Configure MongoDB connection string
4. Set up environment variables

### AWS (EC2 + RDS)

1. Launch EC2 instance (t2.micro for free tier)
2. Install Node.js on EC2
3. Set up RDS for MongoDB Atlas alternative (PostgreSQL/MySQL)
4. Upload code to EC2
5. Use PM2 for process management
6. Set up Nginx as reverse proxy

### DigitalOcean (Droplet)

1. Create Droplet (2GB minimum recommended)
2. SSH into droplet
3. Install Node.js and npm
4. Clone repository
5. Install dependencies
6. Configure environment variables
7. Use PM2 for process management
8. Set up Nginx reverse proxy

## Environment Variables Required for Production

```
NODE_ENV=production
PORT=5000
MONGODB_URI=<production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
ALLOWED_ORIGINS=<your-production-domain>
CLIENT_URL=<your-client-production-url>
SECURE_COOKIES=true
SAME_SITE_COOKIES=strict
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test all API endpoints
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure backups
- [ ] Set up CDN for static assets
- [ ] Test payment flow
- [ ] Verify image upload works
- [ ] Set up email notifications
- [ ] Test authentication flow
- [ ] Monitor database performance
- [ ] Set up alerts for errors
