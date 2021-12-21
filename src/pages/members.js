import React, { useState } from "react";
import { useEffect } from "react";
import { useMultipleForm } from "usetheform";
import MemberWizardOne from "../components/MemberWizardOne";
import MemberWizardThree from "../components/MemberWizardThree";
import MemberWizardTwo from "../components/MemberWizardTwo";
import { useNavigate } from 'react-router-dom' ;
import toast from "react-hot-toast";

function Members() {
  const [groups, setGroups] = useState([]);
  const history = useNavigate()

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f"

    const fetchGroups = async () => {
      const response = await fetch(
        "https://hababackend.herokuapp.com/api/groups"
      );
      const newData = await response.json();
      setGroups(newData);
    };

    fetchGroups();

    return () => {
      document.body.style.backgroundColor = ''
    }
  }, []);

  const saveData = () => {
    fetch("https://hababackend.herokuapp.com/api/memberStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
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
        groupChosen: getWizardState().groupChosen,
        groupname: getWizardState().groupname,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .then(() => {
        toast.success('Your details have been saved!')
        history('/')
      })
      .catch((err) => console.log(err));
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
          )}
          {currentPage === 3 && (
            <MemberWizardThree
              {...wizard}
              groups={groups}
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
  );
}

export default Members;
