import React from 'react';

function StudentTable({
  students,
  currentPage,
  itemsPerPage,
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  handleItemsPerPageChange,
  toggleForm,
  showForm,
  selectedStatus,
  handleStatusChange,
  handleSubmit,
  totalPages,
  renderPageNumbers,
}) {

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card my-3">
      <div className="card-header">
        <h3 className="card-title">Studenți</h3>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Caută student"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="d-flex align-items-center">
            <label htmlFor="itemsPerPage" className="me-2">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="form-select"
              style={{ width: 'auto' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nume</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <React.Fragment key={student._id}>
                    <tr role="row" className="odd">
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.status}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => toggleForm(student._id)}
                        >
                          Modify Status
                        </button>
                      </td>
                    </tr>
                    {showForm[student._id] && (
                      <tr role="row">
                        <td colSpan={4}>
                          <div className="form-group">
                            <label htmlFor={`status-select-${student._id}`}>
                              Status:
                            </label>
                            <select
                              id={`status-select-${student._id}`}
                              className="form-control"
                              value={selectedStatus[student._id] || student.status}
                              onChange={(e) =>
                                handleStatusChange(student._id, e.target.value)
                              }
                            >
                              <option value="new">New</option>
                              <option value="assigned">Assigned</option>
                            </select>
                          </div>
                          <button
                            className="btn btn-success"
                            onClick={() => handleSubmit(student._id)}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Nu s-a gasit acest nume
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default StudentTable;
