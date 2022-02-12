import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";

export default function AccountComplete() {
  const [message, setMessage] = useState();

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    setMessage(localStorage.getItem("confirm"));

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <InnerNavBar />
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div className="card" style={{ width: "60rem" }}>
          <div className="card-body text-center pt-2">
            <p>{message}</p>

            <div className="mt-2">
              <Link
                className="btn btn-success btn-user"
                style={{ background: "#00a49f" }}
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
