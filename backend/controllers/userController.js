
// // import User from "../models/userModel.js";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // User check
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Password check
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log("Login error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
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

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

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


