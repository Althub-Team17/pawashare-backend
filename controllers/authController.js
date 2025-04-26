const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {

      // Check if user already exists
      const userExists = await User.findOne({ 
        email: req.body.email ,
        username: req.body.username
    });
      if (userExists) return res.json("Email or Username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
  

    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A user with this details already exists.",
      });
    }
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  }); 

  try {
   
    res.send('User Logged-In Successfully');

    // change to user-dashboard 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};