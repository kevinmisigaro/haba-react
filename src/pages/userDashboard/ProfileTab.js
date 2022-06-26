import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ProfileTab({ user }) {
  const [values, setValues] = useState({
    name: user.name,
    habaID: user.haba_id,
    email: user.email,
    username: user.username,
  });

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleUserNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      username: e.target.value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/updateUserDetails`, values)
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container p-3" style={{ textAlign: "left" }}>
      <div style={{ width: "50%" }}>
        <form onSubmit={handleSumbit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              className="form-control"
              onChange={handleNameChange}
              value={values.name}
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              className="form-control"
              onChange={handleEmailChange}
              value={values.email}
            />
          </div>
          <div className="form-group mb-3">
            <label>HABA ID</label>
            <input
              className="form-control"
              disabled
              readOnly
              value={values.habaID}
            />
          </div>
          <div className="form-group mb-4">
            <label>Username</label>
            <input
              className="form-control"
              onChange={handleUserNameChange}
              value={values.username}
            />
          </div>
          <div className="form-group mb-3">
            <Button variant="warning" type="submit" style={{ color: "white" }}>
              {loading ? "Updating details..." : "Edit profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
