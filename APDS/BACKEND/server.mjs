import fs from 'fs';
import https from 'https';
import express from 'express';
import helmet from 'helmet';
import bcrypt from 'bcrypt';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

dotenv.config();

const server = express();
const databaseURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Check required environment variables
if (!process.env.JWT_SECRET || !process.env.MONGO_URI || !process.env.SSL_KEY_PATH || !process.env.SSL_CERT_PATH) {
  console.error('Environment variables are missing. Exiting...');
  process.exit(1);
}

// Load SSL certificate and key with error handling
let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };
} catch (error) {
  console.error('Error loading SSL files:', error);
  process.exit(1);
}

// MongoDB connection with options for deprecation warnings
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeAdminAccount();
  })
  .catch(err => console.error('MongoDB connection failure:', err));

// Initialize Admin Account (Seed Data)
async function initializeAdminAccount() {
  try {
    const adminID = process.env.ADMIN_ACCOUNT_NUMBER || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await UserModel.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin account is already created');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPass, 10);
    const adminUser = new UserModel({
      fullName: 'Admin',
      idNumber: '0000000000000',
      accountNumber: adminID,
      passwordHash: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log(`Admin account established with ID: ${adminID}`);
  } catch (err) {
    console.error('Error creating admin account:', err);
  }
}

// Logger setup using winston
const appLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Enable CORS and security headers
server.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Include the OPTIONS method
}));


server.use(express.json());
server.use(cookieParser());

// Secure HTTP Headers Configuration using Helmet
server.use(helmet({
  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

server.use(morgan('combined'));

// Rate limiting for API requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiter globally
server.use(apiLimiter);

// HTTP to HTTPS redirection middleware
server.use((req, res, next) => {
  if (req.secure || process.env.NODE_ENV === 'development') {
    return next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'user'], default: 'user' }
});

const UserModel = mongoose.model('User', userSchema);

// MongoDB Payment Schema
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  accountInfo: { type: String, required: true },
  swiftCode: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

// Middleware for Role-Based Access Control
function validateUserRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  };
}

// Route to handle payment submission
server.post('/api/payment', authenticateToken, validateUserRole(['user']), [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').isString().trim().withMessage('Currency must be a string'),
  body('accountInfo').isString().trim().withMessage('Account info is required'),
  body('swiftCode').isString().trim().withMessage('SWIFT code is required'),
], async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { amount, currency, accountInfo, swiftCode } = req.body;
  const userId = req.user.id;

  try {
    const newPayment = new PaymentModel({
      userId,
      amount,
      currency,
      accountInfo,
      swiftCode,
      status: 'pending',
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment successfully submitted', payment: newPayment });
  } catch (err) {
    appLogger.error('Error processing payment:', err);
    res.status(500).json({ message: 'Error during payment submission.' });
  }
});






// Route to create an admin account (accessible by admin only)
server.post('/api/admin/create-account', authenticateToken, validateUserRole(['admin']), [
  body('fullName').isString().trim().escape(),
  body('idNumber').isString().trim().escape(),
  body('accountNumber').isString().trim().escape(),
  body('password').isString().trim().escape(),
  body('role').isString().trim().escape().isIn(['employee', 'user']),
], async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { fullName, idNumber, accountNumber, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ accountNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Account number already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new UserModel({
      fullName,
      idNumber,
      accountNumber,
      passwordHash: encryptedPassword,
      role
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin account successfully created' });
  } catch (err) {
    appLogger.error('Error creating admin account:', err);
    res.status(500).json({ message: 'Error during admin account creation.' });
  }
});


// Route to create a user account (accessible by employee only)
server.post('/api/employee/create-user', authenticateToken, validateUserRole(['employee']), [
  body('fullName').isString().trim().escape(),
  body('idNumber').isString().trim().escape(),
  body('accountNumber').isString().trim().escape(),
  body('password').isString().trim().escape(),
  body('role').isString().trim().escape().isIn(['user']),
], async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { fullName, idNumber, accountNumber, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ accountNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Account number already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullName,
      idNumber,
      accountNumber,
      passwordHash: encryptedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'User account successfully created' });
  } catch (err) {
    appLogger.error('Error creating user account:', err);
    res.status(500).json({ message: 'Error during user account creation.' });
  }
});

// Login Route (issues JWT for authentication)
// Login Route (issues JWT for authentication)
server.post('/api/login', [
  body('accountNumber').isString().trim().escape(),
  body('password').isString().trim().escape(),
], async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { accountNumber, password } = req.body;

  try {
    const user = await UserModel.findOne({ accountNumber });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
      id: user._id,
      accountNumber: user.accountNumber,
      role: user.role,  // Ensure role is included in the token
    }, process.env.JWT_SECRET);
    

    // Send the token and role in the response
    res.json({ 
      token, 
      role: user.role,  // Ensure role is sent along with the token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});




function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // Debugging line to check the token

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token); // Log the token for debugging

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Log the decoded token to verify its contents

      req.user = { id: decoded.id, accountNumber: decoded.accountNumber, role: decoded.role };
      next();
    } catch (err) {
      console.error("Token Verification Error:", err); // Log the error for debugging
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } else {
    console.log("Token Missing or Malformed"); // Log when token is missing or malformed
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }
}




// Start HTTPS server
https.createServer(sslOptions, server).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
