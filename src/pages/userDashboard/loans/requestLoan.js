import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useState from "react-usestateref";

export default function RequestLoanComponent(props) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [guarantors, updateGuaratorsArray, guarantorsRef] = useState([]);
  const frequencies = ['weekly', 'monthly']
  const duration = ["3 months", "6 months", "12 months"];

  const [values, setValues] = useState({
    amount: 0,
    phonenumber: "",
    frequency: "",
    duration: ""
  });

  const [guarantorIDs, setGuarantors] = useState({
    guarantor1: "",
    guarantor2: "",
    guarantor3: "",
    guarantor4: "",
    guarantor5: "",
  });

  const handleGuarantor1Change = (e) => {
    e.persist();
    setGuarantors((guarantorIDs) => ({
      ...guarantorIDs,
      guarantor1: e.target.value,
    }));
  };

  const handleGuarantor2Change = (e) => {
    e.persist();
    setGuarantors((guarantorIDs) => ({
      ...guarantorIDs,
      guarantor2: e.target.value,
    }));
  };

  const handleGuarantor3Change = (e) => {
    e.persist();
    setGuarantors((guarantorIDs) => ({
      ...guarantorIDs,
      guarantor3: e.target.value,
    }));
  };

  const handleGuarantor4Change = (e) => {
    e.persist();
    setGuarantors((guarantorIDs) => ({
      ...guarantorIDs,
      guarantor4: e.target.value,
    }));
  };

  const handleGuarantor5Change = (e) => {
    e.persist();
    setGuarantors((guarantorIDs) => ({
      ...guarantorIDs,
      guarantor5: e.target.value,
    }));
  };

  const handleAmountChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      amount: e.target.value,
    }));
  };

  const handleFrequencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      frequency: e.target.value,
    }));
  };

  const handleDurationChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      duration: e.target.value,
    }));
  };

  const saveData = () => {
    
    console.log({
      amount: values.amount,
      frequency: values.frequency,
      duration: values.duration,
      memberID: props.user.haba_id,
      guarantors: guarantorsRef.current,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/grouprequestLoan`, {
        currency: "TZS",
        amount: values.amount,
        frequency: values.frequency,
        duration: values.duration,
        memberID: props.user.haba_id,
        guarantors: guarantorsRef.current,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        updateGuaratorsArray([])
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        updateGuaratorsArray([])
        toast.error(err.response.data);
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(values)
      handleCloseModal()

      if (guarantorIDs.guarantor1 !== "") {
        updateGuaratorsArray((guarantors) => [
          ...guarantors,
          guarantorIDs.guarantor1,
        ]);
      }
  
      if (guarantorIDs.guarantor2 !== "") {
        updateGuaratorsArray((guarantors) => [
          ...guarantors,
          guarantorIDs.guarantor2,
        ]);
      }
  
      if (guarantorIDs.guarantor3 !== "") {
        updateGuaratorsArray((guarantors) => [
          ...guarantors,
          guarantorIDs.guarantor3,
        ]);
      }
  
      if (guarantorIDs.guarantor4 !== "") {
        updateGuaratorsArray((guarantors) => [
          ...guarantors,
          guarantorIDs.guarantor4,
        ]);
      }
  
      if (guarantorIDs.guarantor5 !== "") {
        updateGuaratorsArray((guarantors) => [
          ...guarantors,
          guarantorIDs.guarantor5,
        ]);
      }

      saveData()
  }

  return (
    <>
      <button 
        className="btn btn-primary"
        onClick={handleShowModal}
        >Request loan</button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
          <Modal.Header>
              <Modal.Title>
                  Request loan
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="text-center mb-4">
              <p>
                Once loan is requested, you will be contacted and <br /> be
                required to add your guarantors.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
              <div className="row mb-4">
                <div className="col-md-12 mb-2">
                  <label>Amount</label>
                  <input
                    className="form-control"
                    value={values.amount}
                    name="amount"
                    type="number"
                    onChange={handleAmountChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <label>Deposit frequency</label>
                  <select
                    value={values.frequency}
                    className="form-control"
                    name="frequency"
                    onChange={handleFrequencyChange}
                  >
                    <option value="" disabled>
                      Select frequency
                    </option>
                    {frequencies.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-2">
                  <label>Loan duration</label>
                  <select
                    value={values.duration}
                    className="form-control"
                    name="duration"
                    onChange={handleDurationChange}
                  >
                    <option value="" disabled>
                      Select weekly duration
                    </option>
                    {duration.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mb-3">
                <h5>
                  <u>
                    <b>Guarantors</b>
                  </u>
                </h5>
                <p>
                  Please add a minimum of 2 guarantor member IDs for those who
                  you will be the guarantors for your loan
                </p>
                <div className="mb-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor username"
                    name="guarantor1"
                    value={guarantorIDs.guarantor1}
                    onChange={handleGuarantor1Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor username"
                    name="guarantor2"
                    value={guarantorIDs.guarantor2}
                    onChange={handleGuarantor2Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor username"
                    name="guarantor3"
                    value={guarantorIDs.guarantor3}
                    onChange={handleGuarantor3Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor username"
                    name="guarantor4"
                    value={guarantorIDs.guarantor4}
                    onChange={handleGuarantor4Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor username"
                    name="guarantor5"
                    value={guarantorIDs.guarantor5}
                    onChange={handleGuarantor5Change}
                  />
                </div>
              </div>

              <div className="mb-3 text-center">
                <button
                  type="submit"
                  style={{ padding: "6px 70px" }}
                  className="btn btn-success"
                >
                  Submit Loan Request
                </button>
              </div>
            </form>
          </Modal.Body>
      </Modal>
    </>
  );
}
