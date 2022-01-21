import React, { useState } from "react";
import { useEffect } from "react";
import { useMultipleForm } from "usetheform";
import MemberWizardOne from "../components/MemberWizardOne";
import MemberWizardTwo from "../components/MemberWizardTwo";
import { useNavigate } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Members() {
  const history = useNavigate();
  
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const saveData = () => {

    console.log({
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
      kinname: getWizardState().kinname,
      kinphone: getWizardState().kinphone,
      kinaddress: getWizardState().kinaddress,
    })

    axios
      .post(`https://hababackend.herokuapp.com/api/memberStore`, {
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
        kinname: getWizardState().kinname,
        kinphone: getWizardState().kinphone,
        kinaddress: getWizardState().kinaddress,
      })
      .then((res) => {
        toast.success(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data)
      });
  };

  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);

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
        <div className="card" style={{ width: "60rem" }}>
          <div className="card-body">
            {currentPage === 1 && (
              <MemberWizardOne {...wizard} onSubmit={nextPage} />
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
