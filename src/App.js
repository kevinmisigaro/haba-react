import React from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
    </div>
  );
}

export default App;
