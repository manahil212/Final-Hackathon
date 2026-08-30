import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/tickets/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      navigate("/customer-dashboard");
    } catch (error) {
      console.log("Error creating ticket:", error.message);
      console.log("Backend error:", error.response?.data);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-sm p-4">
        <h2 className="mb-4">Create New Ticket</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit Ticket
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateTicket;


// import React, { useState } from "react";
// import { Container, Card, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateTicket = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/tickets/create",
//         {
//           title,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(res.data);

//       navigate("/customer-dashboard");
//     } catch (error) {
//       console.log("Error creating ticket:", error.message);
//       res.status(500).json({error : error.message})
//     }
//   };

//   return (
//     <Container className="mt-5" style={{ maxWidth: "600px" }}>
//       <Card className="shadow-sm p-4">
//         <h2 className="mb-4">Create New Ticket</h2>

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formTitle">
//             <Form.Label>Title</Form.Label>

//             <Form.Control
//               type="text"
//               placeholder="Enter ticket title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formDescription">
//             <Form.Label>Description</Form.Label>

//             <Form.Control
//               as="textarea"
//               rows={4}
//               placeholder="Describe your issue..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" className="w-100">
//             Submit Ticket
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default CreateTicket;

// const res = await axios.post(
//   "http://localhost:5000/api/tickets/create",
//   formData
// );

// console.log(res.data);