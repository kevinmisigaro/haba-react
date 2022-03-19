import axios from "axios";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DepositLoan(props) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [values, setValues] = useState({
    amount: 0,
    phonenumber: "",
  });

  const handleAmountChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      amount: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      phonenumber: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseModal();
    console.log(values);

    if(_.isEmpty(props.loan)){
      return toast.error('You have no current ongoing loan');
    }

    const orderID = moment().unix().toString();

    const dataSet = {
      api: 170,
      code: 104,
      data: {
        api_key: "NDgxNjBkN2MwNDE2NDM3NGI0Y2MzMjNjNWEzMDFhNzM=",
        order_id: orderID.toString(),
        amount: values.amount.toString(),
        username: "Haba",
        phone_number: values.phonenumber.toString(),
        webhook_url:
          "https://hababackend.herokuapp.com/api/admin/depositLoanCallback",
      },
    };

    axios
      .post(`https://swahiliesapi.invict.site/Api`, dataSet)
      .then(() => {
        axios
          .post("https://hababackend.herokuapp.com/api/makePayment", {
            orderID: orderID,
            amount: values.amount,
            phone: values.phonenumber,
            userID: props.user.id,
          })
          .then(() => {
            setValues({
              amount: 0,
              phonenumber: "",
            });

            return toast.success(
              "Deposit request has been made. Await USSD popup."
            );
          });
      })
      .catch((err) => {
        console.log(err);
        setValues({
          amount: 0,
          phonenumber: "",
        });
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Repay loan
      </button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Deposit Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <p>
                  Reduce you loan amount based off the frequency you stated.
                </p>
              </div>

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
                  value={values.phonenumber}
                  onChange={handlePhoneChange}
                  type="text"
                />
              </div>

              <div className="form-group mb-4">
                <button className="btn btn-success" type="submit">
                  Pay loan
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
