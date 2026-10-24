# ICTAK Case Study 2 - Employee Dashboard Backend

> 🌐 **Live Website Link**: [https://mehabin225072.github.io/employee-dashboard-backend/](https://mehabin225072.github.io/employee-dashboard-backend/)  
> 📦 **GitHub Repository**: [https://github.com/mehabin225072/employee-dashboard-backend](https://github.com/mehabin225072/employee-dashboard-backend)

---

## Student Details
- **Student Name**: Najva Mehabin E
- **Institution**: Sahrdaya College of Engineering and Technology
- **Course**: Full Stack Application Development with ReactJS
- **Assignment**: Case Study 2 - Employee Dashboard Backend

---

## Completed Tasks Overview

### Task 1: Express App Initialization & Server Setup
- Initialized Express application.
- Configured essential middlewares: `cors`, `express.json()`, and `express.urlencoded({ extended: true })`.
- Mounted static Angular frontend assets located in `dist/Frontend`.
- Set server to listen on port `3000`.

### Task 2: MongoDB Connection & Mongoose Modeling
- Connected to cloud MongoDB Atlas (`employee_dashboard` database).
- Created strongly typed `Employee` schema and model with fields:
  - `name` (String, required)
  - `location` (String, required)
  - `position` (String, required)
  - `salary` (Number, required)

### Task 3: REST API Implementation with Error Handling
- `GET /api/employeelist` & `GET /employeelist`: Retrieves complete employee list sorted by latest first.
- `GET /api/employeelist/:id` & `GET /employeelist/:id`: Retrieves single employee by ID with ID format validation.
- `POST /api/employeelist` & `POST /employeelist`: Adds new employee document to the database.
- `DELETE /api/employeelist/:id` & `DELETE /employeelist/:id`: Deletes employee by ID.
- `PUT /api/employeelist` & `PUT /employeelist`: Updates existing employee details by ID.
- Fallback route `/*`: Serves `dist/Frontend/index.html` for single-page Angular client routing.

---

## How to Run Locally

1. Open terminal inside project directory:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   node app.js
   ```

3. Open your browser at:
   ```
   http://localhost:3000
   ```
