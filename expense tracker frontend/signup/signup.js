const { default: axios } = require("axios");

document.addEventListener('submit',post);
const name=document.getElementById('name');
const email=document.getElementById('email');
const password=document.getElementById('password');

function post(event){
    event.preventDefault();
   axios.post('',{name:name.value,email:email.value,password:password.value}) 
    

} 
