const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const {
  createUser,
  findUserByEmail,
} = require("../models/userModel");

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(
      uuidv4(),
      name,
      email,
      passwordHash
    );

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}


// LOGIN FUNCTION
async function login(req, res) {
  try {

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
    console.log("SIGN SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

// PROFILE FUNCTION
async function profile(req, res) {
  res.json({
    message: "Profile fetched successfully",
    user: req.user
  });

}

module.exports = {
  signup,
  login,
  profile,
};