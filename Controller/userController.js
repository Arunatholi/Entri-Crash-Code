import User from "../models/userModels.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const addUser = async(req,res)=>{

    try {

        const saltRounds = 10;

     bcrypt.hash(req.body.password, saltRounds,async(err, hash)=> {
          if (err) {
            console.error("error hashing password:",err);
            res.status(500).json({error:"internal error"})
         
          }
        
            var userItem = {
              name : req.body.name,
              username : req.body.username,
              email : req.body.email,
              password : hash,
              createdAt:new Date()
           }
              var user = new User(userItem)
               await user.save()
               res.status(201).json(user)
      })  
    

    
  
    } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal error"})
    }

}

const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(500).json({message:"User not found"})
        }

        const isValid = await bcrypt.compare(password, user.password)
        console.log(isValid);

        if (!isValid){
            return res.status(500).json({message:"Invalid credentials"})
        }

        let payload = {user:email, password:password}
        const secret_key =process.env.JWT_SECRET_KEY
        let token = jwt.sign(payload,secret_key)

        res.status(200).json({message:"Success",token:token})



    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"})
    }
}

const getUsers = async (req,res)=>{
    try {
        
       const users = await User.find({})
       if(!users){
        res.status(404).json({error:"User not found"})
       }
       res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"})
    }
}

const getUserByUsername = async (req,res)=>{
    try {
        
       
        const user = await User.findOne({ username:req.params.username }).exec();
        if(!user){
         res.status(404).json({error:"User not found"})
        }
        res.status(200).json(user)
     } catch (error) {
         console.log(error);
         res.status(500).json({error:"internal error"})
     }
}

const updateUserbyId = async (req,res)=>{
    try {
        
       
       const user = await User.findByIdAndUpdate(req.params.id,req.body, {new:true}).exec();
       if(!user){
        res.status(404).json({error:"User not found"})
       }
       res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"})
    }
}

const deleteUser  = async (req,res)=>{
    try {
        
       
       const user = await User.findByIdAndDelete(req.params.id );
       if(!user){
        res.status(404).json({error:"User not found"})
       }
       res.status(200).json({message:"User deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"})
    }
}




export {getUsers,getUserByUsername,addUser,updateUserbyId,deleteUser,login}