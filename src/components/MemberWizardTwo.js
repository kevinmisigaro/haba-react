import React from "react";
import { Form, Input } from "usetheform";

function MemberWizardTwo({ prevPage, ...props }) {
  return (
    <>
      <div className="text-center">
        <h4>Next of kin details</h4>
        <br />
      </div>

      <Form name="page2" {...props}>
        <div className="form-group mb-3">
          <label>Full name</label>
          <Input type="text" name="kinname" className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Phone number</label>
          <Input type="text" name="kinphone" placeholder="+255xxxxx" className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Physical Address</label>
          <Input type="text" name="kinaddress" className="form-control" />
        </div>
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
            Next
          </button>
        </div>
      </Form>
    </>
  );
}

export default MemberWizardTwo;
