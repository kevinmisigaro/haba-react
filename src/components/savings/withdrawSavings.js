import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function WithdrawSavings(props) {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const handleCloseWithdrawalModal = () => setShowWithdrawalModal(false);
  const handleShowWithdrawalModal = () => setShowWithdrawalModal(true);

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
    handleCloseWithdrawalModal();

    axios
      .post(
        `https://hababackend.herokuapp.com/api/webapp/regularSavings/withdraw`,
        {
          amount: withdrawalValues.amount,
          userID: props.user.id,
          phone: withdrawalValues.phonenumber,
        }
      )
      .then((res) => {
        console.log(res.data);
        return toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShowWithdrawalModal}>
        Withdraw
      </button>

      <Modal
        show={showWithdrawalModal}
        onHide={handleCloseWithdrawalModal}
        centered
      >
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
                Withdraw
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
