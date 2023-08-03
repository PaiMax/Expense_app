const express=require('express');
const router=express.Router();
const expenseController=require('../controllers/premium');

router.get('/showleaderboard',expenseController.showleader);

module.exports=router;