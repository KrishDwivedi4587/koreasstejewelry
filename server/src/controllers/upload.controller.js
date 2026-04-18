import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const result = await cloud.uploader.upload(req.file.path, {
      folder: 'koreasste-jewelry/products',
      resource_type: 'auto',
      quality: 'auto:best',
      fetch_format: 'auto'
    });

    await fs.unlink(req.file.path);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        size: result.bytes,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

export const deleteProductImage = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    await cloud.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) =>
        cloud.uploader.upload(file.path, {
          folder: 'koreasste-jewelry/products',
          resource_type: 'auto',
          quality: 'auto:best',
          fetch_format: 'auto'
        })
      )
    );

    await Promise.all(req.files.map((file) => fs.unlink(file.path)));

    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
      size: result.bytes
    }));

    res.status(200).json({
      success: true,
      message: `${images.length} images uploaded successfully`,
      data: images
    });
  } catch (error) {
    if (req.files) {
      await Promise.all(req.files.map((file) => fs.unlink(file.path).catch(() => {})));
    }
    next(error);
  }
};
