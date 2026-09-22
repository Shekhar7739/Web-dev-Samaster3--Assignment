# Student Management REST API

## Description
The **Student Management REST API** is a simple, lightweight backend application built using **Node.js** and **Express.js**. It provides a clean RESTful interface to perform full **CRUD** (Create, Read, Update, Delete) operations on student records. The application utilizes modular routing, custom logging middleware, in-memory data storage, and consistent JSON error handling with standard HTTP status codes.

---

## Technologies Used
- **Node.js** (JavaScript Runtime Environment)
- **Express.js** (Fast, minimalist web framework for Node.js)
- **Postman** (API testing and development tool)

---

## Project Structure

```text
Assignment2/
│
├── app.js                   # Main Express application & server entry point
│
├── routes/
│   └── studentRoutes.js     # Modular router containing all /students CRUD endpoints
│
├── middleware/
│   └── logger.js            # Custom logging middleware (Method, URL, Timestamp)
│
├── data/
│   └── students.js          # In-memory JavaScript array storing sample student records
│
├── package.json             # Project configuration, scripts, and dependencies
│
└── README.md                # Comprehensive documentation and testing guide
```

### Explanation of Files and Folders:
- **`app.js`**: Initializes the Express app, applies body-parsing middleware (`express.json()`), registers the custom logger middleware, mounts `/students` routes, defines fallback 404 and global 500 error handlers, and starts the server on port `3000`.
- **`routes/studentRoutes.js`**: Defines the modular CRUD routes (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`), input validation, and corresponding JSON responses.
- **`middleware/logger.js`**: Intercepts every incoming HTTP request and logs the HTTP method, requested URL, and an ISO timestamp to the console before invoking `next()`.
- **`data/students.js`**: Exports an in-memory array containing initial student records. Acts as the in-memory data store during runtime.
- **`package.json`**: Manages project metadata, npm dependencies (`express`), and execution scripts (`npm start`).
- **`README.md`**: Complete documentation covering setup, usage, API endpoints, and Postman testing instructions.

---

## Requirements
Ensure you have the following installed on your machine:
1. **Node.js** (v16.x or later recommended)
2. **npm** (Node Package Manager, comes bundled with Node.js)
3. **Postman** (Desktop application or web agent for API testing)

### Verify Installation
Open your terminal (PowerShell, Command Prompt, or Bash) and run:
```bash
node -v
npm -v
```
If both commands print version numbers (e.g., `v20.x.x` and `10.x.x`), you are ready to proceed.

---

## Installation Steps

Follow these step-by-step instructions:

1. **Open your terminal** and navigate into the project directory:
   ```bash
   cd Assignment2
   ```
2. **Install required dependencies**:
   ```bash
   npm install
   ```
3. **Start the server**:
   ```bash
   npm start
   ```
4. **Confirm the server is running**:
   You should see the following console message:
   ```text
   Server is running on http://localhost:3000
   ```
5. **Open Postman** to begin testing the endpoints.

---

## Running the Project

### Command:
```bash
npm start
```

### Expected Output:
```text
Server is running on http://localhost:3000
```
When requests are made, the logger middleware will print output like:
```text
GET /students - 2026-09-25T14:30:00.000Z
```

---

## API Documentation

| Method | Endpoint | Purpose | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/students` | Get all students | `200 OK` |
| **GET** | `/students/:id` | Get a single student by ID | `200 OK` / `404 Not Found` |
| **POST** | `/students` | Create a new student | `201 Created` / `400 Bad Request` |
| **PUT** | `/students/:id` | Update an existing student | `200 OK` / `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/students/:id` | Delete a student by ID | `200 OK` / `404 Not Found` |

---

## Postman Testing Guide

Open Postman and create a new collection or test the following requests one by one:

### 1. Get All Students
- **Method**: `GET`
- **URL**: `http://localhost:3000/students`
- **Expected Status**: `200 OK`
- **Expected Response Body**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Rahul",
      "age": 20,
      "course": "BCA"
    },
    {
      "id": 2,
      "name": "Priya",
      "age": 21,
      "course": "BTech"
    },
    {
      "id": 3,
      "name": "Amit",
      "age": 20,
      "course": "BCA"
    }
  ]
}
```

---

### 2. Get Student by ID
- **Method**: `GET`
- **URL**: `http://localhost:3000/students/1`
- **Expected Status**: `200 OK`
- **Expected Response Body**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rahul",
    "age": 20,
    "course": "BCA"
  }
}
```

#### Error Case (Non-existing ID):
- **URL**: `http://localhost:3000/students/99`
- **Expected Status**: `404 Not Found`
- **Response**:
```json
{
  "error": "Student not found"
}
```

---

### 3. Create Student
- **Method**: `POST`
- **URL**: `http://localhost:3000/students`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select **Body** → **raw** → Choose **JSON** from the dropdown:
```json
{
  "name": "Neha",
  "age": 20,
  "course": "BCA"
}
```
- **Expected Status**: `201 Created`
- **Expected Response Body**:
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": 4,
    "name": "Neha",
    "age": 20,
    "course": "BCA"
  }
}
```

#### Error Case (Missing Required Field):
- **Body**:
```json
{
  "name": "Neha"
}
```
- **Expected Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Name, age and course are required"
}
```

---

### 4. Update Student
- **Method**: `PUT`
- **URL**: `http://localhost:3000/students/1`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select **Body** → **raw** → Choose **JSON**:
```json
{
  "name": "Rahul Kumar",
  "age": 21,
  "course": "BCA AI & DS"
}
```
- **Expected Status**: `200 OK`
- **Expected Response Body**:
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "Rahul Kumar",
    "age": 21,
    "course": "BCA AI & DS"
  }
}
```

#### Error Cases:
- **Non-existing ID (`PUT /students/99`)**: Status `404 Not Found`
  ```json
  {
    "error": "Student not found"
  }
  ```
- **Missing or Invalid Fields (`PUT /students/1` with `{ "name": "" }`)**: Status `400 Bad Request`
  ```json
  {
    "error": "Name, age and course are required"
  }
  ```

---

### 5. Delete Student
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/students/1`
- **Expected Status**: `200 OK`
- **Expected Response Body**:
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

#### Error Case (Non-existing ID):
- **URL**: `http://localhost:3000/students/99`
- **Expected Status**: `404 Not Found`
- **Response**:
```json
{
  "error": "Student not found"
}
```

---

## Error Handling
The application returns standardized JSON responses and uses appropriate HTTP status codes:
- **`200 OK`**: Request succeeded (e.g., retrieving, updating, or deleting a student).
- **`201 Created`**: New resource successfully created via `POST`.
- **`400 Bad Request`**: Client sent incomplete or invalid data in the request body.
  ```json
  {
    "error": "Name, age and course are required"
  }
  ```
- **`404 Not Found`**: The requested student ID or endpoint does not exist.
  ```json
  {
    "error": "Student not found"
  }
  ```
- **`500 Internal Server Error`**: Catches unhandled server errors safely without leaking internal stack traces.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

---

## Middleware Explanation
Middleware functions in Express have access to the request (`req`), response (`res`), and the `next` function in the application's request-response cycle.

This project implements a **Custom Logger Middleware** in `middleware/logger.js`:
```javascript
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${req.method} ${req.originalUrl || req.url} - ${timestamp}`);
  next();
};

module.exports = logger;
```
- **Purpose**: Tracks every incoming request for auditing and debugging.
- **`next()`**: Passes control to the subsequent middleware or route handler. If omitted, the request would hang.

---

## CRUD Explanation

CRUD corresponds directly to HTTP REST methods:
- **C - Create**: Handled via `POST /students` (Adds a new student record to the collection).
- **R - Read**: Handled via `GET /students` (Reads all students) and `GET /students/:id` (Reads one student by ID).
- **U - Update**: Handled via `PUT /students/:id` (Updates an existing student's data).
- **D - Delete**: Handled via `DELETE /students/:id` (Removes a student from the collection).

---

## Important Note
- **In-Memory Storage Only**: This project uses a native JavaScript array stored in memory (`data/students.js`) and **does NOT use any database** (No MongoDB, MySQL, Mongoose, etc.).
- **Data Persistence**: Because data is stored in memory, all modifications (created, updated, or deleted students) will **reset to initial sample data whenever the Node.js server restarts**.
