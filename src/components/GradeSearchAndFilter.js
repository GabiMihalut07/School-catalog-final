
import React from 'react';

const GradeSearchAndFilter = ({ searchTerm, setSearchTerm, itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Cautare dupa nume"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <label htmlFor="itemsPerPage" className="me-2">
        Show:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        className="form-select"
        style={{ width: 'auto' }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default GradeSearchAndFilter;
