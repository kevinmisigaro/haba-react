import "../dashboard-assets/vendor/fontawesome-free/css/all.min.css";
import "../dashboard-assets/css/sb-admin-2.min.css";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  return (
    <div className="container">
      <div className="d-flex row justify-content-center">
        <div
          className="card o-hidden border-0 shadow-lg my-5"
          style={{ 'width': "600px" }}
        >
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <form className="user">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-user"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Address..."
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                  />
                </div>
                <button className="btn btn-primary btn-user btn-block">
                  Login
                </button>
              </form>
              <hr />
              <div className="text-center">
                <a className="small" href="register.html">
                  Create an Account!
                </a>
              </div>
              <div className="text-center">
                <a className="small" href="/">
                  Go back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
