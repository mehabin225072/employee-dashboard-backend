// Task1: initiate app and run server at 3000
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));
app.use(express.static(path.join(__dirname, 'dist', 'FrontEnd')));

// Task2: create mongoDB connection 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://najva225072_db_user:nechu1234@cluster0.pqqfir7.mongodb.net/employee_dashboard?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully to Employee Dashboard database');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
    });

// Employee Schema & Model
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ success: false, message: 'Failed to retrieve employee list', error: error.message });
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
        }

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching single employee:', error.message);
        res.status(500).json({ success: false, message: 'Failed to retrieve employee', error: error.message });
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;

        if (!name || !location || !position || salary === undefined || salary === null) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields (name, location, position, salary) are required' 
            });
        }

        const newEmployee = new Employee({
            name: name.trim(),
            location: location.trim(),
            position: position.trim(),
            salary: Number(salary)
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create employee', error: error.message });
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.status(200).json({ success: true, message: 'Employee deleted successfully', data: deletedEmployee });
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        res.status(500).json({ success: false, message: 'Failed to delete employee', error: error.message });
    }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        // Can receive ID from req.body._id, req.body.id, or query parameter
        const id = req.body._id || req.body.id || req.query.id;
        const { name, location, position, salary } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Employee _id is required for update' });
        }

        const updateData = {};
        if (name) updateData.name = name.trim();
        if (location) updateData.location = location.trim();
        if (position) updateData.position = position.trim();
        if (salary !== undefined && salary !== null) updateData.salary = Number(salary);

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found to update' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update employee', error: error.message });
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Run server at port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
