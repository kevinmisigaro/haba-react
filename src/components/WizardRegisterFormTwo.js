import React from 'react'
import "../dashboard-assets/vendor/fontawesome-free/css/all.min.css";
import "../dashboard-assets/css/sb-admin-2.min.css";
import { Form, Input } from 'usetheform'

function WizardRegisterFormTwo({ prevPage, ...props }) {
    return (
        <Form className="user" {...props}>
            <div className="form-group">
              <Input
                    type="text"
                    name="company"
                    className="form-control form-control-user"
                    id="companyName"
                    placeholder="Company Name"
                  />
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                    <Input
                        type="file"
                    />
                </div>
              </div>
        </Form>
    )
}

export default WizardRegisterFormTwo
