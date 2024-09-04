
import React from 'react';

function DashboardHeader({ email }) {
  return (
    <div className="page-header mb-3">
      <h3 className="page-title">Bine ai venit, {email}</h3>
    </div>
  );
}

export default DashboardHeader;
