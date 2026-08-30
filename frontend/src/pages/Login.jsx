// import { useState } from 'react';
// import axios from "axios"
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { FaFacebook } from "react-icons/fa6";//icon import
// import { Link ,useNavigate} from 'react-router-dom';     //links import
// import { toast } from "react-toastify";      //notification alert import


// function Login() { 
//   const navigate =useNavigate()
//   //email or password kai liye state (onchange)
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("")


//   // click button onclick
//     const handleLogin =async () => {
    
//      console.log("Email:" , email)
//       console.log("Password:" , password)
// try{
//   // axios kai throgh backend pr login request bhejna
//   const response = await axios.post("http://localhost:5000/api/users/login", {
//     email :email,
//     password:password
//   })

//   console.log("Server Response:" , response.data); 
//    toast.success("Login successfull");

//   //  login kai bad user ko home page pr bhejdena
//   navigate("/");
// }  catch (error){
//   console.error("Error:" , error.response?.data || error.message)
//       toast.error("Login failed")
    
// }
//   };

//   return (
//     <div className='modern-card bg-white p-8 rounded-xl  w-100 max-w-md mx-auto d-flex justify-content-center align-items-center vh-100'>
//     {/* FACBOOK ICON */}
//     <Form >
//       <div className='text-center mb-4'>
//         <FaFacebook size={40} className='text-primary mb-2'/>
//       </div>

//     {/* LOGIN  QUESTIONS */}
//       <Form.Group className="text-start mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control 
//         type="email"
//         placeholder="Enter email"
//         value ={email}
//         onChange={(e) => {setEmail(e.target.value)
//     console.log("Login data:" , {email,password})
//         }}
//         />
//       </Form.Group>

//       <Form.Group className=" text-start mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control 
//         type="password" 
//         placeholder="Password" 
//          value ={password}
//         onChange={(e) => {setPassword(e.target.value)
//             console.log("Login data:" , {email,password})
//         }} />
//       </Form.Group>
    
//       <Button 
//           variant="primary" 
//           type="button"
//           onClick={handleLogin}>
//       Login
//       </Button>

//        <div>
//         <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//        </div>
//     </Form></div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Backend login API
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Server Response:", response.data);

      // JWT token ko localStorage mein save karo
      localStorage.setItem("token", response.data.token);

      // User data bhi save kar sakte hain
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );

      toast.success("Login successful");

      // Login ke baad home page
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="modern-card bg-white p-8 rounded-xl w-100 max-w-md mx-auto d-flex justify-content-center align-items-center vh-100">
      <Form>
        {/* FACEBOOK ICON */}
        <div className="text-center mb-4">
          <FaFacebook
            size={40}
            className="text-primary mb-2"
          />
        </div>

        {/* EMAIL */}
        <Form.Group
          className="text-start mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group
          className="text-start mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* LOGIN BUTTON */}
        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
        >
          Login
        </Button>

        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Signup</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;

