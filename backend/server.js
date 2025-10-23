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
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 200 }));

// Routes
app.use('/api/trips', tripsRouter);
app.use('/api/feedback', feedbacksRouter);

app.get('/', (req, res) => {
  res.send('✅ Budget Travel Planner API is running...');
});

// Start server + DB
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
