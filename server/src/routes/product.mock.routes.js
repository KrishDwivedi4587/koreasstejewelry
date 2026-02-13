import express from 'express';
import { body } from 'express-validator';
import {
  getAllProductsMock,
  getProductByIdMock,
  createProductMock,
  updateProductMock,
  deleteProductMock
} from '../controllers/product.mock.controller.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getAllProductsMock);

router.get('/:id', getProductByIdMock);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('image').notEmpty().withMessage('Image is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative number')
  ],
  handleValidationErrors,
  createProductMock
);

router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty(),
    body('description').optional().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('category').optional().trim().notEmpty(),
    body('image').optional().notEmpty(),
    body('stock').optional().isInt({ min: 0 })
  ],
  handleValidationErrors,
  updateProductMock
);

router.delete('/:id', deleteProductMock);

export default router;
