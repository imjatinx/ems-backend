const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    }

})

// Creating a default Department for new comers.
departmentSchema.statics.createDefaultDepartment = async function () {
  const existingDepartment = await this.findOne({ name: 'Newcomer' });

  if (!existingDepartment) {
    const defaultDepartment = new this({ name: 'Newcomer' });
    await defaultDepartment.save();
  }
};

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department;