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
      const response = await axios.get('http://38.242.231.170:442/api/students/assigned-students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students. Please try again later.');
    } finally {
      await delay(1000);
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
      await axios.post(`http://38.242.231.170:442/api/students/${id}/grade`, { course, grade: studentGrade });
      setSelectedCourse((prevSelectedCourse) => ({
        ...prevSelectedCourse,
        [id]: '',
      }));
      setGrade((prevGrade) => ({
        ...prevGrade,
        [id]: '',
      }));
      toast.success('Grade submitted successfully!');
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error('Failed to submit grade. Please try again.');
    } finally {
      await delay(1000);
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
                     <p>*pot fi vizualizate notele doar acelor studenti care au status "assiged"</p>
        </div>
      </div>
    </div>
  );
}

export default GradePage;
