import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DepositSavings(props) {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const handleCloseDepositModal = () => setShowDepositModal(false);
  const handleShowDepositModal = () => setShowDepositModal(true);

  const [depositValues, setDepositValues] = useState({
    amount: 0,
    phonenumber: "",
  });

  const handleDepositChange = (e) => {
    e.persist();
    setDepositValues((depositValues) => ({
      ...depositValues,
      amount: e.target.value,
    }));
  };

  const handleNumberChange = (e) => {
    e.persist();
    setDepositValues((depositValues) => ({
      ...depositValues,
      phonenumber: e.target.value,
    }));
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    console.log(depositValues);
    handleCloseDepositModal();

    const orderID = moment().unix().toString();

    console.log(orderID);

    const dataSet = {
      api: 170,
      code: 104,
      data: {
        api_key: "NDgxNjBkN2MwNDE2NDM3NGI0Y2MzMjNjNWEzMDFhNzM=",
        order_id: orderID.toString(),
        amount: depositValues.amount.toString(),
        username: "Haba",
        phone_number: depositValues.phonenumber.toString(),
        webhook_url: "https://hababackend.herokuapp.com/api/paymentCallback",
      },
    };

    axios.post(`https://swahiliesapi.invict.site/Api`, dataSet).then(() => {
      axios
        .post(`https://hababackend.herokuapp.com/api/makePayment`, {
          orderID: orderID,
          amount: depositValues.amount,
          phone: depositValues.phonenumber,
          userID: props.user.id,
        })
        .then(() => {
          setDepositValues({
            amount: 0,
            phonenumber: "",
          });

          return toast.success(
            "Deposit request has been made. Await USSD popup."
          );
        });
    });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShowDepositModal}>
        Deposit
      </button>

      <Modal show={showDepositModal} onHide={handleCloseDepositModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deposit amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleDepositSubmit}>
            <div className="form-group mb-3">
              <p>Make sure your deposit is greater or equal to 5000 TZS</p>
            </div>
            <div className="form-group mb-2">
              <label>Amount</label>
              <input
                className="form-control"
                value={depositValues.amount}
                onChange={handleDepositChange}
                type="number"
              />
            </div>
            <div className="form-group mb-4">
              <label>Phone number</label>
              <input
                className="form-control"
                placeholder="Enter number as 07XXXXXXXX"
                value={depositValues.phonenumber}
                onChange={handleNumberChange}
                type="text"
              />
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-success" type="submit">
                Deposit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
