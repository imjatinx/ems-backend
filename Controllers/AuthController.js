const Department = require('../Models/departmentModel');
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// Controller object containing functionality
const authController = {
    signup: async (req, res) => {
        try {
            const { name, username, password, email, location, role } = req.body;

            // Validate empty fields
            if (!name || !username || !password || !email || !location || !role) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            let formattedUsername = username.toLowerCase();

            // Validate existence for user
            const existingUser = await User.findOne({ formattedUsername })
            if (existingUser) {
                return res.status(409).json({ message: 'Username Already exist' })
            }

            const { department } = req.body;
            let newcomerDept = ''
            if (department === undefined) {
                // Validate existence for default dept. and add the user to the department
                newcomerDept = await Department.findOne({ name: 'Newcomer' });
                if (!newcomerDept) {
                    Department.createDefaultDepartment();
                    newcomerDept = await Department.findOne({ name: 'Newcomer' });
                    // return res.status(400).json({ message: 'Default Department "Newcomer" not found' });
                }
            } else {
                newcomerDept = await Department.findOne({ name: department });
                if (!newcomerDept) {
                    return res.status(400).json({ message: 'Department not found' });
                }
            }
            
            // Encrypt the user password
            const hashedPassword = await bcrypt.hash(password, 10);

            let formattedName = name.charAt(0).toUpperCase() + name.slice(1)
            let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1)

            newUser = User({ name:formattedName, username:formattedUsername, password: hashedPassword, email, location:formattedLocation, department: newcomerDept._id, role });
            newUser.save()
            return res.status(201).json({ message: 'User created successfully', "user": newUser });
        } catch (error) {
            console.log('Error creating user', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate empty fields
            if (!username || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

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

    },
    welcome: async (req, res) => {
        return res.status(200).json({ message: 'Try "/login" to login and "/signup" to register' });
    }
}

module.exports = authController