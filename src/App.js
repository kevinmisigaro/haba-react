import React from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Members from "./pages/members";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/members" element={<Members/>} />
        </Routes>
        <Toaster />
    </div>
  );
}

export default App;
