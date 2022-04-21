import React from "react";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Members from "./pages/auth/members";
import { Toaster } from "react-hot-toast";
import Requestloan from "./pages/requestloan";
import GroupRegister from "./pages/groupregister";
import { ToastContainer } from "react-toastify";
import Investments from "./pages/investments";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import Userdashboardhome from "./pages/userDashboard/userdashboardhome";
import AccountComplete from "./pages/accountComplete";
import CampusAmbassadors from "./pages/campusAmbassadors";
import CampusConfirm from "./pages/campusConfirm";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/members" exact element={<Members/>} />
          <Route path="/loans" exact element={<Requestloan/>} />
          <Route path="/groups" exact element={<GroupRegister/>} />
          <Route path="/investments" exact element={<Investments/>} />
          <Route path="/company/:id" exact element={<CompanyDetailsPage/>}/>
          <Route path="/dashboard/home" exact element={<Userdashboardhome/>} />
          <Route path="/accountConfirm" exact element={<AccountComplete/>} />
          <Route path="/campus" exact element={<CampusAmbassadors/>} />
          <Route path="/campusConfirm" exact element={<CampusConfirm/>} />
        </Routes>
        <ToastContainer />
        <Toaster />
    </div>
  );
}

export default App;
