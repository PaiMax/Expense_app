const jwt=require('jsonwebtoken');
const User=require('../model/user');

const authentication=(req,res,next)=>{
    const token=req.header('Authorization');
    const user=jwt.verify(token,'758478734eeh48734894ye784788232hwi88y42');
    console.log('userId======'+user.userId);
    User.findByPk(user.userId)
    .then((user)=>{
        console.log(user);
        req.user=user.dataValues;
        next();
    })
    .catch((err)=>{console.log(err)
    res.status(401).json({success:false})});




}
module.exports={authentication};
