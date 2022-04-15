import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function AddMemberButton(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState({})


  return (
    <>
    <button className='btn btn-success btn-sm' onClick={handleShow}>
        Add member
    </button>

     <Modal show={show} onHide={handleClose} centered>
     <Modal.Header closeButton>
       <Modal.Title>Add a member to {props.group.name}</Modal.Title>
     </Modal.Header>
     <Modal.Body>
         <form>
             <div className='form-group mb-3'>
                <label>
                    Haba ID
                </label>
                <input className='form-control' name='habaID'/>
             </div>
             <div className='form-group mb-3'>
                <button className='btn btn-success'>
                    Add member to group
                </button>
             </div>
         </form>
     </Modal.Body>
   </Modal>
    </>
  )
}
