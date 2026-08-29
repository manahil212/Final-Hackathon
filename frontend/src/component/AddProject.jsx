import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
 import { toast } from "react-toastify";
 import { useState } from 'react';

function AddProject() {
const navigate =useNavigate()
   //email or password kai liye state (onchange)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
     const [url, setUrl] = useState("");
    const [title, setTitle] = useState("")
// button click add project
   const handleAddProject= async() => {
      console.log("Developer name:" , name)
      console.log("Description:" , description)
       console.log("Url:" , url)
      console.log("Title:" , title)

try{
  // axios kai throgh backend pr login request bhejna
  const response = await axios.post("http://localhost:5000/api/projects/submit", {
    name :name,
    description :description,
    url:url,
    title:title
  })

  console.log("Server Response:" , response.data); 
   toast.success("Add project");

  //  login kai bad user ko home page pr bhejdena
  navigate("/");
}  catch (error){
  console.error("Error:" , error.response?.data || error.message)
      toast.error("failed add project")
    
}
  };
        

     

  return (
    <div className='modern-card bg-white p-8 rounded-xl  w-100 max-w-md mx-auto d-flex justify-content-center align-items-center vh-100 '
    style={{marginTop:"-30px"}}>
    <Form>
      <h1  className='mb-4 fs-3 '>Add Project</h1>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Developer Name:</Form.Label>
        <Form.Control 
        type="name"
         placeholder=""
          value ={name}
        onChange={(e) => {setName(e.target.value)
    console.log("Add Project:" , {name,description,url,title})}}
     />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Project Title:</Form.Label>
        <Form.Control
         value ={title}
        onChange={(e) => {setTitle(e.target.value)
    console.log("Add Project:" , {name,description,url,title})}} 
    type="title" 
    placeholder="" />
      </Form.Group>
      
      
      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Project Url:</Form.Label>
        <Form.Control 
         value ={url}
        onChange={(e) => {setUrl(e.target.value)
    console.log("Add Project:" , {name,description,url,title})}}
    type="url"
     placeholder="" />
      </Form.Group>
      
      <Form.Group className=" text-start mb-3" controlId="formBasicPassword">
        <Form.Label>Description:</Form.Label>
        <Form.Control type="description" 
         value ={description}
        onChange={(e) => {setDescription(e.target.value)
    console.log("Add Project:" , {name,description,url,title})}}
    placeholder="" />
      </Form.Group>
      
      
      <Button variant="primary"
       type="button"
       onClick={handleAddProject}>
        Add Project
      </Button>
    </Form></div>
  );
}

export default AddProject;