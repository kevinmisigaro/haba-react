import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../components/InnerNavBar";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  const [values, setValues] = useState({
    habaID: "",
    password: "",
  });

  const history = useNavigate();

  const handleIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      habaID: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      password: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    axios
      .get(`https://hababackend.herokuapp.com/sanctum/csrf-cookie`)
      .then((response) => {
        console.log("Sanctum", response.status);

        axios
          .post(`https://hababackend.herokuapp.com/api/login`, values)
          .then((res) => {
            console.log(res)
            localStorage.setItem("user", JSON.stringify(res.data))
            history("/dashboard/home");
          })
          .catch((err) => {
            console.log(err);
            toast.error('An error has occured');
          });
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
                  <h1 className="h4 text-gray-900 mb-4">Welcome</h1>
                </div>
                <form className="user" onSubmit={handleSumbit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      value={values.habaID}
                      onChange={handleIDChange}
                      placeholder="Enter your Haba ID..."
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      onChange={handlePasswordChange}
                      value={values.password}
                      className="form-control form-control-user"
                      placeholder="Password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-user btn-block"
                    style={{ background: "#00a49f" }}
                  >
                    Login
                  </button>
                </form>

                <hr />
                <div className="text-center">
                  <Link className="small" to="/members">
                    Create an Account!
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

export default Login;
