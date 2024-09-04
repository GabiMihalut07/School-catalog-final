import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCardList from '../components/DashboardCardList';
import StudentTable from '../components/StudentTable';
import Spinner from '../components/Spinner.js';

function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [counts, setCounts] = useState({
    students: 0,
    profesori: 0,
    licenta: 0,
    master: 0,
  });

  const token = localStorage.getItem('authToken');
  let decoded = null;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  if (token) {
    try {
      decoded = jwtDecode(token);
      console.log(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
      localStorage.removeItem('authToken');
    }
  } else {
    console.log("No token found in localStorage");
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [countResponse, studentResponse] = await Promise.all([
          axios.get('http://localhost:442/api/count'),
          axios.get('http://localhost:442/api/students'),
        ]);
        setCounts(countResponse.data);
        setStudents(studentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        await delay(1000);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  //   setCurrentPage(1);
  // };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const toggleForm = (id) => {
    setShowForm((prevShowForm) => ({
      ...prevShowForm,
      [id]: !prevShowForm[id],
    }));
  };

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [id]: status,
    }));
  };

  const handleSubmit = async (id) => {
    setLoading(true);
    const updatedStatus = selectedStatus[id];
    try {
      await axios.put(`http://localhost:442/api/students/${id}/status`, { status: updatedStatus });
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, status: updatedStatus } : student
        )
      );
      setShowForm((prevShowForm) => ({
        ...prevShowForm,
        [id]: false,
      }));
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      await delay(1000);
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())).length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="container">
          <DashboardHeader email={decoded?.email} />
          {loading ? (
            <Spinner />
          ) : (
            <>
              <DashboardCardList counts={counts} />
              <StudentTable
                students={students}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCurrentPage={setCurrentPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                toggleForm={toggleForm}
                showForm={showForm}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
                handleSubmit={handleSubmit}
                totalPages={totalPages}
                renderPageNumbers={renderPageNumbers}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
