import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddMemberButton(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/group/user/invite`, {
        group: props.group.name,
        email: email,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <button className="btn btn-success btn-sm me-3" onClick={handleShow}>
        Invite member
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a member to {props.group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <p>Send an invite to someone via mail to join your HABA group</p>
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                className="form-control"
                onChange={handleEmailChange}
                name="email"
              />
            </div>
            <div className="form-group mb-3">
              <button className="btn btn-success">
                {loading ? "Sending invite..." : "Invite to group"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
