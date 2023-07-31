const user=require('../model/user');
exports.addUser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    user.create({
        name:name,
        email:email,
        password:password

    })
    .then(result=>{
        user.findByPk(result.id,{ attributes : ['id','name','email','password']})
        .then((user)=>res.send(user))
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));

}