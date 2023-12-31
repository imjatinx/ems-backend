const Department = require('../Models/departmentModel')
const User = require('../Models/userModel');

const deptController = {
    list: async (req, res) => {
        try {
            deptList = await Department.find();
            return res.status(200).json({ departments: deptList })
        } catch (error) {
            console.log('Error fetching departments', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    getDeptById: async (req, res) => {
        try {
            const getById = await Department.findById(req.params.id);

            if (!getById) {
                return res.status(400).json({ message: "Department not found" })
            }

            return res.status(200).json({ department: getById })

        } catch (error) {
            console.log('Error finding department', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    create: async (req, res) => {
        try {
            const { name } = req.body;

            // Validate empty fields
            if (!name) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            
            const is_exist = await Department.findOne({ name })
            if (is_exist) {
                return res.status(409).json({ message: 'Department already exist' })
            }

            let formattedDept = name.charAt(0).toUpperCase() + name.slice(1)
            const newDept = await Department({ name:formattedDept });
            newDept.save();
            return res.status(201).json({ message: 'Department created successfully', "Department": newDept })
        } catch (error) {
            console.log('Error creating department', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body;
            const validateDept = await Department.findOne({_id: req.params.id});

            if (validateDept.name === 'Newcomer') {
                return res.status(403).json({ message: 'Default department can not be updated' })
            }

            let formattedDept = name.charAt(0).toUpperCase() + name.slice(1)

            const updateDept = await Department.findByIdAndUpdate(req.params.id, {name:formattedDept});

            if (!updateDept) {
                return res.status(400).json({ message: 'Department not found' })
            }

            return res.status(200).json({ message: 'Department updated successfully', department: updateDept });
        } catch (error) {
            console.log('Error updating department', error);
            return res.json({ message: 'Internal server error' });
        }
    },
    delete: async (req, res) => {
        try {
            const validateDept = await Department.findOne({_id: req.params.id});
            const validateUser = await User.findOne({username: req.user.username}).populate('department', 'name');

            if (validateUser.department.name === validateDept.name){
                return res.status(403).json({ message: "You can not delete associate department." })
            }

            const deleteDept = await Department.findByIdAndDelete(req.params.id)

            if (!deleteDept) {
                return res.status(400).json({ message: "Department not found" })
            }

            await User.deleteMany({department:deleteDept._id})

            return res.status(200).json({ message: 'Department and associated employees deleted successfully', department: deleteDept });

        } catch (error) {
            console.log('Error deleting department', error);
            return res.json({ message: 'Internal server error' });
        }
    }
}

module.exports = deptController;