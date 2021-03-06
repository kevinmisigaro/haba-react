import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";
import useState from "react-usestateref";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Requestloan() {
  const [guarantors, updateGuaratorsArray, guarantorsRef] = useState([]);

  const currencies = ["TZS", "KES", "UGX"];
  const frequencies = ["weekly", "monthly"];
  const duration = ["3 months", "6 months", "12 months"];

  const [values, setValues, valuesRef] = useState({
    memberID: "",
    currency: "",
    amount: "",
    frequency: "",
    duration: "",
  });

  const [habaIDresponse, updateResponse] = useState("");
  const [idsList, updateIdsList] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    const getListofIDs = async () => {
      axios
        .get(`https://hababackend.herokuapp.com/api/getListofIds`)
        .then((res) => {
          const data = res.data;
          updateIdsList(data);
        });
    };

    getListofIDs();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const history = useNavigate();

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

  //   const checkIDfromApi = (memberID) => {
  //       console.log(memberID)
  //     axios.post(`https://hababackend.herokuapp.com/api/checkID/`,{
  //         memberID: memberID
  //     })
  //     .then((res) => {
  //         updateResponse(res.data)
  //         console.log(`${res.data} response`)
  //     })
  // }

  const handleMemberIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      memberID: e.target.value,
    }));

    idsList.includes(valuesRef.current.memberID)
      ? updateResponse("")
      : updateResponse("This is not a valid Haba ID");
  };

  const handleCurrencyChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      currency: e.target.value,
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
      currency: values.currency,
      amount: values.amount,
      frequency: values.frequency,
      duration: values.duration,
      memberID: values.memberID,
      guarantors: guarantorsRef.current,
    });
    axios
      .post(`https://hababackend.herokuapp.com/api/grouprequestLoan`, {
        currency: values.currency,
        amount: values.amount,
        frequency: values.frequency,
        duration: values.duration,
        memberID: values.memberID,
        guarantors: guarantorsRef.current,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        toast.success(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    saveData();
  };

  return (
    <>
      <InnerNavBar />
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div className="card" style={{ width: "60rem" }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <h3>
                <b>Request Loan</b>
              </h3>
              <p>
                Once loan is requested, you will be contacted and <br /> be
                required to add your guarantors.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label>Member ID</label>
                <input
                  name="memberID"
                  value={values.memberID}
                  placeholder="Enter your group membership ID"
                  className="form-control"
                  type="text"
                  onChange={handleMemberIDChange}
                />
                <small style={{ color: "red" }}>{habaIDresponse}</small>
              </div>

              <div className="row mb-4">
                <div className="col-md-4 mb-2">
                  <label>Currency</label>
                  <select
                    value={values.currency}
                    className="form-control"
                    name="currency"
                    onChange={handleCurrencyChange}
                  >
                    <option value="" disabled>
                      Select currency
                    </option>
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8 mb-2">
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
                    placeholder="Guarantor member ID #1"
                    name="guarantor1"
                    value={guarantorIDs.guarantor1}
                    onChange={handleGuarantor1Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor member ID #2"
                    name="guarantor2"
                    value={guarantorIDs.guarantor2}
                    onChange={handleGuarantor2Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor member ID #3"
                    name="guarantor3"
                    value={guarantorIDs.guarantor3}
                    onChange={handleGuarantor3Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor member ID #4"
                    name="guarantor4"
                    value={guarantorIDs.guarantor4}
                    onChange={handleGuarantor4Change}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Guarantor member ID #5"
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
          </div>
        </div>
      </div>
    </>
  );
}
