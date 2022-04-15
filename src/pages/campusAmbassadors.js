import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InnerNavBar from "../components/InnerNavBar";
import studentsImage from "../home-assets/images/students.jpg";

export default function CampusAmbassadors() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fff";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    gender: "",
    age: "",
    qn1: "",
    qn2: "",
    qn3: "",
    qn4: "",
    qn5: "",
    qn6: "",
    qn7: "",
    qn8: "",
  });

  const [isLoading, setLoading] = useState(false);
  const gender = ["male", "female"];

  const handleNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      email: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      phone: e.target.value,
    }));
  };

  const handleUniversityChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      university: e.target.value,
    }));
  };

  const handleGenderChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      gender: e.target.value,
    }));
  };

  const handleAgeChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      age: e.target.value,
    }));
  };

  const handleQn1Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn1: e.target.value,
    }));
  };

  const handleQn2Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn2: e.target.value,
    }));
  };

  const handleQn3Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn3: e.target.value,
    }));
  };

  const handleQn4Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn4: e.target.value,
    }));
  };

  const handleQn5Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn5: e.target.value,
    }));
  };

  const handleQn6Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn6: e.target.value,
    }));
  };

  const handleQn7Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn7: e.target.value,
    }));
  };

  const handleQn8Change = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      qn8: e.target.value,
    }));
  };

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    return toast.success('Campus submission is closed for now!')

    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("university", values.university);
    formData.append("gender", values.gender);
    formData.append("age", values.age);
    formData.append("qn1", values.qn1);
    formData.append("qn2", values.qn2);
    formData.append("qn3", values.qn3);
    formData.append("qn4", values.qn4);
    formData.append("qn5", values.qn5);
    formData.append("qn6", values.qn6);
    formData.append("qn7", values.qn7);
    formData.append("qn8", values.qn8);

    axios
      .post(`https://hababackend.herokuapp.com/api/campusApplication`, formData)
      .then((res) => {
        console.log(res);
        toast.success("Your application has successfully been sent.");
        setLoading(false);
        history("/campusConfirm");
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      <InnerNavBar />
      <div
        style={{
          height: "60vh",
          backgroundImage: `url(${studentsImage})`,
          backgroundSize: "cover",
          marginTop: "90px",
        }}
      ></div>
      <div className="container-fluid pt-5">
        <div className="container">
          <h5>We are looking for Campus Ambassadors</h5>
          <br />
          <p>
            If you are a finance fanatics and passionate about using technology
            to drive financial inclusion in young people, then here is your
            one-time opportunity Dar Es Salaam, Dodoma, Arusha
          </p>
          <br />
          <h5>Why Join us?</h5>
          <ul>
            <li>- Professional skills development</li>
            <li>- Work with the most dynamic and innovative team</li>
            <li>- Monetary incentives per deliverables</li>
            <li>- Career connection</li>
          </ul>
          <div className="text-center my-5">
            <h5>
              <b>Deadline: 15th March 2021</b>
            </h5>
          </div>

          <p>
            <u>What you will be doing as Haba Campus Ambassador</u>
          </p>
          <ol>
            <li>1. Promoting Haba savings and lending products to students</li>
            <li>
              2. Organizing monthly small group events to onboard students into
              Haba saving groups
            </li>
            <li>
              3. Set up at least 3 haba groups per month, comprising of at least
              5 students per group
            </li>
            <li>
              4. Attend campus ambassadorial trainings, mentorships and other
              relevant engagement
            </li>
            <li>
              5. Work with Haba team during strategic planning and share
              feedback regarding on-ground information
            </li>
            <li>
              6. Use your social media and other campus platforms to promote
              Haba
            </li>
          </ol>
          <br />
          <br />
        </div>
      </div>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#00a49f", color: "white" }}
      >
        <div className="container pt-5">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h4 style={{ color: "white" }}>Application Questionnaire</h4>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  onChange={handleNameChange}
                  value={values.name}
                />
              </div>
              <div className="col-md-6 mb-2">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  type="text"
                  value={values.phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="col-md-6 mb-2">
                <label>University Name</label>
                <input
                  className="form-control"
                  name="university"
                  type="text"
                  value={values.university}
                  onChange={handleUniversityChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Age</label>
                <input
                  className="form-control"
                  name="age"
                  type="number"
                  value={values.age}
                  onChange={handleAgeChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={handleGenderChange}
                >
                  <option value="" disabled selected>
                    Choose selected gender
                  </option>
                  {gender.map((m) => (
                    <option value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group mb-3">
              <label>What do you like about working with people?</label>
              <textarea
                className="form-control"
                name="qn1"
                cols="100%"
                rows="4"
                value={values.qn1}
                onChange={handleQn1Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>What do you hate about working with people?</label>
              <textarea
                className="form-control"
                name="qn2"
                cols="100%"
                rows="4"
                value={values.qn2}
                onChange={handleQn2Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>What do you care about as an individual?</label>
              <textarea
                className="form-control"
                name="qn3"
                cols="100%"
                rows="4"
                value={values.qn3}
                onChange={handleQn3Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>What inspires you everyday?</label>
              <textarea
                className="form-control"
                name="qn4"
                cols="100%"
                rows="4"
                value={values.qn4}
                onChange={handleQn4Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>Where would you like to be in the next 5 years?</label>
              <textarea
                className="form-control"
                name="qn5"
                cols="100%"
                rows="4"
                value={values.qn5}
                onChange={handleQn5Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>
                What skills do you posses to be considered for this campus
                ambassador program?
              </label>
              <textarea
                className="form-control"
                name="qn6"
                cols="100%"
                rows="4"
                value={values.qn6}
                onChange={handleQn6Change}
              />
            </div>

            <div className="form-group mb-3">
              <label>
                Any other thing you would like us to know about you?
              </label>
              <textarea
                className="form-control"
                name="qn7"
                cols="100%"
                rows="4"
                value={values.qn7}
                onChange={handleQn7Change}
              />
            </div>

            <div className="form-group mb-4">
              <label>
                Are you willing to dedicate at least 6 hours per week for this
                position?
              </label>
              <textarea
                className="form-control"
                name="qn8"
                cols="100%"
                rows="4"
                value={values.qn8}
                onChange={handleQn8Change}
              />
            </div>

            <div className="form-group pb-5">
              <button className="btn btn-success" type="submit">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
