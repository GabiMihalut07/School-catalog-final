// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import Spinner from '../components/Spinner';

// function StudentGradesPage() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   useEffect(() => {
//     const fetchStudents = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:442/api/students');
//         const studentOptions = response.data.map(student => ({
//           value: student._id,
//           label: student.name,
//         }));
//         setStudents(studentOptions);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       } finally {
//         await delay(1000);
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleStudentChange = (selectedOption) => {
//     setSelectedStudent(selectedOption);
//     setGrades([]);
//   };

//   const handleFetchGrades = async () => {
//     if (!selectedStudent) {
//       alert('Please select a student.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.get(`http://localhost:442/api/students/${selectedStudent.value}/grades`);
//       setGrades(response.data.grades);
//     } catch (error) {
//       console.error('Error fetching grades:', error);
//     } finally {
//       await delay(1000);
//       setLoading(false);
//     }
//   };

//   const handleDeleteGrade = async (gradeId) => {
//     setLoading(true);

//     try {
//       await axios.delete(`http://localhost:442/api/students/${selectedStudent.value}/grade/${gradeId}`);
//       const response = await axios.get(`http://localhost:442/api/students/${selectedStudent.value}/grades`);
//       setGrades(response.data.grades);
//     } catch (error) {
//       console.error('Error deleting grade:', error);
//     } finally {
//       setLoading(false);
//       await delay(1000);
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Vizualizați și gestionați notele studenților</h3>
//           </div>

//           {loading && (
//             <div className="mb-3">
//               <Spinner />
//             </div>
//           )}

//           <div className="card my-3">
//             <div className="card-header">
//               <h3 className="card-title">Selectare student</h3>
//             </div>
//             <div className="card-body">
//               <div className="mb-3">
//                 <label htmlFor="studentSelect" className="form-label">
//                   Student
//                 </label>
//                 <Select
//                   id="studentSelect"
//                   options={students}
//                   value={selectedStudent}
//                   onChange={handleStudentChange}
//                   isSearchable={true}
//                   placeholder="Select a student"
//                   isDisabled={loading}
//                 />
//               </div>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleFetchGrades}
//                 disabled={loading}
//               >
//                 Fetch Grades
//               </button>
//             </div>
//           </div>

//           {!loading && selectedStudent && grades.length === 0 && (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Note pentru {selectedStudent ? selectedStudent.label : 'Selected Student'}</h3>
//               </div>
//               <div className="card-body">
//                 <p className="text-center">There are no grades for this student.</p>
//               </div>
//             </div>
//           )}

//           {!loading && selectedStudent && grades.length > 0 && (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Note pentru {selectedStudent ? selectedStudent.label : 'Selected Student'}</h3>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
//                     <thead className="thead-dark">
//                       <tr>
//                         <th>#</th>
//                         <th>Course</th>
//                         <th>Grade</th>
//                         <th className="text-end">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {grades.map((grade, index) => (
//                         <tr key={grade._id}>
//                           <td>{index + 1}</td>
//                           <td>{grade.course}</td>
//                           <td>{grade.grade}</td>
//                           <td className="text-end">
//                             <button
//                               className="btn btn-danger"
//                               onClick={() => handleDeleteGrade(grade._id)}
//                             >
//                               Sterge nota
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {!loading && !selectedStudent && (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Selectati student pentru a vizualiza note</h3>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentGradesPage;




// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import Spinner from '../components/Spinner';

// function StudentGradesPage() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

//   const fetchStudents = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:442/api/students');
//       const studentOptions = response.data.map((student) => ({
//         value: student._id,
//         label: student.name,
//       }));
//       setStudents(studentOptions);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     } finally {
//       await delay(1000); // Simulate loading delay
//       setLoading(false);
//     }
//   }, [delay]);

//   useEffect(() => {
//     fetchStudents();
//   }, [fetchStudents]);

//   const handleStudentChange = (selectedOption) => {
//     setSelectedStudent(selectedOption);
//     setGrades([]);
//   };

//   const fetchGrades = useCallback(async () => {
//     if (!selectedStudent) {
//       alert('Please select a student.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:442/api/students/${selectedStudent.value}/grades`);
//       setGrades(response.data.grades);
//     } catch (error) {
//       console.error('Error fetching grades:', error);
//     } finally {
//       await delay(1000); // Simulate loading delay
//       setLoading(false);
//     }
//   }, [selectedStudent, delay]);

//   const handleDeleteGrade = useCallback(async (gradeId) => {
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:442/api/students/${selectedStudent.value}/grade/${gradeId}`);
//       fetchGrades(); 
//     } catch (error) {
//       console.error('Error deleting grade:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedStudent, fetchGrades]);

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="container">
//           <div className="page-header mb-3">
//             <h3 className="page-title">Vizualizați și gestionați notele studenților</h3>
//           </div>

//           {loading && (
//             <div className="mb-3">
//               <Spinner />
//             </div>
//           )}

//           <div className="card my-3">
//             <div className="card-header">
//               <h3 className="card-title">Selectare student</h3>
//             </div>
//             <div className="card-body">
//               <div className="mb-3">
//                 <label htmlFor="studentSelect" className="form-label">
//                   Student
//                 </label>
//                 <Select
//                   id="studentSelect"
//                   options={students}
//                   value={selectedStudent}
//                   onChange={handleStudentChange}
//                   isSearchable
//                   placeholder="Select a student"
//                   isDisabled={loading}
//                 />
//               </div>
//               <button
//                 className="btn btn-primary"
//                 onClick={fetchGrades}
//                 disabled={loading || !selectedStudent}
//               >
//                 Fetch Grades
//               </button>
//             </div>
//           </div>

//           {!loading && selectedStudent && (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">
//                   Note pentru {selectedStudent.label}
//                 </h3>
//               </div>
//               <div className="card-body">
//                 {grades.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table table-hover table-center mb-0 datatable table-striped shadow-sm">
//                       <thead className="thead-dark">
//                         <tr>
//                           <th>#</th>
//                           <th>Course</th>
//                           <th>Grade</th>
//                           <th className="text-end">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {grades.map((grade, index) => (
//                           <tr key={grade._id}>
//                             <td>{index + 1}</td>
//                             <td>{grade.course}</td>
//                             <td>{grade.grade}</td>
//                             <td className="text-end">
//                               <button
//                                 className="btn btn-danger"
//                                 onClick={() => handleDeleteGrade(grade._id)}
//                               >
//                                 Sterge nota
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-center">There are no grades for this student.</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {!loading && !selectedStudent && (
//             <div className="card my-3">
//               <div className="card-header">
//                 <h3 className="card-title">Selectati student pentru a vizualiza note</h3>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentGradesPage;


import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import StudentSelect from '../components/StudentSelect';
import StudentGradesTable from '../components/StudentGradesTable';

function StudentGradesPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:442/api/students');
      const studentOptions = response.data.map((student) => ({
        value: student._id,
        label: student.name,
      }));
      setStudents(studentOptions);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      await delay(1000);
      setLoading(false);
    }
  }, [delay]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleStudentChange = (selectedOption) => {
    setSelectedStudent(selectedOption);
    setGrades([]);
  };

  const fetchGrades = useCallback(async () => {
    if (!selectedStudent) {
      alert('Please select a student.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:442/api/students/${selectedStudent.value}/grades`);
      setGrades(response.data.grades);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      await delay(1000);
      setLoading(false);
    }
  }, [selectedStudent, delay]);

  const handleDeleteGrade = useCallback(async (gradeId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:442/api/students/${selectedStudent.value}/grade/${gradeId}`);
      await fetchGrades(); 
    } catch (error) {
      console.error('Error deleting grade:', error);
    } finally {
      await delay(1000);
      setLoading(false);
    }
  }, [selectedStudent, fetchGrades, delay]);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header mb-3">
            <h3 className="page-title">Vizualizați și gestionați notele studenților</h3>
          </div>

          {loading && (
            <div className="mb-3">
              <Spinner />
            </div>
          )}

          <StudentSelect
            students={students}
            selectedStudent={selectedStudent}
            onStudentChange={handleStudentChange}
            loading={loading}
          />

          {!loading && selectedStudent && (
            <div className="mb-3">
              <button
                className="btn btn-primary"
                onClick={fetchGrades}
                disabled={loading || !selectedStudent}
              >
                Fetch Grades
              </button>
            </div>
          )}

          {!loading && selectedStudent && (
            <StudentGradesTable grades={grades} handleDeleteGrade={handleDeleteGrade} />
          )}

          {!loading && !selectedStudent && (
            <div className="card my-3">
              <div className="card-header">
                <h3 className="card-title">Selectati student pentru a vizualiza note</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentGradesPage;
