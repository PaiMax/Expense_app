const expense=require('../model/expense');
const jwt=require('jsonwebtoken');

exports.addexpense=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log('token iss======================='+token);
    const amount=req.body.amount1;
    const des=req.body.dis;
    const category=req.body.category;

    const user=jwt.verify(token,'758478734eeh48734894ye784788232hwi88y42');

    expense.create({
        amount:amount,
        description:des,
        category:category,
        userId:user.userId

    })
    .then(result=>{
        expense.findByPk(result.id,{ attributes : ['id','amount','description','category']})
        .then((expense)=>res.send(expense))
        .catch(err=>console.log(err));
    })
    .catch(err=>{console.log(err)
    res.status(500).send({ message: 'An error occurred while adding the expense.' })});

}




exports.removeexpense=(req,res,next)=>{
    const idTodelete=req.params.id;
    expense.destroy({where: {id:idTodelete }})
    .then(data=>{console.log("deleted");res.send("deleted successful")})
    .catch(errr=>console.log(errr));
}



exports.updateexpense=(req,res,next)=>{
    const IdToUpdate=req.params.id;
    console.log(IdToUpdate);
    const dataToUpdate=req.body;
    console.log(dataToUpdate);
    expense.update({
        amount:dataToUpdate.amount1,
        description:dataToUpdate.dis,
        category:dataToUpdate.category
    },
    {where:{id:IdToUpdate}}
    )
    .then(result=>{console.log('successfully updated'); res.send("updated")})
    .catch(err=>console.log(err));

}


exports.getexpense=(req,res,next)=>{
    console.log("helllo i am in get===="+req.user.id);
    expense.findAll({where:{userId:req.user.id},attributes:['id','amount','description','category']})
    .then(user=>{
        console.log('users are====='+user)
        res.send(user);
    })
    .catch(err=>console.log(err));
}