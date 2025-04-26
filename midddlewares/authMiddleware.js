const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}; 

module.exports = authMiddleware; 