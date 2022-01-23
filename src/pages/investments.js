import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";
import InvestmentCard from "../components/InvestmentCard";

export default function Investments() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <InnerNavBar />
      <div style={{ marginTop: "100px" }} className="container">
        <div className="text-center">
          <h3 style={{ color: "white" }}>
            <b>
              <u>Investments</u>
            </b>
          </h3>
        </div>

        <div className="mt-3">
          <Link to="/register" className="btn btn-outline-light">
            <b>Add your company</b>
          </Link>
        </div>

        <div className="row mt-5">
          <InvestmentCard />
          <InvestmentCard />
          <InvestmentCard />
          <InvestmentCard />
        </div>
      </div>
    </>
  );
}
