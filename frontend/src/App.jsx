import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import AddProject from "./component/AddProject"
import Home from "./component/Home";
import "./App.css"



function App() {
  return (
    <BrowserRouter>
<Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
      
    </BrowserRouter>
 
  );
}

export default App;