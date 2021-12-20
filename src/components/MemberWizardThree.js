import React, { useState } from "react";
import { Form, Input, Select } from "usetheform";

function MemberWizardThree({ prevPage, ...props }) {
  const groups = ["group1", "group2"];

  const [joinGroup, updateGroup] = useState(true);

  return (
    <>
      <div className="text-center">
        <h4>Groups</h4>
        <br />
      </div>
      <Form name="page3" {...props}>
        <div className="form-group mb-3">
          <div className="d-flex flex-row justify-content-around">
            <button
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
              <Select name="groupChosen" className="form-control">
                <option>Choose group</option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Select>
            </div>
          </>
        ) : (
          <>
            <div className="form-group mb-3">
              <label>Group</label>
              <Input type="text" className="form-control" name="group" />
            </div>
            <div className="form-group mb-3">
              <label>Group Region</label>
              <Input type="text" className="form-control" name="groupregion" />
            </div>
          </>
        )}

        <div className="d-flex flex-row justify-content-around">
          <button
            type="button"
            className="btn btn-light"
            style={{ border: "1px solid black" }}
            onClick={prevPage}
          >
            Previous Page
          </button>
          <button
            type="submit"
            className="btn btn-success btn-user"
            style={{ background: "#00a49f" }}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default MemberWizardThree;
