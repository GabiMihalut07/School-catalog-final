// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner.js';

// function GradePage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedCourse, setSelectedCourse] = useState({});
//   const [grade, setGrade] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');  // New state for search term
//   const courses = ["Math", "Science", "History", "Literature"]; 

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   useEffect(() => {
//     const fetchAssignedStudents = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:442/api/students/assigned-students');
//         console.log(response);
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       } finally {
//         await delay(1000);
//         setLoading(false);
//       }
//     };

//     fetchAssignedStudents();
//   }, []);

//   const handleCourseChange = (id, course) => {
//     setSelectedCourse((prevSelectedCourse) => ({
//       ...prevSelectedCourse,
//       [id]: course,
//     }));
//   };

//   const handleGradeChange = (id, gradeValue) => {
//     setGrade((prevGrade) => ({
//       ...prevGrade,
//       [id]: gradeValue,
//     }));
//   };

//   const handleSubmitGrade = async (id) => {
//     setLoading(true);
//     const course = selectedCourse[id];
//     const studentGrade = grade[id];

//     try {
//       await axios.post(`http://localhost:442/api/students/${id}/grade`, { course, grade: studentGrade });
//       alert('Grade submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting grade:', error);
//     } finally {
//       await delay(1000);
//       setLoading(false);
//     }
//   };

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button className="page-link" onClick={() => setCurrentPage(i)}>
//             {i}
//           </button>
//         </li>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Note Studenti</h3>
//           </div>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Studenti Inrolati</h3>
//               </div>
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Cautare dupa nume"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <label htmlFor="itemsPerPage" className="me-2">
//                     Show:
//                   </label>
//                   <select
//                     id="itemsPerPage"
//                     value={itemsPerPage}
//                     onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                     className="form-select"
//                     style={{ width: 'auto' }}
//                   >
//                     <option value={10}>10</option>
//                     <option value={25}>25</option>
//                     <option value={50}>50</option>
//                     <option value={100}>100</option>
//                   </select>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
//                     <thead className="thead-dark">
//                       <tr>
//                         <th>#</th>
//                         <th>Nume</th>
//                         <th>Curs</th>
//                         <th>Nota</th>
//                         <th className="text-end">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentStudents.map((student, index) => (
//                         <tr key={student._id}>
//                           <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                           <td>{student.name}</td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={selectedCourse[student._id] || ""}
//                               onChange={(e) => handleCourseChange(student._id, e.target.value)}
//                             >
//                               <option value="" disabled>Selecteaza cursul</option>
//                               {courses.map((course, idx) => (
//                                 <option key={idx} value={course}>{course}</option>
//                               ))}
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={grade[student._id] || ""}
//                               onChange={(e) => handleGradeChange(student._id, e.target.value)}
//                               placeholder="Nota"
//                             />
//                           </td>
//                           <td className="text-end">
//                             <button
//                               className="btn btn-success"
//                               onClick={() => handleSubmitGrade(student._id)}
//                             >
//                               Introduce nota
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <nav>
//                   <ul className="pagination justify-content-center flex-wrap">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                       >
//                         Previous
//                       </button>
//                     </li>
//                     {renderPageNumbers()}
//                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                       >
//                         Next
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GradePage;




// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';

// function GradePage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedCourse, setSelectedCourse] = useState({});
//   const [grade, setGrade] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const courses = ["Math", "Science", "History", "Literature"];

//   const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

//   const fetchAssignedStudents = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:442/api/students/assigned-students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     } finally {
//       await delay(1000); // Simulate loading delay
//       setLoading(false);
//     }
//   }, [delay]);

//   useEffect(() => {
//     fetchAssignedStudents();
//   }, [fetchAssignedStudents]);

//   const handleCourseChange = (id, course) => {
//     setSelectedCourse((prevSelectedCourse) => ({
//       ...prevSelectedCourse,
//       [id]: course,
//     }));
//   };

//   const handleGradeChange = (id, gradeValue) => {
//     setGrade((prevGrade) => ({
//       ...prevGrade,
//       [id]: gradeValue,
//     }));
//   };

//   const handleSubmitGrade = useCallback(async (id) => {
//     const course = selectedCourse[id];
//     const studentGrade = grade[id];

//     if (!course || !studentGrade) {
//       alert('Please select a course and enter a grade.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:442/api/students/${id}/grade`, { course, grade: studentGrade });
//       alert('Grade submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting grade:', error);
//     } finally {
//       await delay(1000); // Simulate loading delay
//       setLoading(false);
//     }
//   }, [selectedCourse, grade, delay]);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button className="page-link" onClick={() => setCurrentPage(i)}>
//             {i}
//           </button>
//         </li>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Note Studenti</h3>
//           </div>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Studenti Inrolati</h3>
//               </div>
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Cautare dupa nume"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <label htmlFor="itemsPerPage" className="me-2">
//                     Show:
//                   </label>
//                   <select
//                     id="itemsPerPage"
//                     value={itemsPerPage}
//                     onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                     className="form-select"
//                     style={{ width: 'auto' }}
//                   >
//                     <option value={10}>10</option>
//                     <option value={25}>25</option>
//                     <option value={50}>50</option>
//                     <option value={100}>100</option>
//                   </select>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
//                     <thead className="thead-dark">
//                       <tr>
//                         <th>#</th>
//                         <th>Nume</th>
//                         <th>Curs</th>
//                         <th>Nota</th>
//                         <th className="text-end">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentStudents.map((student, index) => (
//                         <tr key={student._id}>
//                           <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                           <td>{student.name}</td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={selectedCourse[student._id] || ""}
//                               onChange={(e) => handleCourseChange(student._id, e.target.value)}
//                             >
//                               <option value="" disabled>Selecteaza cursul</option>
//                               {courses.map((course, idx) => (
//                                 <option key={idx} value={course}>{course}</option>
//                               ))}
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={grade[student._id] || ""}
//                               onChange={(e) => handleGradeChange(student._id, e.target.value)}
//                               placeholder="Nota"
//                               min="1"
//                               max="10"
//                             />
//                           </td>
//                           <td className="text-end">
//                             <button
//                               className="btn btn-success"
//                               onClick={() => handleSubmitGrade(student._id)}
//                             >
//                               Introduce nota
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <nav>
//                   <ul className="pagination justify-content-center flex-wrap">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                       >
//                         Previous
//                       </button>
//                     </li>
//                     {renderPageNumbers()}
//                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                       >
//                         Next
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GradePage;



// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';
// import GradeTable from '../components/GradeTable';
// import GradePagination from '../components/GradePagination';
// import GradeSearchAndFilter from '../components/GradeSearchAndFilter';

// function GradePage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedCourse, setSelectedCourse] = useState({});
//   const [grade, setGrade] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');

//   const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

//   const fetchAssignedStudents = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:442/api/students/assigned-students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     } finally {
//       await delay(1000); 
//       setLoading(false);
//     }
//   }, [delay]);

//   useEffect(() => {
//     fetchAssignedStudents();
//   }, [fetchAssignedStudents]);

//   const handleCourseChange = (id, course) => {
//     setSelectedCourse((prevSelectedCourse) => ({
//       ...prevSelectedCourse,
//       [id]: course,
//     }));
//   };

//   const handleGradeChange = (id, gradeValue) => {
//     setGrade((prevGrade) => ({
//       ...prevGrade,
//       [id]: gradeValue,
//     }));
//   };

//   const handleSubmitGrade = useCallback(async (id) => {
//     const course = selectedCourse[id];
//     const studentGrade = grade[id];

//     if (!course || !studentGrade) {
//       alert('Please select a course and enter a grade.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:442/api/students/${id}/grade`, { course, grade: studentGrade });
//       alert('Grade submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting grade:', error);
//     } finally {
//       await delay(1000); // Simulate loading delay
//       setLoading(false);
//     }
//   }, [selectedCourse, grade, delay]);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Note Studenti</h3>
//           </div>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Studenti Inrolati</h3>
//               </div>
//               <div className="card-body">
//                 <GradeSearchAndFilter
//                   searchTerm={searchTerm}
//                   setSearchTerm={setSearchTerm}
//                   itemsPerPage={itemsPerPage}
//                   setItemsPerPage={setItemsPerPage}
//                 />
//                 <GradeTable
//                   students={currentStudents}
//                   selectedCourse={selectedCourse}
//                   grade={grade}
//                   handleCourseChange={handleCourseChange}
//                   handleGradeChange={handleGradeChange}
//                   handleSubmitGrade={handleSubmitGrade}
//                   currentPage={currentPage}
//                   itemsPerPage={itemsPerPage}
//                 />
//                 <GradePagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   setCurrentPage={setCurrentPage}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GradePage;




// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';
// import GradeTable from '../components/GradeTable';
// import GradePagination from '../components/GradePagination';
// import GradeSearchAndFilter from '../components/GradeSearchAndFilter';

// function GradePage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedCourse, setSelectedCourse] = useState({});
//   const [grade, setGrade] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');

//   const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

//   const fetchAssignedStudents = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:442/api/students/assigned-students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       alert('Failed to fetch students. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAssignedStudents();
//   }, [fetchAssignedStudents]);

//   const handleCourseChange = (id, course) => {
//     setSelectedCourse((prevSelectedCourse) => ({
//       ...prevSelectedCourse,
//       [id]: course,
//     }));
//   };

//   const handleGradeChange = (id, gradeValue) => {
//     if (gradeValue < 1 || gradeValue > 10) {
//       alert('Grade must be between 1 and 10.');
//       return;
//     }
//     setGrade((prevGrade) => ({
//       ...prevGrade,
//       [id]: gradeValue,
//     }));
//   };

//   const handleSubmitGrade = useCallback(async (id) => {
//     const course = selectedCourse[id];
//     const studentGrade = grade[id];

//     if (!course || !studentGrade) {
//       alert('Please select a course and enter a grade.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:442/api/students/${id}/grade`, { course, grade: studentGrade });
//       alert('Grade submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting grade:', error);
//       alert('Failed to submit grade. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCourse, grade]);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Note Studenti</h3>
//           </div>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Studenti Inrolati</h3>
//               </div>
//               <div className="card-body">
//                 <GradeSearchAndFilter
//                   searchTerm={searchTerm}
//                   setSearchTerm={setSearchTerm}
//                   itemsPerPage={itemsPerPage}
//                   setItemsPerPage={setItemsPerPage}
//                 />
//                 <GradeTable
//                   students={currentStudents}
//                   selectedCourse={selectedCourse}
//                   grade={grade}
//                   handleCourseChange={handleCourseChange}
//                   handleGradeChange={handleGradeChange}
//                   handleSubmitGrade={handleSubmitGrade}
//                   currentPage={currentPage}
//                   itemsPerPage={itemsPerPage}
//                 />
//                 <GradePagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   setCurrentPage={setCurrentPage}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GradePage;





import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import GradeTable from '../components/GradeTable';
import GradePagination from '../components/GradePagination';
import GradeSearchAndFilter from '../components/GradeSearchAndFilter';
import { toast } from 'react-toastify';

function GradePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [grade, setGrade] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

  const fetchAssignedStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:442/api/students/assigned-students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students. Please try again later.');
    } finally {
      await delay(1000); // Artificial delay
      setLoading(false);
    }
  }, [delay]);

  useEffect(() => {
    fetchAssignedStudents();
  }, [fetchAssignedStudents]);

  const handleCourseChange = (id, course) => {
    setSelectedCourse((prevSelectedCourse) => ({
      ...prevSelectedCourse,
      [id]: course,
    }));
  };

  const handleGradeChange = (id, gradeValue) => {
    if (gradeValue < 1 || gradeValue > 10) {
      toast.error('Grade must be between 1 and 10.');
      return;
    }
    setGrade((prevGrade) => ({
      ...prevGrade,
      [id]: gradeValue,
    }));
  };

  const handleSubmitGrade = useCallback(async (id) => {
    const course = selectedCourse[id];
    const studentGrade = grade[id];

    if (!course || !studentGrade) {
      toast.error('Please select a course and enter a grade.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:442/api/students/${id}/grade`, { course, grade: studentGrade });
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error('Failed to submit grade. Please try again.');
    } finally {
      await delay(1000); // Artificial delay
      setLoading(false);
    }
  }, [selectedCourse, grade, delay]);

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header mb-3">
            <h3 className="page-title">Note Studenti</h3>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="card my-3">
              <div className="card-header">
                <h3 className="card-title">Studenti Inrolati</h3>
              </div>
              <div className="card-body">
                <GradeSearchAndFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
                <GradeTable
                  students={currentStudents}
                  selectedCourse={selectedCourse}
                  grade={grade}
                  handleCourseChange={handleCourseChange}
                  handleGradeChange={handleGradeChange}
                  handleSubmitGrade={handleSubmitGrade}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
                <GradePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GradePage;
