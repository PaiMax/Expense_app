
//document.getElementById('list').addEventListener('click',remove);

let flag=0;
let idtoedit=0;
var list=document.querySelector('#list');
let amount=document.querySelector('#amount');
let description=document.querySelector('#des');
let cat=document.querySelector('#category');

document.getElementById('Add').addEventListener('click',add);



 function add(e){
    console
    
    e.preventDefault();
    console.log("hi");
    
    //var li =document.createElement('li');
    let obj={
        amount1:amount.value,
        dis:description.value,
        category:cat.value
    }
    //let myserial=JSON.stringify(obj);

    if(flag==1){
        flag=0;
        updateexpense(idtoedit,obj);

    }
    else{
        post( obj);

    }
    
}


function deleteexpense(id){
    console.log("delelte");
    const nodetodelte=document.getElementById(id);
    if(nodetodelte){
        list.removeChild(nodetodelte);
    }
   
    axios.delete(`http://localhost:3000/expense/deleteexpense/${id}`)
    .then((result)=>console.log('deleted'))
    .catch((err)=>console.log(err));

}

function post( myserial){
    console.log(myserial);
    const token=localStorage.getItem('token');
    axios.post('http://localhost:3000/expense/postexpense',myserial,{headers:{"Authorization":token}})
    .then((result)=>{
        console.log(result);
        
        showUsersOnScreen(result.data);
        


    })
    .catch((err)=>console.log(err));
}


function showUsersOnScreen(data){
    const childHTML = `<tr id=${data.id}>
    <td>${data.amount}</td>
    <td>${data.description}</td>
    <td>${data.category}</td>
    <td>
      <button onclick=deleteexpense("${data.id}")>Delete</button>
      <button onclick=editexpense("${data.id}", "${data.amount}", "${data.description}", "${data.category}")>Edit</button>
    </td>
  </tr>`;
    
    list.innerHTML=list.innerHTML+childHTML;
    

}

function editexpense(id,amount,description,category){
document.querySelector('#amount').value=amount;
document.querySelector('#des').value=description;
document.querySelector('#category').value=category;
   
    flag=1;
    idtoedit=id;
    

}

function updateexpense(id,obj){
    axios.put(`http://localhost:3000/expense/updateexpense/${id}`,obj)
    .then((r)=>console.log('updated'))
    .catch(err=>console.log(err));
}



document.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/expense/getexpense',{headers:{"Authorization":token}})
    .then((result)=>{
        console.log(result);
        for(let i=0;i<result.data.length;i++){
            
            showUsersOnScreen(result.data[i]);
        }
        
    })
})
document.getElementById('premium').addEventListener('click', premiumPost);

 async function  premiumPost(){
    
    const token=localStorage.getItem('token');
    
    const response=await axios.get('http://localhost:3000/purchase/membership',{headers:{"Authorization":token}});
    var options={
        "key_id":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            console.log(response.razorpay_payment_id);
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{payment_id:response.razorpay_payment_id},{headers:{"Authorization":token}})
            alert('you are now a premium user');
        }
    

    };
    const razer=new Razorpay(options);
    razer.open();
    //e.preventDefault();
    razer.on('payment.failed',function(response){
        console.log(response);
        alert('somthing went wrong');
    })

    
}




