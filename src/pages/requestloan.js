import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom' ;

export default function Requestloan() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const history = useNavigate()

  const currencies = ["TZS", "KES", "UGX"];
  const frequencies = ["weekly", "monthly"];
  const duration = ["3 months", "6 months", "12 months"];

  const [values, setValues] = useState({
    memberID: "",
    currency: "",
    amount: "",
    frequency: "",
    duration: "",
  });

  const handleMemberIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      memberID: e.target.value,
    }));
  };

  const handleCurrencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      currency: e.target.value,
    }));
  };

  const handleAmountChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      amount: e.target.value,
    }));
  };

  const handleFrequencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      frequency: e.target.value,
    }));
  };

  const handleDurationChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      duration: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post(`https://hababackend.herokuapp.com/api/grouprequestLoan`, values)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        toast.success(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.data);
        toast.error(err.data);
      });
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card" style={{ width: "60rem" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3>
              <b>Request Loan</b>
            </h3>
            <p>
              Once loan is requested, you will be contacted and <br /> be
              required to add your guarantors.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Member ID</label>
              <input
                name="memberID"
                value={values.memberID}
                placeholder="Enter your group membership ID"
                className="form-control"
                type="text"
                onChange={handleMemberIDChange}
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label>Currency</label>
                <select
                  value={values.currency}
                  className="form-control"
                  name="currency"
                  onChange={handleCurrencyChange}
                >
                  <option value="" disabled>
                    Select currency
                  </option>
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-8">
                <label>Amount</label>
                <input
                  className="form-control"
                  value={values.amount}
                  name="amount"
                  type="number"
                  onChange={handleAmountChange}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label>Deposit frequency</label>
                <select
                  value={values.frequency}
                  className="form-control"
                  name="frequency"
                  onChange={handleFrequencyChange}
                >
                  <option value="" disabled>
                    Select frequency
                  </option>
                  {frequencies.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label>Loan duration</label>
                <select
                  value={values.duration}
                  className="form-control"
                  name="duration"
                  onChange={handleDurationChange}
                >
                  <option value="" disabled>
                    Select weekly duration
                  </option>
                  {duration.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3 text-center">
              <button
                type="submit"
                style={{ padding: "6px 70px" }}
                className="btn btn-success"
              >
                Submit Loan Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
