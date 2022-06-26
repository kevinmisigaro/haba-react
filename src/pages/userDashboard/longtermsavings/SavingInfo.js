import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function SavingInfo() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaInfoCircle size="30" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Haba is your money companion. You are limitless with Haba saving
            options, which gives your freedom to save any amount for all your
            important things. Here is Haba saving options{" "}
          </p>
          <br />
          <p>
            1.Regular Savings - you can withdraw anytime, and you don't earn any
            dividend on this saving option <br />
          </p>
          <br />
          <p>
            2. 3 months fixed term - You can withdraw from this account after 3
            months. You will earn 3.5% of your savings
            <br />
          </p>
          <br />
          <p>
            3. 6 months fixed term - You can withdraw from this account after 6
            months. You will earn 7% of your savings
            <br />
          </p>
          <br />
          <p>
            4. 12 months fixed term - You can withdraw from this account after
            12 months. You will earn 16% of your savings
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
