import express from 'express';
import { upload } from '../upload.js';
import { addPost,getPosts,updatePost,deletePost,getImageById } from '../Controller/postController.js';
import passport from '../passport.js';


const postRouter = express.Router()

postRouter.post('/',passport.authenticate('jwt', { session: false }),
                upload.single('image'),addPost)

postRouter.get('/',getPosts)

postRouter.patch('/:id',updatePost)

postRouter.delete('/:id',deletePost)

postRouter.get('/images/:id',getImageById)

export default postRouter