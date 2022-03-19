import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";

export default function UserGroups(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [members, setMembers] = useState([]);

  const viewMembers = (i) => {
    console.log(i);
    setMembers(i);
    handleShow();
  };

  return (
    <>
      {props.groups.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Group name</th>
              <th>Region</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.groups.map((g, i) => (
              <tr id={i} key={g.id}>
                <td>{g.name}</td>
                <td>{g.region}</td>
                <td>{g.country}</td>
                <td>
                  <button
                    onClick={() => viewMembers(g.members)}
                    className="btn btn-success btn-sm"
                  >
                    View members
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Group members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {members.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Member name</th>
                  <th>Email</th>
                  <th>Haba ID</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.haba_id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
