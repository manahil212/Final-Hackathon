


import Ticket from "../models/Ticket.js";

// ======================== CREATE TICKET ========================
export const createTicket = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user)
    const { title, description, category } = req.body
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      user: req.user.userId,
    });

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
    console.log("LOGGED IN USER:", req.user)
    let query = {};
    if(req.user.role !== "agent") {
     query = {user: req.user.userId};
    }

    const tickets = await Ticket.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });
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
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
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

// ======================== DELETE TICKET ========================
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
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

