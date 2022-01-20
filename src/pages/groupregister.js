import React, { useEffect, useState } from "react";
import InnerNavBar from "../components/InnerNavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GroupRegiser() {
  const [groups, setGroups] = useState([]);
  const [joinGroup, updateGroup] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    const fetchGroups = async () => {
      const response = await fetch(
        "https://hababackend.herokuapp.com/api/groups"
      );
      const newData = await response.json();
      setGroups(newData);
    };

    fetchGroups();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
  };

  const [values, setValues] = useState({
    groupChosen: "",
    groupname: "",
    memberID: "",
  });

  const handleMemberIDChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      memberID: e.target.value,
    }));
  };

  const handleGroupNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      groupname: e.target.value,
    }));
  };

  const handleGroupChosenChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      groupChosen: e.target.value,
    }));
  };

  const notify = () => {
      toast.success('Great')
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
            <div className="text-center">
              <h4>Groups</h4>
              <br />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <div className="d-flex flex-row justify-content-around">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => updateGroup(!joinGroup)}
                  >
                    {joinGroup ? "Create group" : "Join group"}
                  </button>
                </div>
              </div>

              {joinGroup ? (
                <>
                  <div className="form-group mb-3">
                    <label>Group</label>
                    <select
                      name="groupChosen"
                      onChange={handleGroupChosenChange}
                      value={values.groupChosen}
                      className="form-control"
                    >
                      <option disabled value="">
                        Choose group
                      </option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group mb-3">
                    <label>Group name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="groupname"
                      placeholder="Enter your group name"
                      onChange={handleGroupNameChange}
                      value={values.groupname}
                    />
                  </div>
                </>
              )}

              <div className="form-group mb-5">
                <label>Member ID</label>
                <input
                  className="form-control"
                  onChange={handleMemberIDChange}
                  value={values.memberID}
                  name="memberID"
                  placeholder="Please enter your Haba ID"
                />
              </div>

              <div className="d-flex flex-row justify-content-around">
                <button
                  type="submit"
                  className="btn btn-success btn-user"
                  style={{ background: "#00a49f" }}
                >
                  {!joinGroup ? "Create group" : "Join group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
