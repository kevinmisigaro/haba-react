import React, {useState} from "react";
import "../dashboard-assets/vendor/fontawesome-free/css/all.min.css";
import "../dashboard-assets/css/sb-admin-2.min.css";
import { useEffect } from "react";
import { useMultipleForm } from "usetheform";
import WizardRegisterForm from "../components/WizardRegisterForm";
import WizardRegisterFormTwo from "../components/WizardRegisterFormTwo";
import { Link } from "react-router-dom";
import InnerNavBar from "../components/InnerNavBar";

function Register() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);

  const [getWizardState, wizard] = useMultipleForm();
  const onSubmitWizard = () => console.log(getWizardState());

  return (
    <>
      <InnerNavBar />
      <div className="container d-flex justify-content-center" style={{marginTop: '100px'}}>
      <div
        className="card o-hidden border-0 shadow-lg my-5"
        style={{ width: "600px" }}
      >
        <div className="card-body p-0">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Register business</h1>
            </div>
            {currentPage === 1 && (
              <WizardRegisterForm {...wizard} onSubmit={nextPage} />
            )}
            {currentPage === 2 && (
              <WizardRegisterFormTwo
                {...wizard}
                prevPage={prevPage}
                onSubmit={onSubmitWizard}
              />
            )}
            <hr />
            <div className="text-center">
              <Link className="small" to="/login">
                Already have an account? Login!
              </Link>
            </div>
            <div className="text-center">
              <a className="small" href="/">
                Go back
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
