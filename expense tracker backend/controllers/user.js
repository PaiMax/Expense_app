const user=require('../model/user');
const bcrypt=require('bcrypt');
exports.addUser=async(req,res,next)=>{
    try{
        
    
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
         

        bcrypt.hash(password,10,async(err,hash)=>{
            console.log(err);
           try{await  user.create({
            name:name,
            email:email,
            password:hash
    
        })
        res.status(201).json({message:'Successfully create new user'});
    }
    catch(err){res.send(err);}
        })
    
    
    
    
    
       
        //.then(result=>{
            //user.findByPk(result.id,{ attributes : ['id','name','email','password']})
            //.then((user)=>res.send(user))
            //.catch(err=>{
                //console.log('hi');console.log(err);});
        //})
        

    //}
    
   

}
catch(err){console.log(err); res.send(err.data)};}



exports.checkUser=(req,res,next)=>{
    console.log(req.body.email);
    user.findOne({where:{email:req.body.email}  })
    .then((user)=>{ 
        if(user){

            bcrypt.compare(req.body.password,user.password,(err,re)=>{
                if(!err){
                    res.send('User login Successful');
                }
                else{
                    res.send("Password doen'nt match");

                }

            })
            

            
        }
        else{
            res.send("User does'nt exist");
        }
       
     })
    .catch((err)=>{console.log(err)});
    

}