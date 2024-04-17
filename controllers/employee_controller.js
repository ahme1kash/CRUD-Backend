const { response } = require('express');
const Employee = require('../models/employee_model');
// CRUD operations
// const getAllEmployees = async (req, res) => {
//     try {
//       const employees = await Employee.find();
//       console.log(employees)
//       res.json(employees);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//       console.log(error.message)
//     }

//   };
const getAllEmployees = (req,res)=>{
    Employee.find().then((employees)=>{
        res.render('index',{
            employees
        })
        //  employees.sort(function(a,b){
        //      x = a.name.toLowerCase()
        //      y = b.name.toLowerCase()
        //      val = x>y?1:-1
        //      return val
        
     
        
    }).catch((err)=>{
        console.log(err.message)
        // process.exit(1)
    })
    
}

  const getEmployeeById = async(req,res)=>{
    try{
        const employee_details = await Employee.findById(req.params.employee_id);
        res.render('createEmployee',{
            employee_details:employee_details,
            editing:true
        })

    }
    catch(err){
        res.json(err.messaage)
    }
  }
// const getEmployeeById = (req,res)=>{
//     Employee.findById(req.params.employee_id).then((employee_details)=>{
//     res.json(employee_details)
//   }).catch(err=>{
//     console.log(err.message)
//   })
//   }
const addNewEmployee = async(req,res)=>{
    try{
        const email = req.body.email
        //We can use email as well as phone for ensuring if the employee is not already stored in DB.
        // console.log(email)
        const existingEmployee = await Employee.findOne({email})
        if (existingEmployee){
            // console.log(existingUSer.name)
            return res.status(409).redirect("back");
        }
        
    const newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        mobile: req.body.mobile
    }
    )
    // console.log("Line 70",newEmployee)
    
    
    if(await newEmployee.save()){
        res.redirect('./allEmployees'); 
    }
}
    catch(err){
        console.log(err.messaage,err)
    }
}
const updateEmployee = async(req,res)=>{
    try{
        const originalEmployee = await Employee.findById(req.params.employee_id);
        console.log(originalEmployee)
        const editedEmployee = {
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            mobile: req.body.mobile
        }
        const updated = await Employee.findByIdAndUpdate(
        {_id:req.params.employee_id},
        editedEmployee,
        {new:true}  // This is important to add.
        )
        console.log(originalEmployee,updated)
        res.json(updated)
    }
    catch(err){
        console.log(err.messaage)
    }
}
  // Add other CRUD operations here (create, update, delete)

  const deleteEmployee = async(req,res)=>{
    try{
        console.log(req.params)
        const employee_removed = await Employee.findByIdAndDelete(req.params.employee_id)
        console.log(`Deleted Employee is ${employee_removed}`)
        res.redirect('back')
    }
    catch(err){
        console.log(err.message)
    }
  }
  const deleteAllEmployee=async(req,res)=>{
    try{
        // console.log("Hello")
        await  Employee.deleteMany()
        res.json("Everything deleted")
    }
    catch(err){
        res.json(err.message)
    }
  }
  const addorEditNewPage = async(req,res)=>{
    try{
        param_length = Object.keys(req.params).length
        if(param_length== 0){
        res.render('createEmployee',{
            editing:false,
            employee_details:{}
        })
    }
        else{
            console.log("137",req.params)
            getEmployeeById()
        }
        
    }
    catch(err){
        console.log(err.message)
    }
    
  }
  module.exports = {
    getAllEmployees,
    getEmployeeById,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
    deleteAllEmployee,
    addorEditNewPage,
  };
  