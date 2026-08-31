import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProject from "./components/AddProject"
// import TicketDetails from "./components/TicketDetails";
import AgentDashboard from "./pages/AgentDashboard";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";
import Home from "./pages/Home";
import  CreateTicket  from "./pages/CreateTicket";
import "./App.css"
import CustomerDashboard from "./pages/CustomerDashboard";




function App() {
  return (
    <BrowserRouter>
<Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ticket/:id" element={<TicketDetails />}/>
         <Route path="/customer-dashboard" element={<CustomerDashboard/>} />
               <Route path="/agent-dashboard" element={<AgentDashboard/>} />
         <Route path="/ticket-list" element={<TicketList />}/>
         <Route path="/ticket-details/:id"element={<TicketDetails />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/create-ticket" element={<CreateTicket/>} />
      </Routes>
      
    </BrowserRouter>
 
  );
}

export default App;