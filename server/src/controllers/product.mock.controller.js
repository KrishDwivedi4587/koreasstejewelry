// Mock product controller for development without MongoDB
import mockDB from '../config/mockDB.js';

export const getAllProductsMock = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: mockDB.products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = mockDB.products.find(p => p._id === id || p._id.toString() === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProductMock = async (req, res, next) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    const product = {
      _id: `mock_id_${Date.now()}`,
      name,
      description,
      price,
      category,
      image,
      stock,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockDB.products.push(product);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const productIndex = mockDB.products.findIndex(p => p._id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    mockDB.products[productIndex] = {
      ...mockDB.products[productIndex],
      ...updateData,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: mockDB.products[productIndex]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productIndex = mockDB.products.findIndex(p => p._id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const deletedProduct = mockDB.products.splice(productIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedProduct
    });
  } catch (error) {
    next(error);
  }
};
