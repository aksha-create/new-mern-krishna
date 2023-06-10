import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
  const [classNames, setClassNames] = useState([]);
  const [addClassFormData, setAddClassFormData] = useState({ className: '', classSize: '' });
  const [addAdminFormData, setAddAdminFormData] = useState({ username: '', name: '', password: '', classAlloted: '' });
  const [addStudentFormData, setAddStudentFormData] = useState({ rollNumber: '', name: '', branch: '', sec: '', username: '', password: '' });

  // Fetch existing class names from the database
  useEffect(() => {
    axios.get('/api/classes')
      .then(response => {
        setClassNames(response.data);
      })
      .catch(error => {
        console.error('Error fetching class names:', error);
      });
  }, []);

  // Handle form submission for adding a class
  const handleAddClassSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/classes', addClassFormData)
      .then(response => {
        console.log('Class added successfully');
        // Clear the form data
        setAddClassFormData({ className: '', classSize: '' });
      })
      .catch(error => {
        console.error('Error adding class:', error);
      });
  };

  // Handle form submission for adding an admin
  const handleAddAdminSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/admins', addAdminFormData)
      .then(response => {
        console.log('Admin added successfully');
        // Clear the form data
        setAddAdminFormData({ username: '', name: '', password: '', classAlloted: '' });
      })
      .catch(error => {
        console.error('Error adding admin:', error);
      });
  };

  // Handle form submission for adding a student
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/students', addStudentFormData)
      .then(response => {
        console.log('Student added successfully');
        // Clear the form data
        setAddStudentFormData({ rollNumber: '', name: '', branch: '', sec: '', username: '', password: '' });
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div>
      {/* Header */}
      <header>
        {/* Header content */}
      </header>

      {/* Sidebar */}
      <aside>
        {/* Sidebar content */}
        <ul>
          <li className="active">Add Class</li>
          <li>Add Admin</li>
          <li>Add Student</li>
          <li>View Classes</li>
        </ul>
      </aside>

      {/* Main content */}
      <main>
        {/* Add Class Form */}
        <form onSubmit={handleAddClassSubmit}>
          <h3>Add Class</h3>
          <div>
            <label htmlFor="className">Class Name:</label>
            <input type="text" id="className" value={addClassFormData.className} onChange={e => setAddClassFormData({ ...addClassFormData, className: e.target.value })} />
          </div>
          <div>
            <label htmlFor="classSize">Class Size:</label>
            <input type="number" id="classSize" value={addClassFormData.classSize} onChange={e => setAddClassFormData({ ...addClassFormData, classSize: e.target.value })} />
          </div>
          <button type="submit">Add Class</button>
        </form>

        {/* Add Admin Form */}
        <form onSubmit={handleAddAdminSubmit}>
          <h3>Add Admin</h3>
          <div>
            <label htmlFor="adminUsername">Username:</label>
            <input type="text" id="adminUsername" value={addAdminFormData.username} onChange={e => setAddAdminFormData({ ...addAdminFormData, username: e.target.value })} />
          </div>
          <div>
            <label htmlFor="adminName">Name:</label>
            <input type="text" id="adminName" value={addAdminFormData.name} onChange={e => setAddAdminFormData({ ...addAdminFormData, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="adminPassword">Password:</label>
            <input type="password" id="adminPassword" value={addAdminFormData.password} onChange={e => setAddAdminFormData({ ...addAdminFormData, password: e.target.value })} />
          </div>
          <div>
            <label htmlFor="classAlloted">Class Alloted:</label>
            <select id="classAlloted" value={addAdminFormData.classAlloted} onChange={e => setAddAdminFormData({ ...addAdminFormData, classAlloted: e.target.value })}>
              <option value="">Select Class</option>
              {/* Render the class options from classNames state */}
              {classNames.map((className, index) => (
                <option key={index} value={className}>{className}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Admin</button>
        </form>

        {/* Add Student Form */}
        <form onSubmit={handleAddStudentSubmit}>
          <h3>Add Student</h3>
          <div>
            <label htmlFor="rollNumber">Roll Number:</label>
            <input type="text" id="rollNumber" value={addStudentFormData.rollNumber} onChange={e => setAddStudentFormData({ ...addStudentFormData, rollNumber: e.target.value })} />
          </div>
          <div>
            <label htmlFor="studentName">Name:</label>
            <input type="text" id="studentName" value={addStudentFormData.name} onChange={e => setAddStudentFormData({ ...addStudentFormData, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="studentBranch">Branch:</label>
            <input type="text" id="studentBranch" value={addStudentFormData.branch} onChange={e => setAddStudentFormData({ ...addStudentFormData, branch: e.target.value })} />
          </div>
          <div>
            <label htmlFor="studentSec">Sec:</label>
            <input type="text" id="studentSec" value={addStudentFormData.sec} onChange={e => setAddStudentFormData({ ...addStudentFormData, sec: e.target.value })} />
          </div>
          <div>
            <label htmlFor="studentUsername">Username:</label>
            <input type="text" id="studentUsername" value={addStudentFormData.username} onChange={e => setAddStudentFormData({ ...addStudentFormData, username: e.target.value })} />
          </div>
          <div>
            <label htmlFor="studentPassword">Password:</label>
            <input type="password" id="studentPassword" value={addStudentFormData.password} onChange={e => setAddStudentFormData({ ...addStudentFormData, password: e.target.value })} />
          </div>
          <button type="submit">Add Student</button>
        </form>

        {/* View Classes */}
        <div>
          <h3>View Classes</h3>
          {/* Render class cards from classNames state */}
          {classNames.map((className, index) => (
            <div key={index} className="class-card">
              <h4>{className}</h4>
              {/* Fetch and render admin and student data for the current class */}
              {/* You need to write code to fetch and display admin and student data */}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default SuperAdmin;