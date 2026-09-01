// yeh file complain aur tickets ka url ko handle kerti hai jb koi naya tickey banta hai ya status
//  updatae hota hai tu is file kai throygh hoga
// yeh file complain aur tickets ka url ko handle kerti hai jb koi naya tickey banta hai ya status
//  updatae hota hai tu is file kai throygh hoga
// import express from "express";
// import { createTicket, getTickets, updateTicketStatus,deleteTicket } from "../controllers/ticketController.js";
// import {verifyToken} from "../middleware/authMiddleware.js"


// const router = express.Router();

// router.post("/create",verifyToken, createTicket);
// router.get("/", getTickets);
// router.put("/update/:id", updateTicketStatus);
// router.delete("/delete/:id",verifyToken, deleteTicket);

// export default router;

import express from "express";

import {
  createTicket,
  getTickets,
  updateTicketStatus,
  deleteTicket,
} from "../controllers/ticketController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createTicket);

router.get("/", verifyToken, getTickets);

router.put("/update/:id", verifyToken, updateTicketStatus);

router.delete("/delete/:id", verifyToken, deleteTicket);

export default router;