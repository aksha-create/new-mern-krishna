import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import './IndexLogin.css';


const IndexLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [adminForm, setAdminForm] = useState({ name: '', classAlloted: '', username: '', password: '' });
  const [classForm, setClassForm] = useState({ className: '', maxStudentCount: '' });
  const [studentForm, setStudentForm] = useState({ studentName: '', className: '', branch: '', phNo: '', username: '', password: '', dateOfJoining: '' });
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    // Fetch class list from the database
    fetchClassList();
  }, []);

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

  const fetchClassList = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClassList(response.data);
    } catch (error) {
      console.error('Error fetching class list:', error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('/api/admins', adminForm);
      console.log('Admin added:', response.data);
      // Reset admin form after successful addition
      setAdminForm({ name: '', classAlloted: '', username: '', password: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await axios.post('/api/classes', classForm);
      console.log('Class added:', response.data);
      // Reset class form after successful addition
      setClassForm({ className: '', maxStudentCount: '' });
      // Fetch updated class list
      fetchClassList();
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('/api/students', studentForm);
      console.log('Student added:', response.data);
      // Reset student form after successful addition
      setStudentForm({ studentName: '', className: '', branch: '', phNo: '', username: '', password: '', dateOfJoining: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const renderUserContent = () => {
    if (activeTab === 'viewStudents') {
      return <p style={{ padding: '2rem' }}>View Students Content</p>;
    } else if (activeTab === 'takeAttendance') {
      return <p style={{ padding: '2rem' }}>Take Attendance Content</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="index-login">
      <header>
        <h1>Student Attendance Management System</h1>
        {loggedIn && <button style={{ marginLeft: '80rem' ,marginTop:'-1rem'}} className="btn btn-secondary" onClick={handleLogout}>Logout</button>}
        {loggedIn && <h5 style={{ marginLeft: '80rem' }}>Hello, {username}!</h5>}
      </header>

      <main>
        {!loggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <aside className={activeTab !== '' ? 'active' : ''}>
              <ul>
                <li className={activeTab === 'viewStudents' ? 'active' : ''} onClick={() => handleTabClick('viewStudents')}>
                  View Students
                </li>
                <li className={activeTab === 'takeAttendance' ? 'active' : ''} onClick={() => handleTabClick('takeAttendance')}>
                  Take Attendance
                </li>
                <li className={activeTab === 'addAdmin' ? 'active' : ''} onClick={() => handleTabClick('addAdmin')}>
                  Add Admin
                </li>
                <li className={activeTab === 'addClass' ? 'active' : ''} onClick={() => handleTabClick('addClass')}>
                  Add Class
                </li>
                <li className={activeTab === 'addStudent' ? 'active' : ''} onClick={() => handleTabClick('addStudent')}>
                  Add Student
                </li>
              </ul>
            </aside>

            {renderUserContent()}

            <section>
              {activeTab === 'addAdmin' && (
                <div>
                  <h2>Add Admin</h2>
                  <form>
                    <label>Name:</label>
                    <input type="text" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} />
                    <br></br>
                    <label>Class Alloted:</label>
                    <select value={adminForm.classAlloted} onChange={(e) => setAdminForm({ ...adminForm, classAlloted: e.target.value })}>
                      <option value="">Select Class</option>
                      {classList.map((classItem) => (
                        <option key={classItem._id} value={classItem.className}>
                          {classItem.className}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <label>Username:</label>
                    <input type="text" value={adminForm.username} onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} />
                    <br></br>
                    <label>Password:</label>
                    <input type="password" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} />
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={handleAddAdmin}>
                      Add
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'addClass' && (
                <div>
                  <h2>Add Class</h2>
                  <form>
                    <label>Class Name:</label>
                    <input type="text" value={classForm.className} onChange={(e) => setClassForm({ ...classForm, className: e.target.value })} />
                    <br></br>
                    <label>Max Student Count:</label>
                    <input type="text" value={classForm.maxStudentCount} onChange={(e) => setClassForm({ ...classForm, maxStudentCount: e.target.value })} />
                    <br></br>
                    <button type="submit" className="btn btn-primary" onClick={handleAddClass}>
                      Add
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'addStudent' && (
                <div>
                  <h2>Add Student</h2>
                  <form>
                    <label>Student Name:</label>
                    <input type="text" value={studentForm.studentName} onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })} />
                    <br></br>
                    <label>Class Name:</label>
                    <select value={studentForm.className} onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}>
                      <option value="">Select Class</option>
                      {classList.map((classItem) => (
                        <option key={classItem._id} value={classItem.className}>
                          {classItem.className}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <label>Branch:</label>
                    <input type="text" value={studentForm.branch} onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })} />
                    <br></br>
                    <label>Phone Number:</label>
                    <input type="text" value={studentForm.phNo} onChange={(e) => setStudentForm({ ...studentForm, phNo: e.target.value })} />
                    <br></br>
                    <label>Username:</label>
                    <input type="text" value={studentForm.username} onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })} />
                    <br></br>
                    <label>Password:</label>
                    <input type="password" value={studentForm.password} onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })} />
                    <br></br>
                    <label>Date of Joining:</label>
                    <input type="date" value={studentForm.dateOfJoining} onChange={(e) => setStudentForm({ ...studentForm, dateOfJoining: e.target.value })} />
                    <br></br>
                    <button type="submit" className="btn btn-primary" onClick={handleAddStudent}>
                      Add
                    </button>
                  </form>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer>
        hbhszcb
      </footer>
    </div>
  );
};

export default IndexLogin;