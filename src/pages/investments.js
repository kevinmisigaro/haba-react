import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
