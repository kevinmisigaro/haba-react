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
                        Return home
                      </Link>
                    </li>

                    {/* <li className="nav-item">
                    <a
                      className="page-scroll"
                      href="/login"
                      aria-label="Toggle navigation"
                    >
                      Login
                    </a>
                  </li> */}
                  </ul>
                </div>
                <div className="button add-list-button">
                  <Link to="/members" className="btn page-scroll">
                    Sign up
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
