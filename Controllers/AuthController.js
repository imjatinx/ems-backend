const Department = require('../Models/departmentModel');
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// Controller object containing functionality
const authController = {
    signup: async (req, res) => {
        try {
            const { name, username, password } = req.body;

            // Validate empty fields
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
            
            // Validate existence for user
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                return res.status(200).json({ message: 'Username Already exist' })
            }

            // Validate existence for default dept.
            const newcomerDept = await Department.findOne({ name: 'newcomer' });
            if (!newcomerDept) {
                return res.status(400).json({ message: 'Default Department "newcomer" not found' });
            }

            // Encrypt the user password
            const hashedPassword = await bcrypt.hash(password, 10);

            newUser = User({ name, username, password:hashedPassword, department: newcomerDept._id });
            newUser.save()
            return res.json({ message: 'User created successfully', "user": newUser });
        } catch (error) {
            console.log('Error creating user', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate credentials for user
            const user = await User.findOne({ username })
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" })
            }

            // Sign the user data with JWT_SECRET_KEY to generate token
            jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
                return res.status(200).json({ message: 'Login Successful', token });
            })
        } catch (error) {
            console.log('Error while login', error);
            return res.status(500).json({ message: "Internal server error" });
        }

    }
}

module.exports = authController