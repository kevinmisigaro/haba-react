import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";

export default function CampusConfirm() {
  return (
    <>
      <InnerNavBar />
      <div
        className="container text-center"
        style={{ padding: "30px 0", marginTop: "150px" }}
      >
        <h3>You have successfully submitted an application.</h3>
        <BsFillPatchCheckFill
          style={{ color: "green", fontSize: "120px", margin: "60px 0" }}
        />
        <br />
        <Link to="/" className="btn btn-success" style={{ color: "white" }}>
          Return home
        </Link>
        <br />
      </div>
    </>
  );
}
