import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import RequestLoanComponent from "../../components/loans/requestLoan";
import DepositSavings from "../../components/savings/depositSavings";
import WithdrawSavings from "../../components/savings/withdrawSavings";

export default function Userdashboardhome() {
  const [user, setUser] = useState({});
  const [regularSavings, setRegularSavings] = useState({});
  const history = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    setUser(JSON.parse(localStorage.getItem("user")));

    const fetchRegularSavings = async () => {
      axios
        .get(
          `https://hababackend.herokuapp.com/api/webapp/regularSavings/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((data) => {
          setRegularSavings(data.data);
        });
    };

    fetchRegularSavings();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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
                {/* <Button variant="warning" size="sm" style={{ color: "white" }}>
                  Edit profile
                </Button> */}
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
                <h4>Amount saved: TZS {regularSavings.amount ?? "0"}</h4>
              </div>

              <br />

              <div className="row mb-3">
                <div className="col-md-6 text-center mb-3">
                  <DepositSavings user={user} />
                </div>
                <div className="col-md-6 text-center mb-3">
                  <WithdrawSavings user={user} />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              These are your current loans.
              <br/><br/>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <RequestLoanComponent user={user} />
                  </div>
                </div>
              </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
