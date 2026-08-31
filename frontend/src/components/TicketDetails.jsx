
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
         `https://final-hackathon-1-9kyk.onrender.com/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Ticket Details:", response.data);

      setTicket(response.data.ticket || response.data);
    } catch (error) {
      console.log(
        "Error fetching ticket:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading ticket...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <Card className="text-center p-5 mt-5">
        <h4>Ticket Not Found</h4>

        <Button
          className="mt-3"
          onClick={() => navigate("/my-tickets")}
        >
          Back to Tickets
        </Button>
      </Card>
    );
  }

  return (
    <div className="container mt-5">

      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => navigate("/my-tickets")}
      >
        ← Back to Tickets
      </Button>

      <Card className="shadow-sm">

        <Card.Body>

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>{ticket.title}</h2>

            <Badge bg="primary">
              {ticket.status || "Open"}
            </Badge>

          </div>

          <hr />

          <h5>Description</h5>

          <p className="text-muted">
            {ticket.description}
          </p>

          <hr />

          <p>
            <strong>Ticket ID:</strong>{" "}
            {ticket._id}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString()
              : "N/A"}
          </p>

        </Card.Body>

      </Card>

    </div>
  );
};

export default TicketDetails;

