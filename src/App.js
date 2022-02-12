import React from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Members from "./pages/members";
import { Toaster } from "react-hot-toast";
import Requestloan from "./pages/requestloan";
import GroupRegister from "./pages/groupregister";
import { ToastContainer } from "react-toastify";
import Investments from "./pages/investments";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import Userdashboardhome from "./pages/userDashboard/userdashboardhome";
import AccountComplete from "./pages/accountComplete";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/members" element={<Members/>} />
          <Route path="/loans" element={<Requestloan/>} />
          <Route path="/groups" element={<GroupRegister/>} />
          <Route path="/investments" element={<Investments/>} />
          <Route path="/company/:id" element={<CompanyDetailsPage/>}/>
          <Route path="/dashboard/home" element={<Userdashboardhome/>} />
          <Route path="/accountConfirm" element={<AccountComplete/>} />
        </Routes>
        <ToastContainer />
        <Toaster />
    </div>
  );
}

export default App;
