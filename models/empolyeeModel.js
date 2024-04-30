import mongoose from "mongoose";



const employeeSchema = new mongoose.Schema({
    name: String,
    age:Number,
    rank:String
    
  });

  const Employee = mongoose.model('employees', employeeSchema);
//   Employee.collection.createIndex({name:1},{unique:true});

  export default Employee;