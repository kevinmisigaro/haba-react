import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DepositLongTermSaving({ savingID }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    amount: 0,
    phonenumber: "",
  });

  const handleAmountChange = (e) => {
    e.persist();
    setValues({
      ...values,
      amount: e.target.value,
    });
  };

  const handleNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phonenumber: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const orderID = moment().unix().toString();

    console.log(orderID);

    const dataSet = {
      api: 170,
      code: 104,
      data: {
        api_key: process.env.REACT_APP_SWAHILIES_API_KEY,
        order_id: orderID.toString(),
        amount: values.amount.toString(),
        username: "Haba",
        phone_number: values.phonenumber.toString(),
        webhook_url: `${process.env.REACT_APP_API_URL}/newSavingsCallback`,
      },
    };

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.post(`${process.env.REACT_APP_SWAHILIES_URL}`, dataSet).then(() => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/makeSavingsPayment`, {
          orderID: orderID,
          amount: values.amount,
          phone: values.phonenumber,
          saving_id: savingID,
        })
        .then(() => {
          setValues({
            amount: 0,
            phonenumber: "",
          });

          setLoading(false);
          handleClose();

          return toast.success(
            "Deposit request has been made. Await USSD popup."
          );
        });
    });
  };

  return (
    <>
      <Button variant="success" size="sm" onClick={handleShow}>
        Deposit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Make a deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label>Amount</label>
              <input
                className="form-control"
                value={values.amount}
                onChange={handleAmountChange}
                type="number"
              />
            </div>
            <div className="form-group mb-4">
              <label>Phone number</label>
              <input
                className="form-control"
                placeholder="Enter number as 07XXXXXXXX"
                value={values.phonenumber}
                onChange={handleNumberChange}
                type="text"
              />
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-success" type="submit">
                {loading ? "Depositing..." : "Deposit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
