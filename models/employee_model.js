const mongoose = require("mongoose")
const employee_schema = new mongoose.Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city:{
        type:String
    }


}, { versionKey: false }) // versionKey:false removes the __v:0 from mongo documents
module.exports = mongoose.model('employees',employee_schema)