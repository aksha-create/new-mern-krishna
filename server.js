const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose
  .connect('mongodb+srv://krishnaias:@cluster0.dfjvgqx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Define the schema and model for the Admin collection
const adminSchema = new mongoose.Schema({
  name: String,
  classAlloted: String,
  username: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

// Define the schema and model for the Class collection
const classSchema = new mongoose.Schema({
  className: String,
  maxStudentCount: Number,
});

const Class = mongoose.model('Class', classSchema);

// Define the schema and model for the Student collection
const studentSchema = new mongoose.Schema({
  studentName: String,
  className: String,
  branch: String,
  phNo: String,
  username: String,
  password: String,
  dateOfJoining: Date,
});

const Student = mongoose.model('Student', studentSchema);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// API endpoint to add an admin
app.post('/api/admins', (req, res) => {
  const { name, classAlloted, username, password } = req.body;

  const admin = new Admin({
    name,
    classAlloted,
    username,
    password,
  });

  admin
    .save()
    .then(() => {
      console.log('Admin added:', admin);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error adding admin:', error);
      res.sendStatus(500);
    });
});

// API endpoint to add a class
app.post('/api/classes', (req, res) => {
  const { className, maxStudentCount } = req.body;

  const newClass = new Class({
    className,
    maxStudentCount,
  });

  newClass
    .save()
    .then(() => {
      console.log('Class added:', newClass);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error adding class:', error);
      res.sendStatus(500);
    });
});

// API endpoint to add a student
app.post('/api/students', (req, res) => {
  const { studentName, className, branch, phNo, username, password, dateOfJoining } = req.body;

  const student = new Student({
    studentName,
    className,
    branch,
    phNo,
    username,
    password,
    dateOfJoining,
  });

  student
    .save()
    .then(() => {
      console.log('Student added:', student);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error adding student:', error);
      res.sendStatus(500);
    });
});

//API endpoint to get classes
app.get('/api/classes', (req, res) => {
  Class.find()
    .then((classes) => {
      res.json(classes);
    })
    .catch((error) => {
      console.error('Error retrieving classes:', error);
      res.sendStatus(500);
    });
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3000');
});
