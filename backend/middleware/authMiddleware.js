// yeh file  authenticATION OR SECURITY KO HANDLE KERAIGI yeh responsr or requqest kai darmityan kam kerti 
// jb client req bhejta haitu route ya controller tk pohonchnai sai pehlai wh middleware sasai guzarti hai
// import jwt from "jsonwebtoken";
// // import verifyToken from "./middleware/authMiddleware.js"

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "Access Denied. No token provided." 
//     });
//   }

//   try {
//     // Token aksar "Bearer <token>" ki form mein aata hai, isliye split karte hain
//     const token = authHeader.split(" ")[1] || authHeader;
    
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified; // user ki details request mein save ho jayengi
//     next(); // agle controller ya route par jane do
//   } catch (error) {
//     res.status(400).json({ 
//       success: false, 
//       message: "Invalid Token" 
//     });
//   }
// };

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid authorization format",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log("JWT ERROR:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid Token",
//     });
//   }
// };
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN RECEIVED:", token);
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED TOKEN:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(400).json({
      success: false,
      message: "Invalid Token",
    });
  }
};