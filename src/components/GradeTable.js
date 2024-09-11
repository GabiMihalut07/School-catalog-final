import React from 'react';

const GradeTable = ({ students, selectedCourse, grade, handleCourseChange, handleGradeChange, handleSubmitGrade, currentPage, itemsPerPage }) => {
  const styles = {
    tableResponsiveWrapper: {
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      marginBottom: '1.5rem',
    },
    table: {
      width: '100%',
      minWidth: '600px',
    },
    formSelect: {
      minWidth: '150px',
      padding: '8px',
      fontSize: '14px',
    },
    formControl: {
      minWidth: '150px',
      padding: '8px',
      fontSize: '14px',
    },
    tableCell: {
      padding: '0.5rem',
      verticalAlign: 'middle',
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.tableResponsiveWrapper}>
      <div className="table-responsive">
        <table style={styles.table} className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Curs</th>
              <th>Nota</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{student.name}</td>
                <td>
                  <select
                    style={styles.formSelect}
                    className="form-select"
                    value={selectedCourse[student._id] || ""}
                    onChange={(e) => handleCourseChange(student._id, e.target.value)}
                  >
                    <option value="" disabled>Selecteaza cursul</option>
                    {["Math", "Science", "History", "Literature"].map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    style={styles.formControl}
                    className="form-control"
                    value={grade[student._id] || ""}
                    onChange={(e) => handleGradeChange(student._id, e.target.value)}
                    placeholder="Nota"
                    min="1"
                    max="10"
                  />
                </td>
                <td className="text-end">
                  <button
                    style={styles.button}
                    className="btn btn-success"
                    onClick={() => handleSubmitGrade(student._id)}
                  >
                    Introduce nota
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeTable;
