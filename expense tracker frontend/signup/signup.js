//const { default: axios } = require("axios");
//const axios = require('axios');

document.getElementById('btn').addEventListener('click',addUser);
const name=document.getElementById('name');
const email=document.getElementById('email');
const password=document.getElementById('password');

function addUser(event){
    event.preventDefault();
   axios.post('http://localhost:3000/user/signup',{name:name.value,email:email.value,password:password.value})
   .then((res)=>console.log(res))
   .catch(err=>console.log(err));
    

} 
