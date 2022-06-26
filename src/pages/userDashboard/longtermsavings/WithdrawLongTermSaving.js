import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function WithdrawLongTermSaving({ saving }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [withdrawalValues, setWithdrawalValues] = useState({
    amount: 0,
    phonenumber: "",
  });

  const handleWithdrawalAmountChange = (e) => {
    e.persist();
    setWithdrawalValues((withdrawalValues) => ({
      ...withdrawalValues,
      amount: e.target.value,
    }));
  };

  const handleWithdrawalPhoneChange = (e) => {
    e.persist();
    setWithdrawalValues((withdrawalValues) => ({
      ...withdrawalValues,
      phonenumber: e.target.value,
    }));
  };

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    console.log(withdrawalValues);
    setLoading(true);

    if (moment().isSameOrBefore(moment(saving.end_date))) {
      handleClose();
      setLoading(false);
      return toast.error("You cannot remove money before the final date");
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/savingWithdrawalRequest`, {
        amount: withdrawalValues.amount,
        saving_id: saving.id,
        phone: withdrawalValues.phonenumber,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        setLoading(false);
        return toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Withdrawal action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleWithdrawalSubmit}>
            <div className="form-group mb-3">
              <p>
                Enter your details below with the amount you need to withdraw
                and which phone number you need the amount to be sent.
              </p>
            </div>

            <div className="form-group mb-3">
              <label>Amount</label>
              <input
                className="form-control"
                value={withdrawalValues.amount}
                onChange={handleWithdrawalAmountChange}
                type="number"
              />
            </div>

            <div className="form-group mb-4">
              <label>Phone number</label>
              <input
                className="form-control"
                placeholder="Enter number as 07XXXXXXXX"
                value={withdrawalValues.phonenumber}
                onChange={handleWithdrawalPhoneChange}
                type="text"
              />
            </div>

            <div className="form-group mb-2">
              <button className="btn btn-success" type="submit">
                {loading ? "Withdrawing..." : "Withdraw"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
