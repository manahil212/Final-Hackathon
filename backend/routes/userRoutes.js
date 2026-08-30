// yeh file user authenticTION  KAI LIYE JB USER LOGIN REGISTER KARAIGA TU REQUEST AUTHCONTROLLER KI FIKE KAI ZARIYE JAIGI
// import express from "express";
// import { signup, login } from "../controllers/userController.js";
// import { login } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", loginUser);

// export default router;

import express from "express";

import { signup, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

export default router;