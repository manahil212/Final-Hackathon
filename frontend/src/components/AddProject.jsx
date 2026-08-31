// import Button from 'react-bootstrap/Button';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
//  import { toast } from "react-toastify";
//  import { useState } from 'react';

// function AddProject() {
// const navigate =useNavigate()
//    //email or password kai liye state (onchange)
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("")
//      const [url, setUrl] = useState("");
//     const [title, setTitle] = useState("")
// // button click add project
//    const handleAddProject= async() => {
//       console.log("Developer name:" , name)
//       console.log("Description:" , description)
//        console.log("Url:" , url)
//       console.log("Title:" , title)

// try{
//   // axios kai throgh backend pr login request bhejna
//   const response = await axios.post("http://localhost:5000/api/projects/submit", {
//     name :name,
//     description :description,
//     url:url,
//     title:title
//   })

//   console.log("Server Response:" , response.data); 
//    toast.success("Add project");

//   //  login kai bad user ko home page pr bhejdena
//   navigate("/");
// }  catch (error){
//   console.error("Error:" , error.response?.data || error.message)
//       toast.error("failed add project")
    
// }
//   };
        

     

//   return (
//     <div className='modern-card bg-white p-8 rounded-xl  w-100 max-w-md mx-auto d-flex justify-content-center align-items-center vh-100 '
//     style={{marginTop:"-30px"}}>
//     <Form>
//       <h1  className='mb-4 fs-3 '>Add Project</h1>
//       <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
//         <Form.Label>Developer Name:</Form.Label>
//         <Form.Control 
//         type="name"
//          placeholder=""
//           value ={name}
//         onChange={(e) => {setName(e.target.value)
//     console.log("Add Project:" , {name,description,url,title})}}
//      />
//       </Form.Group>

//       <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
//         <Form.Label>Project Title:</Form.Label>
//         <Form.Control
//          value ={title}
//         onChange={(e) => {setTitle(e.target.value)
//     console.log("Add Project:" , {name,description,url,title})}} 
//     type="title" 
//     placeholder="" />
//       </Form.Group>
      
      
//       <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
//         <Form.Label>Project Url:</Form.Label>
//         <Form.Control 
//          value ={url}
//         onChange={(e) => {setUrl(e.target.value)
//     console.log("Add Project:" , {name,description,url,title})}}
//     type="url"
//      placeholder="" />
//       </Form.Group>
      
//       <Form.Group className=" text-start mb-3" controlId="formBasicPassword">
//         <Form.Label>Description:</Form.Label>
//         <Form.Control type="description" 
//          value ={description}
//         onChange={(e) => {setDescription(e.target.value)
//     console.log("Add Project:" , {name,description,url,title})}}
//     placeholder="" />
//       </Form.Group>
      
      
//       <Button variant="primary"
//        type="button"
//        onClick={handleAddProject}>
//         Add Project
//       </Button>
//     </Form></div>
//   );
// }

// export default AddProject;

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
         "https://final-hackathon-mnv5.onrender.com/api/tickets/${id}",
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

