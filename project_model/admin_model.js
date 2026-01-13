const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Please Enter Your name"]
        },
        email:{
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true
        },
        password:{
            type: String,
            required:[true, "Please Enter Your Password"]
        }   
    },
    {timestamps: true}
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin