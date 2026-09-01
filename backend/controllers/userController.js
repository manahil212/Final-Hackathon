

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.log("Signup error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN =================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("REQ.BODY =", req.body);
console.log("EMAIL =", email);
console.log("PASSWORD EXISTS =", !!password);
    

    // Find user 
    const user = await User.findOne({ email });
     if (!user) 
      { return res.status(400).json(
      { success: false,
         message: "User not found", }); }

  console.log("USER FOUND =", !!user);
console.log("USER PASSWORD EXISTS =", !!user?.password);
    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


