// yaha sari logics aingi jesai
// hash password kerna , user ka datra mongdb mai save kerna ,checkout kerna
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check karo email pehle se registered hai ya nahi
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // password ko hash karo
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    
    // // Create new user
    // const newUser = await User.create({
    //   fullName,
    //   email,
    //   password:hashedPassword,
    // });



    // user MongoDB mein save karo
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email, 
        password:newUser.password

      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// login  function
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email check
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //bcrypt.compare plain password ko data base walai password sai match keraiga agar sahi hoa tu true
   const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
       
      });
    }

    // jwt token
const token = jwt.sign(
  {
    id :user._id},
    process.env.JWT_SECRET,
    {expiresIn :"1d"}
  
);
    res.status(200).json({
      success: true,
      message: "Login successful",
       token :token,
        user :{
          id :user._id,
          name :user.name,
          email:user.email,
          password :user.password
         

        }
  })
 } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};