import React from "react";
import { Form, Input, Select } from "usetheform";

function MemberWizardOne(props) {
  const genders = ["Male", "Female"];
  const occupations = ["Employed", "Self-employed", "Student"];
  const countries = [
    "Tanzania",
    "Kenya",
    "Uganda",
    "South Africa",
    "Nigeria",
    "Rwanda",
  ];
  const cards = [
    "NIDA", "International Passport", "Driver's license", "Voters Registration Card"
  ];

  return (
    <>
      <div className="text-center">
        <h4>
          <b>Register user</b>
        </h4>
        <br />
      </div>
      <Form name="page1" {...props}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Full Name</label>
            <Input name="name" className="form-control" type="text" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Username</label>
            <Input name="username" className="form-control" type="text" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Email Address</label>
            <Input name="email" className="form-control" type="email" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Phone number</label>
            <Input
              name="phone"
              className="form-control"
              placeholder="+255xxxxx"
              type="text"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Gender</label>
            <Select name="gender" className="form-control">
              <option value="">Select your gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Date of Birth</label>
            <Input name="dob" type="date" value="2002-01-01" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Occupation</label>
            <Select name="occupation" className="form-control">
              <option value="">Choose our occupation</option>
              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </Select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Physical Address</label>
            <Input name="address" type="text" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Region</label>
            <Input name="region" type="text" className="form-control" />
          </div>
          
          <div className="col-md-4 mb-3">
            <label>Country</label>
            <Select name="country" className="form-control">
              <option value="">Choose your country</option>
              {countries.map((country) => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </Select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Identification type</label>
            <Select name="idtype" className="form-control">
              <option value="">Choose your identification card</option>
              {cards.map((card) => (
                <option value={card} key={card}>
                  {card}
                </option>
              ))}
            </Select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Identification Card Number</label>
            <Input name="idnumber" className="form-control" type="text" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Password</label>
            <Input type="password" name="password" className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
            />
          </div>
        </div>

        <div className="text-center">
       {
        props.loading ? <div className="btn btn-success btn-user">Creating...</div> :  <button
        type="submit"
        className="btn btn-success btn-user"
        style={{ background: "#00a49f" }}
      >
        Create Account
      </button>
       }
        </div>
      </Form>
    </>
  );
}

export default MemberWizardOne;
