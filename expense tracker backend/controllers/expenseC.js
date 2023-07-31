const expense=require('../model/expense');

exports.addexpense=(req,res,next)=>{
    console.log(req.body);
    const amount=req.body.amount1;
    const des=req.body.dis;
    const category=req.body.category;

    expense.create({
        amount:amount,
        description:des,
        category:category

    })
    .then(result=>{
        expense.findByPk(result.id,{ attributes : ['id','amount','description','category']})
        .then((expense)=>res.send(expense))
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));

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
    expense.findAll({attributes:['id','amount','description','category']})
    .then(user=>{
        res.send(user);
    })
    .catch(err=>console.log(err));
}