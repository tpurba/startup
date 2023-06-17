import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
  return (
    <Modal {...props} show={props.message} centered>
      <Modal.Body className="text-center style={{ backgroundColor: 'red', color: 'white' }}">
      <h1>{props.message}</h1>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
