import React from 'react';
import DeleteGradeButton from './DeleteGradeButton';

const GradesTable = ({ grades, handleDeleteGrade }) => (
  <div className="card my-3">
    <div className="card-header">
      <h3 className="card-title">Note pentru student</h3>
    </div>
    <div className="card-body">
      {grades.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Grade</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={grade._id}>
                  <td>{index + 1}</td>
                  <td>{grade.course}</td>
                  <td>{grade.grade}</td>
                  <td className="text-end">
                    <DeleteGradeButton
                      gradeId={grade._id}
                      handleDeleteGrade={handleDeleteGrade}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Nu sunt note pentru studentul selectat</p>
      )}
    </div>
  </div>
);

export default GradesTable;
