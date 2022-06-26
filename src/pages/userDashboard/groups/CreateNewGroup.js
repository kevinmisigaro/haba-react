import axios from 'axios';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function CreateNewGroup() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        region:'',
        country:''
    })

    const handleNameChange = e => {
        e.persist()
        setValues({
            ...values,
            name: e.target.value
        })
    }

    const countries = [
        "Tanzania",
        "Kenya",
        "Uganda",
        "South Africa",
        "Nigeria",
        "Rwanda",
      ];

    const handleCountryChange = e =>{
        e.persist()
        setValues({
            ...values,
            country: e.target.value
        })
    }

    const handleRegionChange = e =>{
        e.persist()
        setValues({
            ...values,
            region: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)

        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;

          axios
          .post(`${process.env.REACT_APP_API_URL}/group/user/create`, values)
          .then((res) => {
            setLoading(false)
            toast.success('You have joined the group successfully');
            window.location.reload();
          })
          .catch((err) => {
            setLoading(false)
            toast.error(err.response.data);
          });
    }

  return (
    <div>
        <button className='btn btn-success me-3' onClick={handleShow}>
            Create new group
        </button>

        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-4'>
                    <label>Group name</label>
                    <input className='form-control' onChange={handleNameChange} type="text" />
                </div>
                <div className='form-group mb-4'>
                    <label>Region/State</label>
                    <input className='form-control' onChange={handleRegionChange} type="text" />
                </div>
                <div className='form-group mb-4'>
                    <label>Country</label>
                    <select
                      className="form-control"
                      name="country"
                      onChange={handleCountryChange}
                    >
                      <option value="">
                        Choose your country
                      </option>
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                </div>
                <div className='form-group mb-2 d-grid'>
                    <button type='submit' className='btn btn-success'>{
                        loading ? "Creating.." : "Create Group"
                    }</button>
                </div>
            </form>
        </Modal.Body>
      </Modal>

    </div>
  )
}
