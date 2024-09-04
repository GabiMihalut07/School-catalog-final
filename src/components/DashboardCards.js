import React from 'react';

const DashboardCards = ({ title, count, imageSrc, imageAlt, imageWidth = '50px' }) => {
  return (
    <div className="col-xl-3 col-sm-6 col-12 d-flex mt-3">
      <div className="card bg-comman w-100">
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-info">
              <h3>{title}</h3>
              <h3>{count}</h3>
            </div>
            <div className="db-icon">
              <img src={imageSrc} alt={imageAlt} style={{ width: imageWidth }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
