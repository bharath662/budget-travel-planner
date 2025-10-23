 require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./utils/db');

const tripsRouter = require('./routes/trips');
const feedbacksRouter = require('./routes/feedbacks');

const app = express();

// Security + CORS + Middleware
app.use(helmet());
app.use(cors({ origin: '*' })); // For now allow all origins (can restrict later)
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('✅ Budget Travel Planner API is running...');
});

app.use('/api/trips', tripsRouter);
app.use('/api/feedbacks', feedbacksRouter);

// Port setup for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
