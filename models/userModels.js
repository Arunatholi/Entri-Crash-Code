import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email:String,
    password:String,
    createdAt:Date
  });

  const User = mongoose.model('users', userSchema);

  export default User;