const express = require('express');
const router = express.Router();
const students = require('../data/students');

// Helper function to validate student input
const isValidStudent = (name, age, course) => {
  if (
    !name ||
    typeof name !== 'string' ||
    name.trim() === '' ||
    age === undefined ||
    age === null ||
    isNaN(Number(age)) ||
    Number(age) <= 0 ||
    !course ||
    typeof course !== 'string' ||
    course.trim() === ''
  ) {
    return false;
  }
  return true;
};

// 1. GET /students - Return all students
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: students
  });
});

// 2. GET /students/:id - Return a single student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST /students - Add a new student
router.post('/', (req, res) => {
  const { name, age, course } = req.body;

  if (!isValidStudent(name, age, course)) {
    return res.status(400).json({
      error: 'Name, age and course are required'
    });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name: name.trim(),
    age: Number(age),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

// 4. PUT /students/:id - Update an existing student
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  const { name, age, course } = req.body;

  if (!isValidStudent(name, age, course)) {
    return res.status(400).json({
      error: 'Name, age and course are required'
    });
  }

  students[studentIndex] = {
    id: studentId,
    name: name.trim(),
    age: Number(age),
    course: course.trim()
  };

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: students[studentIndex]
  });
});

// 5. DELETE /students/:id - Delete an existing student
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully'
  });
});

module.exports = router;
