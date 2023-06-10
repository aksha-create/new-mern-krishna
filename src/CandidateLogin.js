import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import './IndexLogin.css';
import './AdminPage.css';

const CandidateLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('takeAttendance');
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [viewAttendanceData, setViewAttendanceData] = useState({});
  const [classList, setClassList] = useState([]);
  const [attendanceDates, setAttendanceDates] = useState({});

  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClassList(response.data);
    } catch (error) {
      console.error('Error retrieving class list:', error);
    }
  };

  const fetchAttendanceDates = async () => {
    try {
      const response = await axios.get(`/api/attendance/${selectedClass}`);
      setAttendanceDates(response.data);
    } catch (error) {
      console.error('Error retrieving attendance dates:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClick = (className) => {
    setSelectedClass(className);
    setAttendanceData({});
    fetchAttendanceDates();
  };

  const handleAttendanceChange = (student, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [student]: value,
    }));
  };

  const handleSubmitAttendance = () => {
    setViewAttendanceData((prevData) => ({
      ...prevData,
      [selectedClass]: attendanceData,
    }));
    setSelectedClass('');
    setAttendanceData({});
  };

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderUserContent = () => {
    if (activeTab === 'viewStudents') {
      return <p>View Students Content</p>;
    } else if (activeTab === 'takeAttendance') {
      return <p></p>;
    } else {
      return null;
    }
  };

  return (
    <div className="index-login">
      <header>
        <h1>Student Attendance Management System</h1>
        {loggedIn && <h5>Hello, {username}!</h5>}
      </header>

      <main>
        {!loggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <aside className="sidebar">
              <ul>
                <li
                  className={activeTab === 'takeAttendance' ? 'active' : ''}
                  onClick={() => handleTabChange('takeAttendance')}
                >
                  Take Attendance
                </li>
                <li
                  className={activeTab === 'viewAttendance' ? 'active' : ''}
                  onClick={() => handleTabChange('viewAttendance')}
                >
                  View Attendance
                </li>
              </ul>
            </aside>
            <section>
              {activeTab === 'takeAttendance' && (
                <>
                  <h2>Take Attendance</h2>
                  <div className="class-cards">
                    {classList.map((classItem) => (
                      <div
                        key={classItem._id}
                        className={`class-card ${
                          selectedClass === classItem.className ? 'active' : ''
                        }`}
                        onClick={() => handleCardClick(classItem.className)}
                      >
                        <h3>{classItem.className}</h3>
                      </div>
                    ))}
                  </div>
                  {selectedClass && (
                    <div className="attendance-form">
                      <h4>Attendance for {selectedClass}</h4>
                      <form>
                        {classList
                          .find((classItem) => classItem.className === selectedClass)
                          .students.map((student) => (
                            <div key={student} className="form-check">
                              <div className="form-check-inline">
                                <p>{student}</p>
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={attendanceData[student] === 'present'}
                                    onChange={() => handleAttendanceChange(student, 'present')}
                                  />
                                  Present
                                </label>
                              </div>
                              <div className="form-check-inline">
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={attendanceData[student] === 'absent'}
                                    onChange={() => handleAttendanceChange(student, 'absent')}
                                  />
                                  Absent
                                </label>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSubmitAttendance}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
              {activeTab === 'viewAttendance' && (
                <div className="view-attendance">
                  <h2>View Attendance</h2>
                  <div className="attendance-cards">
                    {Object.entries(viewAttendanceData).map(([className, attendanceData]) => (
                      <div key={className} className="attendance-card">
                        <h3>{className}</h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              <th>Date</th>
                              <th>Attendance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classList
                              .find((classItem) => classItem.className === className)
                              .students.map((student) => (
                                <tr key={student}>
                                  <td>{student}</td>
                                  <td>{attendanceDates[student]}</td>
                                  <td>{attendanceData[student]}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
            <section>{renderUserContent()}</section>
          </>
        )}
      </main>

      <footer>
        <nav>
          <ul>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default CandidateLogin;