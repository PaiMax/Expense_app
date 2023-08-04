const Sib=require('sib-api-v3-sdk');

exports.forgotPassword=(req,res,next)=>{
   
    console.log("emai======"+req.body.email);
    require('dotenv').config()

    const client=Sib.ApiClient.instance
    const apiKey=client.authentications['api-key']
    apiKey.apiKey=process.env.API_KEY;

    const tranEmailApi=new Sib.TransactionalEmailsApi()
    const sender={
        email:'nishwalbh1997@gmail.com',
    }
    const receivers=[
        {
            email:req.body.email,
        },
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'forgot password',
        textContent:'one time password'
    })
    .then((resp)=>{console.log(resp); res.send('sucessful')})
    .catch((err)=>console.log(err));


}