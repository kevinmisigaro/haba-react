import React from 'react'
import "../dashboard-assets/vendor/fontawesome-free/css/all.min.css";
import "../dashboard-assets/css/sb-admin-2.min.css";
import { Form, Input } from 'usetheform'

function WizardRegisterForm(props) {
    return (
        <Form className="user" {...props}>
              <div className="form-group">
              <Input
                    type="text"
                    className="form-control form-control-user"
                    id="fullname"
                    name="fullname"
                    placeholder="Company Name"
                  />
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <Input
                    type="email"
                    name="email"
                    className="form-control form-control-user"
                    id="exampleInputEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    type="text"
                    name="phone"
                    className="form-control form-control-user"
                    id="examplePhone"
                    placeholder="Phone as 782..."
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <Input
                    type="password"
                    name="password"
                    className="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    type="password"
                    name="passwordconfirm"
                    className="form-control form-control-user"
                    id="exampleRepeatPassword"
                    placeholder="Repeat Password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success btn-user btn-block" style={{ background: '#00a49f' }}>
                Next
              </button>
            </Form>
    )
}

export default WizardRegisterForm
