import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../components/InnerNavBar";
import kukuimage from "../home-assets/images/kukusample.png";

export default function CompanyDetailsPage() {
  const [company, setCompany] = useState({});
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [percentage, setPercentage] = useState(0);
  const [values, setValues] = useState({
    habaID: "",
    amount: "",
  });

  const handleAmountChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      amount: e.target.value,
    }));
  };

  const handleIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      habaID: e.target.value,
    }));
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    const fetchCompany = async (id) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/company/${id}`)
        .then((res) => {
          const data = res.data;
          setCompany(res.data);

          let rAmount = parseInt(data.raising_goal);
          let currentAmount = parseInt(data.investment_amount);

          const result = (currentAmount / rAmount) * 100;

          setPercentage(result);
        });
    };

    fetchCompany(id);

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleClose();
    console.log(values);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/company/invest/${id}`,
        values
      )
      .then((res) => {
        toast.success(
          "You have submitted a request to invest. Please await feedback."
        );
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

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
            <Button variant="info" className="btn-block" onClick={handleShow}>
              Invest
            </Button>

            <br/> <br/>

            <ProgressBar
              animated
              now={percentage}
              variant="success"
              label={`${percentage}%`}
            />

            <div className="mt-2 text-center text-white">
              {company.investment_amount} raised out of {company.raising_goal}
            </div>

            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>{company.name} investment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to invest on this company. Please enter the amount
                you want to invest.
                <br />
                <br />
                <form onSubmit={handleOnSubmit}>
                  <div className="form-group mb-2">
                    <input
                      placeholder="Enter your Haba ID"
                      value={values.habaID}
                      onChange={handleIDChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      placeholder="Enter amount"
                      value={values.amount}
                      onChange={handleAmountChange}
                      type="number"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2 text-center">
                    <button type="submit" className="btn btn-block btn-success px-5">
                      Invest
                    </button>
                  </div>
                  <div className="mt-4 text-center">
                    If you dont have a Haba ID, <Link to="/members">sign up here</Link>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 mb-2">
          <div className="mt-2 text-white ml-3">
            <h3 style={{ color: "white" }}>
              <b>{company.name}</b>
            </h3>
            <p>
              {company.investors == null ? 0 : company.investors.length}{" "}
              investors
            </p>
            <p>Return percent: {company.return_percentage * 100}% per month</p>
            <p>
              <b>Raising goal:</b> {company.currency} {company.raising_goal}
            </p>
            <p style={{ textAlign: "justify" }}>
              <b>Description:</b>
              <br />
              {company.description !== null
                ? company.description
                : "No description"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
