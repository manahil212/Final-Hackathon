import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import React, { useEffect} from "react"
import { useState } from 'react';


function CustomNavbar() {
  // state khali string sai shuru kerai
  const navigate = useNavigate();
  const[search , setSearch] = useState("")

 
// bg-body-tertiary
 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <div className='d-flex gap-3'>
           
{/* LOGIN BUTTON */}
          <Form className="d-flex" > 
            <Button className="px-4 py-2 rounded" as={Link} to="/login" variant="outline-primary">Login</Button>
           </Form>
{/* SIGNUP BUTTON */}
          <Form className="d-flex"> 
            <Button className="px-4 py-2 rounded" as={Link} to="/signup" variant="outline-success">Signup</Button>
          </Form>
{/* CREATE-TICKET BUTTON */}
            <Form className="d-flex">
            <Button className="px-4 py-2 rounded" as={Link} to="/create-ticket" variant="outline-primary">Create Ticket</Button>
          </Form>
        


        <Form className="d-flex">
            <Button className='px-4 py-2 rounded' variant='outline-danger'  
             onClick={()=>{
               navigate("/agent-dashboard") //login page pe bhejnai kai liye
             }}>
             Agent Dashboard
              </Button>
              </Form>
{/* CUSTOMER-DASHBOARD BUTTON */}
           <Form className="d-flex">
            <Button className='px-4 py-2 rounded' variant='outline-danger'  
             onClick={()=>{
               navigate("/customer-dashboard") //login page pe bhejnai kai liye
             }}>
             Customer Dashboard
              </Button>
              </Form></div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;