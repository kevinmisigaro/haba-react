import axios from "axios";
import React, { useEffect, useState } from "react";
import InnerNavBar from "../components/InnerNavBar";
import InvestmentCard from "../components/InvestmentCard";

export default function Investments() {

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    const fetchCompanies = async() => {
      axios.get(`https://hababackend.herokuapp.com/api/company`).then(res => {
        setCompanies(res.data)
      })
    }

    fetchCompanies()

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <InnerNavBar />
      <div style={{ marginTop: "100px" }} className="container">
        <div className="text-center">
          <h3 style={{ color: "white" }}>
            <b>
            Start your Investment Journey
            </b>
          </h3>
          <br/>
          <p style={{color: 'white'}}>
          Haba Invest enables you to securely grow your money by investing in verified and secured projects for short term returns. Browse through available investable businesses on Haba and invest as little as TZS 23,000 and above to earn extra income from your capital. Why store money without making it work for you? Haba Invest now offers you a lifetime opportunity to earn dividends on your investment.
          </p>
        </div>

        <div className="row mt-5">
          {
            companies.map(c => (
              <InvestmentCard key={c.id} company={c} />
            ))
          }
        </div>
      </div>
    </>
  );
}
