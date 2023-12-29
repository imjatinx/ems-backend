const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['employee', 'manager'],
        default: 'employee'
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required:false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;

