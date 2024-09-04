import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogoutPage = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    window.location.href = '/login';
  };

  const handleConfirm = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirma</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esti sigur ca vrei sa te deconectezi?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutPage;
