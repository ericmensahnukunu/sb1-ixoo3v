import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { router as matchesRouter } from './routes/matches.js';
import { router as oddsRouter } from './routes/odds.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust first proxy for rate limiter
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting with custom key generator
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || 'anonymous';
  }
});

// Apply rate limiter to all routes
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/matches', matchesRouter);
app.use('/api/odds', oddsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// request handler
app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.path);
  next();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({
    error: message,
    status: statusCode
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});