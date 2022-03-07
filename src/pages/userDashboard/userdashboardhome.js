import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import moment from 'moment';

export default function Userdashboardhome() {
  const [user, setUser] = useState({});
  const history = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    setUser(JSON.parse(localStorage.getItem("user")));

    console.log(user);

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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

    const orderID = moment().unix().toString()

    console.log(orderID)

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
          userID: user.id 
        })
        .then(() => {
          setTimeout(function () {
            axios
              .get(
                `https://hababackend.herokuapp.com/api/checkPaymentStatus/${orderID}`
              )
              .then((res) => {
                if (res.data == "200") {
                  return toast.success(
                    `${depositValues.amount} has been added to your account.`
                  );
                } else if (res.data == "300") {
                  return toast.warning(
                    "The transaction has failed/was cancelled"
                  );
                } else {
                  return toast.error("An error has occured");
                }
              });
          }, 4000);
        });
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`https://hababackend.herokuapp.com/api/logout`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("You have successfully logged out");
        localStorage.clear();
        history("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container pt-5">
      <div className="text-center">
        <h4 style={{ color: "white" }}>
          <b>Your Recent Haba Activities</b>
        </h4>
      </div>

      <div className="card mt-4" style={{ width: "100%" }}>
        <div className="card-header d-flex row justify-content-end">
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-primary btn-sm py-1 my-2"
            style={{ width: "15%" }}
          >
            Logout
          </button>
        </div>
        <div className="card-body">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Profile</Tab>
              <Tab>Group</Tab>
              <Tab>Investments</Tab>
              <Tab>Savings</Tab>
              <Tab>Loans</Tab>
            </TabList>

            <TabPanel>
              <div className="container p-3">
                <Link to="/">Return home</Link>
                <br />
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <Card bg="success" className="shadow mb-2" text="white">
                      <Card.Body>
                        {user.groups?.length > 0
                          ? `${user.groups?.length} groups`
                          : "0 groups"}
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card bg="success" className="shadow mb-2" text="white">
                      <Card.Body>
                        {user.companies?.length > 0
                          ? `${user.companies?.length} investments`
                          : "0 investments"}
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card bg="success" className="shadow" text="white">
                      <Card.Body>
                        {user.group_loans?.length > 0
                          ? `${user.group_loans?.length} loans`
                          : "0 loans"}
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="container p-3">
                <b>Name: </b>
                {user.name}
                <br />
                <b>Haba ID:</b> {user.haba_id}
                <br />
                <b>Email: </b> {user.email}
                <br />
                <br />
                <Button variant="warning" size="sm" style={{ color: "white" }}>
                  Edit profile
                </Button>
              </div>
            </TabPanel>

            <TabPanel>
              You are a member of {user.groups?.length}{" "}
              {user.groups?.length == 1 ? "group" : "groups"}
            </TabPanel>
            <TabPanel>
              You have {user.companies?.length}{" "}
              {user.companies?.length == 1 ? "investment" : "investments"}
              <br />
              <br />
              {user.companies?.length > 0 ? (
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Company</th>
                      <th scope="col">Amount investment</th>
                      <th scope="col">Approval status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.companies?.map((element) => {
                      <tr key={element.id}>
                        <td>{element.name}</td>
                        <td>{element.pivot.amount}</td>
                        <td>{element.pivot.active}</td>
                      </tr>;
                    })}
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel>
              <div className="text-center my-4">
                <p>Amount saved: TZS 0.00</p>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 text-center mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleShowDepositModal}
                  >
                    Deposit
                  </button>
                </div>
                <div className="col-md-6 text-center mb-3">
                  <button className="btn btn-primary">Withdraw</button>
                </div>
              </div>

              <Modal
                show={showDepositModal}
                onHide={handleCloseDepositModal}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Deposit amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleDepositSubmit}>
                    <div className="form-group mb-3">
                      <p>
                        Make sure your deposit is greater or equal to 1000 TZS
                      </p>
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
                        placeholder="Enter number as 0782835136"
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
            </TabPanel>
            <TabPanel>These are your current loans.</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
