const user=require('../model/user');
const expense=require('../model/expense');
const Sequelize=require('sequelize');

exports.showleader=(req,res,next)=>{
    const leaders=[];
    expense.findAll({attributes:['userId',[Sequelize.fn('SUM',Sequelize.col('amount')),'totalamount']],group:'userId'})
    .then(result=>{
        console.log(result);
        
        const promises=result.map(r=>{
            return user.findByPk(r.userId,{attributes:['name']})
            .then(user=>{  console.log("name===="+r.dataValues.totalamount);return({name:user.dataValues.name,amount:r.dataValues.totalamount})})
            .catch(err=>console.log(err));
        })
        console.log("hiiii leader");
        Promise.all(promises)
        .then((data)=>res.json(data))
        .catch((err)=>console.log(err));
        
    
    })
    .catch(err=>console.log(err));


}