import React from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Members from "./pages/members";
import { Toaster } from "react-hot-toast";
import Requestloan from "./pages/requestloan";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/members" element={<Members/>} />
          <Route path="/loans" element={<Requestloan/>} />
        </Routes>
        <Toaster />
    </div>
  );
}

export default App;
