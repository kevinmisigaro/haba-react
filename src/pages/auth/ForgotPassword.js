import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InnerNavBar from "../../components/InnerNavBar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  useEffect(() => {
    document.body.style.background = "#00a49f";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/password/forgot`, {
        email: email,
      })
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <InnerNavBar />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="d-flex row justify-content-center">
          <div
            className="card o-hidden border-0 shadow-lg my-5"
            style={{ width: "600px" }}
          >
            <div className="card-body p-0">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">
                    Enter email to send reset password link for your account
                  </h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email..."
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-user btn-block"
                    style={{
                      background: "#00a49f",
                      border: "1px solid #00a49f",
                    }}
                  >
                    {loading ? "Requesting password reset..." : "Submit"}
                  </button>
                </form>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
