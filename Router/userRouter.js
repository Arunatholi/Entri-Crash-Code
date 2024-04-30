import express from 'express'
const userRouter = express.Router()
import { login,getUsers,getUserByUsername,addUser,updateUserbyId,deleteUser } from '../Controller/userController.js'

userRouter.get('/',getUsers)
userRouter.get('/username/:username',getUserByUsername)
userRouter.post('/',addUser)
userRouter.post('/login',login)
userRouter.patch('/:id',updateUserbyId)
userRouter.delete('/:id',deleteUser)




export default userRouter