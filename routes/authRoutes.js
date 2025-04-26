const express = require('express');
const authController = require('../controllers/authController');
const {validateUserMiddleware, validateNewUserMiddleware} = require('../validators/authValidator')

const router = express.Router();


// Local login routes
router.post('/login',validateUserMiddleware, authController.postLogin);
router.post('/signup',validateNewUserMiddleware, authController.signup);

module.exports = router;

//Frontend implemnetation would look like this

// <!-- Auth0 Login Button -->
// <a href="/login">Login with Auth0</a>

// <!-- Local Login Form -->
// <form action="/login" method="POST">
//   <input type="email" name="email" placeholder="Email" required>
//   <input type="password" name="password" placeholder="Password" required>
//   <button type="submit">Login</button>
// </form>