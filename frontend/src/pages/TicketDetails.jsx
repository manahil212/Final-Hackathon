import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTicketDetails = async () => {
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
        "Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicketDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h4>Loading Ticket...</h4>
      </Container>
    );
  }

  if (!ticket) {
    return (
      <Container className="mt-5 text-center">
        <h4>Ticket not found</h4>

        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate("/customer-dashboard")}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">

      <Card
        className="shadow-sm mx-auto"
        style={{ maxWidth: "650px" }}
      >

        <Card.Body>

          <h2 className="mb-4">
            Ticket Details
          </h2>

          <Form>

            {/* Ticket ID */}
            <Form.Group className="mb-3">
              <Form.Label>
                Ticket ID
              </Form.Label>

              <Form.Control
                type="text"
                value={ticket._id}
                readOnly
              />
            </Form.Group>

            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>
                Ticket Title
              </Form.Label>

              <Form.Control
                type="text"
                value={ticket.title}
                readOnly
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                value={ticket.description}
                readOnly
              />
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>
                Status
              </Form.Label>

              <Form.Control
                type="text"
                value={ticket.status || "Pending"}
                readOnly
              />
            </Form.Group>

            {/* Created Date */}
            <Form.Group className="mb-4">
              <Form.Label>
                Created Date
              </Form.Label>

              <Form.Control
                type="text"
                value={
                  ticket.createdAt
                    ? new Date(
                        ticket.createdAt
                      ).toLocaleString()
                    : "N/A"
                }
                readOnly
              />
            </Form.Group>

            {/* Back Button */}
            <Button
              variant="secondary"
              onClick={() =>
                navigate("/customer-dashboard")
              }
            >
              ← Back to Dashboard
            </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
}

export default TicketDetails;

