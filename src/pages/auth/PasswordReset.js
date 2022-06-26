import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../../components/InnerNavBar";

export default function PasswordReset() {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  let { tokenId } = useParams();

  const handlePasswordChange = (e) => {
    e.persist();
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  const handlePasswordConfirmChange = (e) => {
    e.persist();
    setValues({
      ...values,
      confirmPassword: e.target.value,
    });
  };

  useEffect(() => {
    document.body.style.background = "#00a49f";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/password/reset`, {
        password: values.password,
        token: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Password has been reset");
      })
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
                  <h1 className="h4 text-gray-900 mb-4">Enter new password</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={values.password}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={values.confirmPassword}
                      onChange={handlePasswordConfirmChange}
                      placeholder="Confirm new password"
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
                    {loading ? "Resetting password..." : "Submit"}
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
