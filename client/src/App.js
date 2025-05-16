import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
   
     <div>
       <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     </div>
   
  );
};

export default App;