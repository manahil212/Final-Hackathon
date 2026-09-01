
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
         `https://final-hackathon-1-9kyk.onrender.com/api/tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Ticket List:", response.data);

      setTickets(response.data.tickets || response.data);
    } catch (error) {
      console.log(
        "Error fetching tickets:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);


  // delete
  const getStatus = (status) => {
    if (status === "Open") {
      return <Badge bg="warning" text="dark">Open</Badge>;
    }

    if (status === "In Progress") {
      return <Badge bg="primary">In Progress</Badge>;
    }

    if (status === "Resolved") {
      return <Badge bg="success">Resolved</Badge>;
    }

    return <Badge bg="secondary">{status || "Open"}</Badge>;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading tickets...</p>
      </div>
    );
  }

// =========== DELETE HANDLER FUNCTION =============
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap waqai is ticket ko delete karna chahti hain?")) {
      try {
        const token = localStorage.getItem("token");
        
        await axios.delete(`http://localhost:5000/api/ticketsdelete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // UI ko foran update karne ke liye deleted ticket ko list se hata dein
        setTickets(tickets.filter((ticket) => ticket._id !== id));
      } catch (error) {
        console.log("Delete error:", error);
        alert("Failed to delete ticket");
      }
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Ticket List</h3>
          <p className="text-muted mb-0">
            Manage your support tickets
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/create-ticket")}
        >
          + New Ticket
        </Button>
      </div>

      {tickets.length === 0 ? (
        <Card className="text-center p-5 shadow-sm">
          <h5>No Tickets Found</h5>

          <p className="text-muted">
            You haven't created any tickets yet.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/create-ticket")}
          >
            Create Ticket
          </Button>
        </Card>
      ) : (
        <div className="row">

          {tickets.map((ticket) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={ticket._id}
            >
              <Card className="h-100 shadow-sm">

                <Card.Body>

                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">
                      {ticket.title}
                    </h5>

                    {getStatus(ticket.status)}
                  </div>

                  <p className="text-muted">
                    {ticket.description}
                  </p>

                  <small className="text-muted">
                    Created:{" "}
                    {ticket.createdAt
                      ? new Date(
                          ticket.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </small>
<button onClick={handleDelete(ticket._id)}
className="btn btn-danger btn-sm">
  Delete
</button>
                  <Button
  variant="primary"
  onClick={() => navigate(`/ticket/${ticket._id}`)}
>
  View Details
</Button>

                </Card.Body>

              </Card>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default TicketList;

