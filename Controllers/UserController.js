const User = require("../Models/userModel");

const userController = {
    list: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json({ users: users });
        } catch (error) {
            console.log('Error fetching employees', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    employee: async (req, res) => {
        try {
            const employees = await User.find({ role: "employee" });
            return res.status(200).json({ employees: employees });
        } catch (error) {
            console.log('Error fetching employees', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    employeeById: async (req, res) => {
        try {
            const employeeById = await User.findOne({ _id: req.params.id, role: 'employee'});
            return res.status(200).json({ user: employeeById });
        } catch (error) {
            console.log('Error fetching employees', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    manager: async (req, res) => {
        try {
            const managers = await User.find({ role: "manager" });
            return res.status(200).json({ managers: managers });
        } catch (error) {
            console.log('Error fetching managers', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    managerById: async (req, res) => {
        try {
            const managerById = await User.findOne({ _id: req.params.id, role: 'manager' });
            return res.status(200).json({ user: managerById });
        } catch (error) {
            console.log('Error fetching managers', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = userController;