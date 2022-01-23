import React, { useEffect } from "react";
import InnerNavBar from "../components/InnerNavBar";
import kukuimage from "../home-assets/images/kukusample.png";

export default function CompanyDetailsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <InnerNavBar />
      <div className="row container" style={{ marginTop: "200px" }}>
        <div className="col-md-4 col-sm-12 mb-2">
          <div className="card" style={{ width: "100%" }}>
            <img
              src={kukuimage}
              className="img-fluid"
              style={{ width: "100%" }}
              alt="company-logo"
            />
          </div>
          <br />
          <div className="text-center">
            <button className="btn btn-info px-5">
              <b>Invest</b>
            </button>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 mb-2">
          <div className="mt-2 text-white ml-3">
            <h3 style={{ color: "white" }}>
              <b>Company Name</b>
            </h3>
            <p style={{ color: "white" }}>20 investors</p>
            <p style={{ color: "white" }}>Return percent: 5% per month</p>
            <p>Company link: www.kptl.com</p>
            <br/>
            <p style={{textAlign:'justify'}}>
            <b>Description:</b><br/>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
