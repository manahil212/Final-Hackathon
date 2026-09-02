import React, { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Saari tickets fetch karne ka function
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(res.data.tickets || res.data);
    } catch (error) {
      console.log("Error fetching tickets:", error);
      toast.error("Failed to load tickets!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Ticket ka status update karne ka function
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://final-hackathon-mnv5.onrender.com/api/tickets/update/${ticketId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Ticket status updated!");

      // Updated tickets dobara fetch karo
      fetchTickets();
    } catch (error) {
      console.log("Error updating status:", error);
      toast.error("Failed to update status!");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="mb-4">Agent Dashboard - All Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id || ticket.id}>
                <td>{ticket.title}</td>

                <td>{ticket.description}</td>

                <td>{ticket.category || "General"}</td>

                <td>
                  <Badge
                    bg={
                      ticket.status === "completed"
                        ? "success"
                        : ticket.status === "in progress"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {ticket.status || "pending"}
                  </Badge>
                </td>

                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2 mb-1"
                    onClick={() =>
                      handleStatusChange(ticket._id, "in progress")
                    }
                  >
                    In Progress
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="mb-1"
                    onClick={() =>
                      handleStatusChange(ticket._id, "completed")
                    }
                  >
                    Complete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AgentDashboard;