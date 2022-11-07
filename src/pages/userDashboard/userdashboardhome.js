import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DepositLoan from "./loans/depositLoan";
import RequestLoanComponent from "./loans/requestLoan";
import UserGroups from "./groups/UserGroups";
import InvestmentCompanies from "./investments/InvestmentCompanies";
import UserInvestedCompanies from "./investments/UserInvestedCompanies";
import LogoutButton from "./LogoutButton";
import ProfileTab from "./ProfileTab";
import SavingsTab from "./savings/SavingsTab";
import LongTermSavings from "./longtermsavings/LongTermSavings";
import CreateNewGroup from "./groups/CreateNewGroup";
import JoinGroupButton from "./groups/JoinGroupButton";
import Requestphone from "./ynine/requestphone";
import Repayphone from "./ynine/repayphone";

export default function Userdashboardhome() {
  const [user, setUser] = useState({});

  const [regularSavings, setRegularSavings] = useState({});
  const [loan, setLoan] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [groups, setGroups] = useState([]);
  const [savings, setSavings] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    setLoading(true);
    document.body.style.backgroundColor = "#00a49f";

    setUser(JSON.parse(localStorage.getItem("user")));

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const fetchRegularSavings = async () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/webapp/regularSavings/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((data) => {
          setRegularSavings(data.data);
        });
    };

    const fetchAllGroups = async () => {
      axios.get(`${process.env.REACT_APP_API_URL}/groups`).then((res) => {
        setAllGroups(res.data);
        console.log(res.data);
      });
    };

    const fetchGroups = async () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/userGroups/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((res) => {
          setGroups(res.data.groups);
          console.log(res.data.groups);
        });
    };

    const fetchCompanies = async () => {
      axios.get(`${process.env.REACT_APP_API_URL}/company`).then((res) => {
        setCompanies(res.data);
      });
    };

    const fetchInProgressLoan = async () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/admin/inprogressloan/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then((res) => {
          console.log(res.data);
          setLoan(res.data);
        });
    };

    const fetchUserSavings = async () => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/userSavings`)
        .then((res) => setSavings(res.data));
    };

    fetchRegularSavings().then(() =>
      fetchInProgressLoan().then(() =>
        fetchCompanies().then(() =>
          fetchGroups().then(() =>
            fetchUserSavings().then(() => {
              fetchAllGroups();
              setLoading(false);
            })
          )
        )
      )
    );

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="container pt-5">
      <div className="text-center">
        <h4 style={{ color: "white" }}>
          <b>Your Haba Activities</b>
        </h4>
      </div>

      <div className="card mt-4" style={{ width: "100%" }}>
        <div className="card-header">
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className="card-body">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Profile</Tab>
              <Tab>Group</Tab>
              <Tab>Investments</Tab>
              <Tab>Regular Savings</Tab>
              <Tab>Long Term Savings</Tab>
              <Tab>Loans</Tab>
              <Tab>Y9</Tab>
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
              <ProfileTab user={user} />
            </TabPanel>

            <TabPanel>
              <div className="d-flex flex-row justify-content-start mb-3">
                <CreateNewGroup />
                <JoinGroupButton allGroups={allGroups} />
              </div>
              You are a member of {user.groups?.length}{" "}
              {user.groups?.length == 1 ? "group" : "groups"}
              {loading ? "Loading..." : <UserGroups groups={groups} />}
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
              <SavingsTab regularSavings={regularSavings} user={user} />
            </TabPanel>

            <TabPanel>
              <LongTermSavings savings={savings} />
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

            <TabPanel>
              <div className="mb-5 text-center"></div>
              <div className="row">
                <div className="col-md-6 text-center mb-2">
                  <Requestphone user={user} />
                </div>
                <div className="col-md-6 text-center mb-2">
                  <Repayphone user={user} loan={loan} />
                </div>
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
