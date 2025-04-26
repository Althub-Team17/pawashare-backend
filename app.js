const express = require('express');
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');
const connectDB = require('./config/db')

dotenv.config(); 
const app = express();

//Connect to Database
connectDB(); 

//Rate Limiting 
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

// Enable CORS for all origins
app.use(cors());

// Use authentication routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(limiter);
app.use('/', routes);

module.exports = app;