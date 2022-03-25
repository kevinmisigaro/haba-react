import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import DepositLoan from "./loans/depositLoan";
import RequestLoanComponent from "./loans/requestLoan";
import DepositSavings from "./savings/depositSavings";
import WithdrawSavings from "./savings/withdrawSavings";
import UserGroups from "./groups/UserGroups";
import InvestmentCompanies from "./investments/InvestmentCompanies";
import UserInvestedCompanies from "./investments/UserInvestedCompanies";

export default function Userdashboardhome() {
  const [user, setUser] = useState({});
  const [loggingOut, setLogout] = useState(false);
  const [regularSavings, setRegularSavings] = useState({});
  const [loan, setLoan] = useState({});
  const [companies, setCompanies] = useState([])
  const [groups, setGroups] = useState([])
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

    const fetchGroups = async () => {
      axios
      .get(
        `https://hababackend.herokuapp.com/api/userGroups/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      )
      .then((res) => {
        setGroups(res.data.groups);
        console.log(res.data.groups)
      });
    }


    const fetchCompanies = async () => {
      axios.get(`https://hababackend.herokuapp.com/api/company`).then((res) => {
        setCompanies(res.data);
      });
    };

    const fetchInProgressLoan = async () => {
      axios
        .get(
          `https://hababackend.herokuapp.com/api/admin/inprogressloan/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((res) => {
          console.log(res.data);
          setLoan(res.data);
        });
    };

    fetchRegularSavings()
    fetchInProgressLoan()
    fetchCompanies()
    fetchGroups()

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setLogout(true);
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
        setLogout(false);
        history("/");
      })
      .catch((err) => {
        setLogout(false);
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
            {loggingOut ? "Logging out" : "Logout"}
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

              <UserGroups groups={groups} />

            </TabPanel>
            <TabPanel>
              You have {user.companies?.length}{" "}
              {user.companies?.length == 1 ? "investment" : "investments"}
              <br />
              <UserInvestedCompanies companies={user.companies} />
              <br />
              <InvestmentCompanies companies={companies} />
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
              <div className="my-4 text-center">
                {_.isEmpty(loan)
                  ? "You have no loans"
                  : `Your current loan amount is TZS ${loan.loan_amount}`}
              </div>
              <div className="row">
                <div className="col-md-6 text-center mb-2">
                  <RequestLoanComponent user={user} />
                </div>
                <div className="col-md-6 text-center mb-2">
                  <DepositLoan user={user} loan={loan} />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
