import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateLongTermSavings() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const frequencies = [
    {
      id: 0,
      value: "Select a deposit frequency",
    },
    {
      id: 1,
      value: "3 months for 3.5% interest",
    },
    {
      id: 2,
      value: "6 months for 7% interest",
    },
    {
      id: 3,
      value: "12 months for 15% interest",
    },
  ];

  const [values, setValues] = useState({
    goal: "",
    amount: 0,
    frequency: "",
  });

  const handleGoalChange = (e) => {
    e.persist();
    setValues({
      ...values,
      goal: e.target.value,
    });
  };

  const handleAmountChange = (e) => {
    e.persist();
    setValues({
      ...values,
      amount: e.target.value,
    });
  };

  const handleFrequencyChange = (e) => {
    e.persist();
    setValues({
      ...values,
      frequency: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.frequency == "") {
      setLoading(false);
      return toast.error("Please select a deposit frequency");
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/newSaving`, values)
      .then(() => {
        setLoading(false);
        handleClose();
        toast.success("New saving created");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleClose();
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New long term savings
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New long term savings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Goal</label>
              <input
                className="form-control"
                onChange={handleGoalChange}
                type="text"
              />
            </div>
            <div className="form-group mb-3">
              <label>Goal amount</label>
              <input
                className="form-control"
                onChange={handleAmountChange}
                type="number"
              />
            </div>
            <div className="form-group mb-4">
              <label>Deposit frequency</label>
              <select className="form-control" onChange={handleFrequencyChange}>
                {frequencies.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <Button variant="primary" type="submit">
                {loading ? "Creating..." : "Create new saving"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
