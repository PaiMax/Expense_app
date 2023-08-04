const express=require('express');
 
const router=express.Router();

const userController=require('../controllers/user');
const authMiddleware=require('../middleware/auth');

router.post('/signup',userController.addUser);

router.post('/login',userController.checkUser);


//router.get('/getuser',authMiddleware.authentication,userController.getuser);
module.exports=router;

