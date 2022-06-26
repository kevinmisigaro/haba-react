import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhoneAlt,
  FaMailBulk,
  FaMapPin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="py-5"
      style={{ background: "#00a49f", color: "white", marginBottom: "0px" }}
    >
      <div className="container">

        <div className="row">
        <div
          className="col-md-6 col-xs-12 col-sm-12"
          style={{ textAlign: "left" }}
        >
          <div style={{ width: "80%" }}>
            <small><b>
            Haba is duly registered as Community Microfinance Group under Section 28 of the Tanzania Microfinance Act 2018
            </b></small>
            <br/><br/>
            <small>
              Get in touch with Haba on our social media to keep up to date with
              the most current information regarding what we do and our most
              recent activities.
            </small>

            {/* <div className="d-flex mt-5 flex-row justify-content-around">
              <FaFacebook />

              <FaTwitter />

              <FaLinkedin />

              <FaInstagram />
            </div> */}
          </div>
        </div>

        <div className="col-md-6 col-xs-12 col-sm-12">
          <ul style={{ textAlign: "left" }}>
            <li>
              <FaMapPin /> &nbsp;
              <span style={{ fontSize: "11pt" }}>
              No 74 Ally Sykes Road, Mbezi Beach, Dar Es Salaam
              </span>
            </li>
            <li>
              <FaPhoneAlt /> &nbsp;&nbsp;
              <span style={{ fontSize: "11pt" }}>+255 752 817 723</span>
            </li>
            <li>
              <FaMailBulk /> &nbsp;&nbsp;{" "}
              <span style={{ fontSize: "11pt" }}>info@gethaba.app</span>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </footer>
  );
}
