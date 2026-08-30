import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchCustomerTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('"https://final-hackathon-mnv5.onrender.com/api/tickets"', {
          headers: { Authorization: "Bearer ${token}" }
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchCustomerTickets();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customer Dashboard</h2>
        <Button as={Link} to="/create-ticket" variant="primary">
          + Create New Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm p-3">
            <h5>Total Tickets</h5>
            <h3>{tickets.length}</h3>
          </Card>
        </Col>
      </Row>

      {/* Tickets Table */}
      <Card className="shadow-sm p-3">
        <h4>My Support Tickets</h4>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>
                    <span className={"badge bg-${ticket.status === 'Resolved' ? 'success' : 'warning'}"}>
                      {ticket.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No tickets found. Create one!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default CustomerDashboard;