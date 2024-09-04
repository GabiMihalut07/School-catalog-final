import React from 'react';
import Select from 'react-select';

const StudentSelect = ({ students, selectedStudent, onStudentChange, loading }) => (
  <div className="card my-3">
    <div className="card-header">
      <h3 className="card-title">Selectare student</h3>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label htmlFor="studentSelect" className="form-label">
          Student
        </label>
        <Select
          id="studentSelect"
          options={students}
          value={selectedStudent}
          onChange={onStudentChange}
          isSearchable
          placeholder="Select a student"
          isDisabled={loading}
        />
      </div>
    </div>
  </div>
);

export default StudentSelect;
