import express from 'express';
import {
  uploadProductImage,
  deleteProductImage,
  uploadMultipleImages
} from '../controllers/upload.controller.js';
import { uploadSingle, uploadMultiple } from '../middlewares/upload.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/image',
  authenticate,
  uploadSingle.single('image'),
  uploadProductImage
);

router.post(
  '/images',
  authenticate,
  uploadMultiple.array('images', 10),
  uploadMultipleImages
);

router.delete(
  '/image',
  authenticate,
  deleteProductImage
);

export default router;
