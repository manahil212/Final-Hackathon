import { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, resolvePath } from 'react-router-dom';
import { toast } from "react-toastify";


function Signup() {
  // state banali onChange kai liye//
 const [name ,setName] = useState("")
  const [email ,setEmail] = useState("")
   const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
const [role, setRole] = useState("customer")
    // SIGNUP BUTTON CLICK
  const handleSignup=async() => {
    console.log("Name:" , name)
       console.log( "Email:" , email )
       console.log( "Password:" ,password )
        console.log("ConfrimPassword:" , confirmPassword)
    
try{
  // axios kai through backend pr data bhena
  const response = await axios.post(`https://final-hackathon-1-9kyk.onrender.com/api/users/signup`,{
    name:name,
    email:email,
    password:password,
    role: role
  })
  console.log("Server Response:" , response.data);
   toast.success("Signup successfull")
  }catch (error) {
    console.error("Error:" , error.response?.data || error.message)
    toast.error("Signup failed")
  }
}
  return (
  
    <div className='modern-card bg-white p-8 rounded-xl w-100 max-w-md mx-auto d-flex justify-content-center align-items-center vh-100'
     style={{marginTop:"-40px"}}>
       {/* ICON */}
    <Form>
       <h1 className='mb-4 fs-3'>Signup</h1>
{/* SIGNUP QUESTIONS */}
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
         type="name" 
         value ={name}
         placeholder="Enter Name"
         onChange={(e) => {setName(e.target.value)
            // console.log("Signup data:", {name, email, password,confirmPassword});
            }} />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
        type="email"
         value ={email} 
         placeholder="Email"
         onChange={(e) => {setEmail(e.target.value)
         
          console.log("Signup data:", {name, email, password,confirmPassword});
         }} />
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          value ={password}
          type="password" 
         placeholder="Password"
         onChange={(e) => {setPassword(e.target.value)
        console.log("Signup data:", {name, email, password,confirmPassword})}} 
        />
      </Form.Group>

       <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        value ={confirmPassword} 
        type="password" 
         placeholder="Confirm Password"
         onChange={(e) => {setConfirmPassword(e.target.value)
         console.log("Signup data:", {name, email, password,confirmPassword})}} />
      </Form.Group>
        NEW CODE DROPDOWN OF
      <Form.Group className="mb-3 text-start" controlId="formBasicRole">
       <Form.Label>Select Role</Form.Label>
  <Form.Select 
    value={role} 
    onChange={(e) => setRole(e.target.value)}
  >
    <option value="customer">Customer</option>
    <option value="agent"> Agent</option>
  </Form.Select>
</Form.Group>


      <Button variant="primary"
       type="button"
         onClick={handleSignup}>
        Signup
      </Button>

      <div>
        <p>Already have an account? <Link to="/login">Login</Link></p>
       </div>
    </Form>
     </div>
  );
}

export default Signup;