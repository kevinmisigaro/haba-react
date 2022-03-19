import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";

export default function InvestmentCompanies(props) {
  const [company, setCompany] = useState({});
  const [investmentLoading, setInvestmentLoading] = useState(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    phone: "",
    amount: "",
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
      phone: e.target.value,
    }));
  };

  const displayModal = (i) => {
    console.log(i);
    handleShow();
    setCompany(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setInvestmentLoading(true)
    console.log(values);

    setInvestmentLoading(false)
  }

  return (
    <>
      <h4>Open investment opportunites</h4>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Raising goal</th>
            <th>Amount raised</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.companies.map((e, i) => (
            <tr id={i} key={e.id}>
              <td>{e.name}</td>
              <td>
                {e.currency} {e.raising_goal}
              </td>
              <td>
                {e.currency} {e.investment_amount}
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => displayModal(e)}
                >
                  Invest
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <b>{company.name}</b> details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
            
            <b>Raising goal:</b> {company.currency} {company.raising_goal } <br/>
            <b>Amount already invested:</b> {company.currency} {company.investment_amount} <br/>
            <b>Return percentage:</b> { company.return_percentage } <br/>
            <b>Description:</b> { company.description }
            
            <hr/>

            <h5>
              Company owner details
            </h5>

            <b>Name:</b> {company.owner?.name} <br/>
            <b>Haba ID:</b> {company.owner?.haba_id} <br/>
            <b>Email:</b> {company.owner?.email} <br/>

            </div>
            <div className="form-group mb-3 mt-4">
              <p>
                Please enter the amount you want to invest for{" "}
                <b>{company.name}</b>.
              </p>
              <p>
                A USSD push promt will be sent to ur phone to faciliate investment.
              </p>
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
            <div className="form-group mb-3">
              <input
                placeholder="Enter Phone number to pay"
                value={values.phone}
                onChange={handlePhoneChange}
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <button className="btn btn-success" type="submit">Invest</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
