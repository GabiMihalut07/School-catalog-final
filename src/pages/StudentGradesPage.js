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
      const response = await axios.get('http://38.242.231.170:442/api/students');
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
      const response = await axios.get(`http://38.242.231.170:442/api/students/${selectedStudent.value}/grades`);
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
      await axios.delete(`http://38.242.231.170:442/api/students/${selectedStudent.value}/grade/${gradeId}`);
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
