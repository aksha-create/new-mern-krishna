import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClassList(response.data);
    } catch (error) {
      console.error('Error fetching class list:', error);
    }
  };

  const fetchStudentsByClass = async (className) => {
    try {
      const response = await axios.get(`/api/students?class=${className}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAttendanceByClass = async (className) => {
    try {
      const response = await axios.get(`/api/attendance?class=${className}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleCardClick = (className) => {
    setSelectedClass(className);
    fetchStudentsByClass(className);
    fetchAttendanceByClass(className);
  };

  const renderClassCards = () => {
    return classList.map((classItem) => (
      <div key={classItem._id} className={`class-card ${selectedClass === classItem.className ? 'active' : ''}`} onClick={() => handleCardClick(classItem.className)}>
        {classItem.className}
      </div>
    ));
  };

  const renderUserContent = () => {
    if (selectedClass === '') {
      return <p className="no-data-message">Select a class to view students and attendance.</p>;
    } else if (students.length === 0) {
      return <p className="no-data-message">No students found for {selectedClass}.</p>;
    } else {
      return (
        <div>
          <h2 className="section-title">View Students</h2>
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <h3>{student.studentName}</h3>
              <p>Class: {student.className}</p>
              <p>Branch: {student.branch}</p>
              <p>Phone Number: {student.phNo}</p>
              <p>Date of Joining: {student.dateOfJoining}</p>
            </div>
          ))}
          <h2 className="section-title">View Attendance</h2>
          {attendance.length === 0 ? (
            <p className="no-data-message">No attendance records found for {selectedClass}.</p>
          ) : (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.present.join(', ')}</td>
                    <td>{record.absent.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }
  };

  const renderSideBar = () => {
    return (
      <aside>
        <h2>Side Bar</h2>
        <ul>
          <li>Take Attendance</li>
          <li>View Attendance</li>
        </ul>
      </aside>
    );
  };

  return (
    <div className="admin-page">
      <header>
        <h1>Admin Page</h1>
      </header>

      <main>
        <section className="class-section">
          <h2>Classes</h2>
          <div className="class-cards">{renderClassCards()}</div>
        </section>

        <section className="user-section">{renderUserContent()}</section>

        <section className="sidebar-section">{renderSideBar()}</section>
      </main>

      <footer>
        <p>Student Attendance Management System</p>
      </footer>
    </div>
  );
};

export default AdminPage;