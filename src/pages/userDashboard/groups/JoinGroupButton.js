import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function JoinGroupButton({ allGroups }) {
  const [show, setShow] = useState(false);
  const [group, setGroup] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGroupChange = (e) => {
    e.persist();
    setGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/group/user/join`, {
        group: group,
      })
      .then((res) => {
        toast.success(res.data);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        Join a group
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Existing Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Group</label>
              <select className="form-control" onChange={handleGroupChange}>
                <option value="">Choose a group</option>
                {allGroups?.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2 d-grid">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
