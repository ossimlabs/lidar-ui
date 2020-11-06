import React, {useState} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

import UploadFile from "./UploadFile";

function UploadFileModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{marginTop: "5px", marginRight: "5px"}} className="pull-right" variant="primary" onClick={handleShow}>
       Upload File
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Upload Lidar File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Upload and convert a Lidar file using Potree or Entwine.</span><br/>
          <small><em>Note: 1GB limit, and file must be of type (.las or .laz).</em></small><br/>
          <UploadFile uploadUrl={props.uploadUrl}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadFileModal;