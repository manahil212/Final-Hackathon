
// import Ticket from "../models/Ticket.js";

// // ================= CREATE TICKET =================

// export const createTicket = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and description are required",
//       });
//     }

//     const ticket = new Ticket({
//       title,
//       description,
//       user: req.user.userId,
//     });

//     await ticket.save();

//     res.status(201).json({
//       success: true,
//       message: "Ticket created successfully",
//       ticket,
//     });

//   } catch (error) {
//     console.log("Create ticket error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// // / ==================== GET TICKETS ====================

// export const getTickets = async (req, res) => {
//   try {
//     console.log("CHECK Request.USER:", req.user);

//     const tickets = await Ticket.find({
//       user: req.user._id,
//     })
//     .sort({ createdAt: -1 });

//     res.status(200).json(tickets);
//   } catch (error) {
//     console.log("Get tickets error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= GET SINGLE TICKET =================

// export const getTicketById = async (req, res) => {
//   try {

//     const ticket = await Ticket.findOne({
//       _id: req.params.id,
//       user: req.user.userId,
//     });

//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: "Ticket not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       ticket,
//     });

//   } catch (error) {
//     console.log("Get ticket error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= DELETE TICKET =================

// export const deleteTicket = async (req, res) => {
//   try {
//     const ticket = await Ticket.findOneAndDelete({
//       _id: req.params.id,
//       // user: req.user.userId,
//     });

//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: "Ticket not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Ticket deleted successfully",
//       ticket
//     });

//   } catch (error) {
//     console.log("Delete ticket error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= UPDATE TICKET STATUS =================

// export const updateTicketStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const allowedStatus = [
//       "Open",
//       "In Progress",
//       "Resolved",
//     ];

//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const ticket = await Ticket.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       {
//         status: status,
//       },
//       {
//         new: true,
//       }
//     );

//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: "Ticket not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Ticket status updated successfully",
//       ticket,
//     });

//   } catch (error) {
//     console.log("Update status error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import Ticket from "../models/Ticket.js";

// ======================== CREATE TICKET ========================
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Sahi ID format (req.user._id) use kiya hai
    const ticket = new Ticket({
      title,
      description,
      user: req.user._id, 
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.log("Create ticket error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================== GET ALL TICKETS ========================
export const getTickets = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const tickets = await Ticket.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.log("Get tickets error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================== GET SINGLE TICKET ========================
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.log("Get ticket by id error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================== UPDATE TICKET ========================
export const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const updatedTicketStatus = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      updatedTicket,
    });
  } catch (error) {
    console.log("Update ticket error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= DELETE TICKET ========================
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.log("Delete ticket error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};