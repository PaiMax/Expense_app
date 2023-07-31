const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const app=express();


const expenseRoutes=require('./routes/expenseroute');
const userRoutes=require('./routes/user');
var cors=require('cors');
app.use(cors());
app.use(bodyParser.json({extended:false}));


app.use('/user',userRoutes);


app.use(expenseRoutes);




sequelize
.sync()
.then(result=>{console.log(result); app.listen(3000);})
.catch(err=> console.log(err));

