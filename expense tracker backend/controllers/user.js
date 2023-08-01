const user=require('../model/user');
exports.addUser=(req,res,next)=>{
    console.log()
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
        .catch(err=>{
            console.log('hi');console.log(err);});
    })
    .catch(err=>{res.send(err);
    console.log(typeof(err))}
   )

}