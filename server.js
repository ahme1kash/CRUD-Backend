require('dotenv').config()
require('./config/db');
const express = require('express')
// const methodOverride = require('method-override');
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
// const flash = require('connect-flash'); 
// app.use(flash()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride('_method'));
app.set(path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use('/public', express.static(path.join(__dirname, 'public')));
const employeeRoutes = require('./routers/employee_router');
app.use('/employees', employeeRoutes);
try{
    const port = process.env.PORT
    app.listen(port,()=>{  
      console.log(`Server is up and running at port ${port}`)

})

}
catch(err){
    console.log(err.message)
}