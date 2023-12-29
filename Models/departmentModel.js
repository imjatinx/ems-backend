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
  const existingDepartment = await this.findOne({ name: 'newcomer' });

  if (!existingDepartment) {
    const defaultDepartment = new this({ name: 'newcomer' });
    await defaultDepartment.save();
  }
};

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department;