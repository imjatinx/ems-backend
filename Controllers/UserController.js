const User = require("../Models/userModel");
const jwt = require('jsonwebtoken')

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
            const employeeById = await User.findOne({ _id: req.params.id, role: 'employee' });
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
    },
    profile: async (req, res) => {
        try {
            jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, data) => {
                if (error) {
                    return res.status(500).json({ message: 'Not a valid token' })
                }

                const user = await User.findById(data.user._id).populate('department', 'name');
                return res.status(200).json({ message:"Profile found successful", profile: user })
            });
        } catch (error) {
            console.log('Error fetching profile', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = userController;