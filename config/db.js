const mongoose = require('mongoose')
require('dotenv').config()
// console.log(process.env.MONGO_URI) // MonngoDB connection string
connect = async  ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
    });
    console.log("Connection with MongoDB established successfully.")
    }
    catch(error){
        console.log(error.message,'Connection Unsuccessful');
        process.exit(1);
    }
}
connect()
module.exports = connect;