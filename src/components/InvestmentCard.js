import React from "react";
import { Link } from "react-router-dom";
import kukuimage from "../home-assets/images/kukusample.png";

export default function InvestmentCard() {
  return (
    <div className="col-md-3 mb-3">
      <Link to="/company" style={{ color: "black", textDecoration:'none' }}>
        <div className="card shadow" style={{ width: "100%" }}>
          <div className="text-center">
            <img
              src={kukuimage}
              className="img-fluid"
              style={{ maxWidth: "150px" }}
              alt="..."
            />
          </div>
          <div className="card-body">
            <p>
              <b>Company name</b> <br /> 20 investors
            </p>
            <div className="text-center">
              <Link to="/company" className="btn btn-sm btn-success px-5 py-1">View</Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
