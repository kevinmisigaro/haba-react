import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../components/InnerNavBar";

function Register() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });
  const [loading,  setLoading] = useState(false)
  const frequencies = ["weekly", "monthly"];
  const currencies = ["TZS", "USD"];
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const history = useNavigate();

  const [values, setValues] = useState({
    name: "",
    habaID: "",
    percentage: "",
    frequency: "",
    description: "",
    goal: "",
    currency: "",
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      name: e.target.value,
    }));
  };

  const handleGoalChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      goal: e.target.value,
    }));
  };

  const handlehabaIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      habaID: e.target.value,
    }));
  };

  const handleCurrencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      currency: e.target.value,
    }));
  };

  const handleFrequencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      frequency: e.target.value,
    }));
  };

  const handlePercentageChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      percentage: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      description: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setLoading(true)

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("habaID", values.habaID);
    formData.append("percentage", values.percentage);
    formData.append("description", values.description);
    formData.append("license", selectedLicense, selectedLicense.name);
    formData.append("logo", selectedLogo, selectedLogo.name);
    formData.append("frequency", values.frequency);
    formData.append("goal", values.goal);
    formData.append("currency", values.currency);

    axios
      .post(`https://hababackend.herokuapp.com/api/company/register`, formData)
      .then((res) => {
        setLoading(false)
        toast.success(
          "You have uploaded your credentials successfully. Please await feedback"
        );
        history("/");
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <InnerNavBar />
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          className="card o-hidden border-0 shadow-lg my-5"
          style={{ width: "600px" }}
        >
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">
                  <b>Register your business</b>
                </h1>
              </div>

              <form onSubmit={handleOnSubmit}>
                <div className="form-group row">
                  <div className="col-md-6 mb-1">
                    <label>Company name</label>
                    <input
                      className="form-control"
                      name="name"
                      onChange={handleNameChange}
                      type="text"
                      value={values.name}
                    />
                  </div>
                  <div className="col-md-6 mb-1">
                    <label>Haba ID</label>
                    <input
                      className="form-control"
                      name="habaID"
                      onChange={handlehabaIDChange}
                      type="text"
                      value={values.habaID}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6 mb-1">
                    <label>Business license</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setSelectedLicense(e.target.files[0])}
                    />
                  </div>
                  <div className="col-md-6 mb-1">
                    <label>Return percentage</label>
                    <div className="input-group">
                      <input
                        type="number"
                        name="percentage"
                        onChange={handlePercentageChange}
                        className="form-control"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6 mb-1">
                    <label>Return frequency</label>
                    <select
                      className="form-control"
                      name="frequency"
                      onChange={handleFrequencyChange}
                    >
                      <option value="" disabled selected>
                        Choose your selected frequency
                      </option>
                      {frequencies.map((f) => (
                        <option value={f} key={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-1">
                    <label>Company logo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setSelectedLogo(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-2 col-sm-12">
                    <label>Currency</label>
                    <select
                      value={values.currency}
                      onChange={handleCurrencyChange}
                      className="form-control"
                      name="currency"
                    >
                      {currencies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-8 mb-2 col-sm-12">
                    <label>Raising goal (Amount)</label>
                    <input
                      type="number"
                      value={values.goal}
                      onChange={handleGoalChange}
                      name="goal"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Company description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    onChange={handleDescriptionChange}
                    type="text"
                    cols="100%"
                    rows="4"
                    placeholder="This is optional; but it helps investors know more about your company and why they should invest"
                  ></textarea>
                </div>

                <div className="form-group mb-0">
                  <button className="btn btn-success btn-block">
                    <b>
                      {loading ? 'Creating...': 'Create company' }
                    </b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
