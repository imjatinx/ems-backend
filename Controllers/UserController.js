const User = require("../Models/userModel");
const Department = require("../Models/departmentModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
    userById: async (req, res) => {
        try {
            const user = await User.findById({ _id: req.params.id }).populate('department', 'name');

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            return res.status(200).json({ user: user });
        } catch (error) {
            console.log('Error fetching User', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    employee: async (req, res) => {
        try {
            const { sort, emp } = req.query;

            let employees = '';
            // checking for filter
            if (sort != undefined) {
                let sortOption = 1; // Default: ascending order
                if (sort && sort.toLowerCase() === 'desc') {
                    sortOption = -1;
                    employees = await User.find({ role: "employee" }).sort({ location: sortOption }).populate('department', 'name');
                } else {
                    employees = await User.find({ role: "employee" }).sort({ location: sortOption }).populate('department', 'name');
                }
            }


            if (emp != undefined) {
                let sortOption = 1; // Default: ascending order
                if (emp && emp.toLowerCase() === 'desc') {
                    sortOption = -1;
                    employees = await User.find({ role: "employee" }).sort({ name: sortOption }).populate('department', 'name');
                } else {
                    employees = await User.find({ role: "employee" }).sort({ name: sortOption }).populate('department', 'name');
                }
            }

            if (sort == undefined && emp == undefined) {
                employees = await User.find({ role: "employee" }).populate('department', 'name');
            }

            return res.status(200).json({ employees: employees });
        } catch (error) {
            console.log('Error fetching employees', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    manager: async (req, res) => {
        try {
            const managers = await User.find({ role: "manager" }).populate('department', 'name');
            return res.status(200).json({ managers: managers });
        } catch (error) {
            console.log('Error fetching managers', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    profile: async (req, res) => {
        try {
            jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, data) => {
                if (error) {
                    return res.status(401).json({ message: 'Not a valid token' })
                }

                const user = await User.findById(data.user._id).populate('department', 'name');

                if (!user) {
                    return res.status(400).json({ message: 'User not found' })
                }

                return res.status(200).json({ message: "Profile found successful", profile: user })
            });
        } catch (error) {
            console.log('Error fetching profile', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    updateProfile: async (req, res) => {
        try {
            jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, data) => {
                if (error) {
                    return res.status(401).json({ message: 'Not a valid token' })
                }

                const { username, name, role, department, email, location } = req.body;

                // check the user is manager or employee
                if (data.user.role == 'manager') {
                    const profile = await User.findOne({ username })
                    if (!profile) {
                        return res.status(400).json({ message: 'User not found' });
                    }
                    profile.name = name.charAt(0).toUpperCase() + name.slice(1) || profile.name;
                    profile.email = email || profile.email;
                    profile.location = location.charAt(0).toUpperCase() + location.slice(1) || profile.location;

                    if (data.user.username == profile.username) {
                        if (role != 'manager') {
                            return res.status(400).json({ message: 'You can not change your role' })
                        }
                    }
                    profile.role = role || profile.role;

                    const departmentName = await Department.findOne({ name: department });
                    if (!departmentName) {
                        return res.status(400).json({ message: 'Department not found' });
                    }

                    profile.department = departmentName._id || profile.department;

                    profile.save();

                    return res.status(200).json({ message: 'Profile updated successfully' });
                }
                else {
                    if (data.user.username == req.body.username) {
                        // user changing own profile
                        console.log('chnaging anothers profile');
                    } else {
                        return res.status(403).json({ message: "You're not authorized" })

                    }
                }
            });
        } catch (error) {
            console.log('Error fetching profile', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, username, password, department, role, email, location } = req.body;

            // Validate empty fields
            if (!name || !username || !password || !department || !role || !email || !location) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            let formattedUsername = username.toLowerCase();

            // Validate existence for user
            const existingUser = await User.findOne({ formattedUsername })
            if (existingUser) {
                return res.status(409).json({ message: 'Username Already exist' })
            }

            const newcomerDept = await Department.findOne({ name: department });
            if (!newcomerDept) {
                return res.status(400).json({ message: 'Department not found' });
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
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById({ _id: req.params.id });
            if (req.user.username == user.username) {
                return res.status(409).json({ message: 'You can not delete youself' });
            }
            const deleteUser = await User.deleteOne({ _id: req.params.id });
            if (!deleteUser) {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.log('Error deleting user', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

module.exports = userController;