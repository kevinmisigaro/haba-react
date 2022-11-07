import React, { useState } from "react";
import { useEffect } from "react";
import { useMultipleForm } from "usetheform";
import MemberWizardOne from "../../components/MemberWizardOne";
import MemberWizardTwo from "../../components/MemberWizardTwo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InnerNavBar from "../../components/InnerNavBar";

function Members() {
  const history = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const saveData = () => {
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/memberStore`, {
        name: getWizardState().name,
        email: getWizardState().email,
        phone: getWizardState().phone,
        gender: getWizardState().gender,
        dob: getWizardState().dob,
        occupation: getWizardState().occupation,
        address: getWizardState().address,
        region: getWizardState().region,
        country: getWizardState().country,
        idtype: getWizardState().idtype,
        idnumber: getWizardState().idnumber,
        username: getWizardState().username,
        kinname: getWizardState().kinname,
        kinphone: getWizardState().kinphone,
        kinaddress: getWizardState().kinaddress,
        password: getWizardState().password,
      })
      .then((res) => {
        toast.success(res.data);
        console.log(res.data);
        setLoading(false);
        localStorage.setItem("confirm", res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);
  const [loading, setLoading] = useState(false);

  const [getWizardState, wizard] = useMultipleForm();

  const onSubmitWizard = () => {
    console.log(getWizardState());
    saveData();
  };

  return (
    <>
      <InnerNavBar />
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div
          className="card"
          style={{
            width: "60rem",
            border: "1px solid white",
            borderRadius: "1rem",
          }}
        >
          <div className="card-body">
            {currentPage === 1 && (
              <MemberWizardOne
                {...wizard}
                onSubmit={onSubmitWizard}
                loading={loading}
              />
            )}
            {currentPage === 2 && (
              <MemberWizardTwo
                {...wizard}
                prevPage={prevPage}
                onSubmit={onSubmitWizard}
              />
            )}
            <div className="text-center mt-3">
              <a className="small" href="/">
                Go back home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Members;
