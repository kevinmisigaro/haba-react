import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../home-assets/images/Haba-Logo-White.png";

export default function InnerNavBar() {
  return (
    <header className="header navbar-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="nav-inner">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                  <img
                    src={logoWhite}
                    alt="Logo"
                    style={{ maxWidth: "120px" }}
                  />
                </Link>
                <button
                  className="navbar-toggler mobile-menu-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link to="/" className="page-scroll active">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                          className="page-scroll"
                          to="/login"
                        >
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="page-scroll"
                          to="/members"
                        >
                          Sign up
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="page-scroll"
                          to="/register"
                        >
                          Start your Fundraiser
                        </Link>
                      </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
