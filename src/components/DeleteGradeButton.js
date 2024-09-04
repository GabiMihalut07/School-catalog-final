import React from 'react';

const DeleteGradeButton = ({ gradeId, handleDeleteGrade }) => (
  <button
    className="btn btn-danger"
    onClick={() => handleDeleteGrade(gradeId)}
  >
    Sterge nota
  </button>
);

export default DeleteGradeButton;
