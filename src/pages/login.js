import "../dashboard-assets/vendor/fontawesome-free/css/all.min.css";
import "../dashboard-assets/css/sb-admin-2.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  return (
    <>
      <InnerNavBar/>
      <div className="container" style={{marginTop: '100px'}}>
      <div className="d-flex row justify-content-center">
        <div
          className="card o-hidden border-0 shadow-lg my-5"
          style={{ 'width': "600px" }}
        >
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome</h1>
              </div>
              <form className="user">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Enter your Haba ID..."
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
                
              </form>
              <Link to="/dashboard/home" className="btn btn-primary btn-user btn-block" style={{ background: '#00a49f' }}>
                  Login
                </Link>
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
