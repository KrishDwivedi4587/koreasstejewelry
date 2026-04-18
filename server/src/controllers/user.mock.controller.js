// Mock user controller for development without MongoDB
import mockDB from '../config/mockDB.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcryptjs.compare(password, hashedPassword);
};

export const registerUserMock = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = mockDB.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = {
      _id: `mock_user_${Date.now()}`,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockDB.users.push(user);

    const token = generateToken(user._id);

    const userResponse = { ...user };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        ...userResponse,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserMock = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = mockDB.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    const userResponse = { ...user };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        ...userResponse,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdMock = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = mockDB.users.find(u => u._id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserMock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, address } = req.body;

    const userIndex = mockDB.users.findIndex(u => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (firstName) mockDB.users[userIndex].firstName = firstName;
    if (lastName) mockDB.users[userIndex].lastName = lastName;
    if (phone) mockDB.users[userIndex].phone = phone;
    if (address) mockDB.users[userIndex].address = address;

    mockDB.users[userIndex].updatedAt = new Date();

    const userResponse = { ...mockDB.users[userIndex] };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: userResponse
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserMock = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = mockDB.users.find(u => u._id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    next(error);
  }
};
