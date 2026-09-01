
import Ticket from "../models/Ticket.js";

// ================= CREATE TICKET =================

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const ticket = new Ticket({
      title,
      description,
      user: req.user.userId,
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


// ================= GET TICKETS =================
export const getTickets = async (req, res) => {
  try {
    // console.log("CHECK Request.USER:", req.user);

    // let query = {};

    // if (
    //   req.user &&
    //   req.user.role &&
    //   req.user.role.toLowerCase() === "customer"&&
    //   req.user.userId
    // )
    //  {
    //   query = { user: req.user.userId };
    // }

    const tickets = await Ticket.find(query).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.log("Get tickets error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getTickets = async (req, res) => {
//   try {
//     console.log("CHECK Request.USER:", req.user);
//     let query = {};
//     if (req.user && req.user.role && req.user.role.toLowerCase() === "customer") {
//       query ={user: req.user.Id}
//     }
//     const tickets = await Ticket.find(query).sort({ createdAt: -1 });
//     res.status(200).json(tickets);
//   } catch (error) {
//     console.log("Get tickets error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ================= GET SINGLE TICKET =================

export const getTicketById = async (req, res) => {
  try {

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });

  } catch (error) {
    console.log("Get ticket error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE TICKET =================

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      // user: req.user.userId,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
      ticket
    });

  } catch (error) {
    console.log("Delete ticket error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE TICKET STATUS =================

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Open",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        status: status,
      },
      {
        new: true,
      }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      ticket,
    });

  } catch (error) {
    console.log("Update status error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};