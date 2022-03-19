import React, { useEffect, useState } from "react";
import InnerNavBar from "../components/InnerNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GroupRegiser() {
  const [groups, setGroups] = useState([]);
  const [joinGroup, updateGroup] = useState(true);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  const countries = [
    "Tanzania",
    "Kenya",
    "Uganda",
    "South Africa",
    "Nigeria",
    "Rwanda",
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#00a49f";

    const fetchGroups = async () => {
      axios.get(`https://hababackend.herokuapp.com/api/groups`).then((res) => {
        const data = res.data;
        setGroups(data);
      });
    };

    fetchGroups();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setLoading(true)
    axios
      .post(`https://hababackend.herokuapp.com/api/group/create`, values)
      .then((res) => {
        setLoading(false)
        toast.success('You have joined the group successfully');
        history("/");
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data);
      });
  };

  const [values, setValues] = useState({
    groupChosen: "",
    groupname: "",
    memberID: "",
    region: "",
    country: "",
  });

  const handleRegionChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      region: e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      country: e.target.value,
    }));
  };

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
                  <div className="form-group mb-3">
                    <label>Region</label>
                    <input
                      className="form-control"
                      name="region"
                      onChange={handleRegionChange}
                      value={values.region}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Country</label>
                    <select
                      className="form-control"
                      name="country"
                      onChange={handleCountryChange}
                      value={values.country}
                    >
                      <option value="" disabled>
                        Choose your country
                      </option>
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {country}
                        </option>
                      ))}
                    </select>
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
                  { loading ? 'Joining group...' : 'Join group' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
