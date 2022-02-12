import React from "react";
import { Link } from "react-router-dom";
import kukuimage from "../home-assets/images/kukusample.png";

export default function InvestmentCard({ company }) {
  return (
    <div className="col-md-4 mb-3">
      <Link
        to={{ pathname: `/company/${company.id}` }}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="card shadow" style={{ width: "100%" }}>
          <div className="text-center">
            <img
              src={kukuimage}
              className="img-fluid"
              style={{ width: "100%" }}
              alt="..."
            />
          </div>
          <div className="card-body">
            <p>
              <b>{company.name}</b> <br /> {company.investors.length} investors
            </p>
            <div className="text-center">
              <Link
                to={{ pathname: `/company/${company.id}` }}
                className="btn btn-sm btn-success px-5 py-1"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
