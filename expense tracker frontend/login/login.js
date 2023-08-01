//const { default: axios } = require("axios");

document.addEventListener('submit',loginUser);
const email=document.getElementById('email');
const password=document.getElementById('password');
function loginUser(event){
    console.log('in event');
    event.preventDefault();
    axios.post('http://localhost:3000/user/login',{email:email.value,password:password.value})
    .then((res)=>{
        const para=document.getElementById('para');
        para.innerText=res.data;
    })
    .catch(err=>console.log(err));


}