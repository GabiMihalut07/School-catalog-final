
import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh', position: 'relative' }}
  >
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <BootstrapSpinner
        animation="border"
        variant="primary"
        role="status"
        style={{ width: '16rem', height: '16rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          color: '#000',
        }}
      >
        Please wait...
      </div>
    </div>
  </div>
);

export default Spinner;
