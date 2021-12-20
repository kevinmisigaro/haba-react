import React, { useState } from "react";
import { useEffect } from "react";
import { useMultipleForm } from "usetheform";
import MemberWizardOne from "../components/MemberWizardOne";
import MemberWizardThree from "../components/MemberWizardThree";
import MemberWizardTwo from "../components/MemberWizardTwo";

function Members() {
  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";
  });

  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);

  const [getWizardState, wizard] = useMultipleForm();
  const onSubmitWizard = () => console.log(getWizardState());

  return (
    <div className="container d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "60rem" }}>
          <div className="card-body">
            {currentPage === 1 && (
              <MemberWizardOne {...wizard} onSubmit={nextPage} />
            )}
            {currentPage === 2 && (
              <MemberWizardTwo
                {...wizard}
                prevPage={prevPage}
                onSubmit={nextPage}
              />
            )}{
                currentPage === 3 && (
                    <MemberWizardThree 
                    {...wizard}
                    prevPage={prevPage}
                    onSubmit={onSubmitWizard} />
                )
            }
            <div className="text-center mt-3">
              <a className="small" href="/">
                Go back home
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Members;
