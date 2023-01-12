import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../../components/InnerNavBar";

export default function PhoneLogin() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  const [values, setValues] = useState({
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const handlePhoneChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      phone: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/newPhoneLogin`, values)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        history("/dashboard/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data);
      });
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
                  <h1 className="h4 text-gray-900 mb-4">Phone Login</h1>
                </div>
                <form className="user" onSubmit={handleSumbit}>
                  <div className="form-group mb-5">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={values.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter your phone number starting with 067..."
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-user btn-block px-5"
                    style={{
                      background: "#00a49f",
                      border: "1px solid #00a49f",
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <hr />
                <div className="d-flex flex-column justify-content-between">
                  <Link className="small pb-3" to="/login">
                    Email Login
                  </Link>
                  <Link className="small pb-3" to="/members">
                    Create an Account!
                  </Link>{" "}
                  <Link className="small pb-3" to="/forgotpassword">
                    Forgot Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
