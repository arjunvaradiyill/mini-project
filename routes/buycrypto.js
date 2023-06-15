var express = require('express');
var router = express.Router();
var businessHelpers = require('../helpers/business-helpers')
const Blockchain = require('../config/blockchain')
const Block = require('../config/block')
//stripe
require('dotenv').config
// const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.json())
 
var Publishable_Key = 'pk_test_51NHlAXSAfXyrG5MXv8Gi1ZRj4QjgQznakCbEs4aa0wKyQzz8zkYruPWZ9rQig8rbhqcCLtPsgH7fS0Tc16ubmxnj001xUNKqGM'
var Secret_Key = 'sk_test_51NHlAXSAfXyrG5MX9ahZ6c6PDbPmhO4fGPK2nxZh4bb3VM933EIQALAANtF51e038CRIAtbuNzUQACyzGNY6nniW004GuyHIN8'
 
const stripe = require('stripe')(Secret_Key)
 
// const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//stripe
// const Block = require('../config/cryptohash')
const SHA256 = require("crypto-js/sha256");


// main.js
const logCoin = require('../config/logcoin');
const bchelpers = require('../helpers/bchelpers');
const Razorpay = require('razorpay');
const logcoin = require('../config/logcoin');




/* GET users listing. */
router.get('/', function(req, res, next) {
    let user=req.session.user;
    
        res.render('buycrypto',{user});

});

router.get('/buy', function(req, res, next) {
    //    key: Publishable_Key
       // console.log(global.qwe)
    let user=req.session.user;
    res.render('buy',{user,key: Publishable_Key});
});

router.post('/buy',(req,res)=>{
    console.log(req.body.quantity)
    // res.send('Succjhess')
    let data = req.body;
    let user=req.session.user;
    res.render('stripe',{key: Publishable_Key,user,data})
}
)
//buy
router.post('/payment',(req,res)=>{//buy
   
    //res.send('sanjo')
  
     if(global.vall/*true*/){
        global.am=parseInt(req.body.quantity)+parseInt(req.session.user.wallet)
        global.t = 100*parseInt(req.body.quantity);
     }
     else{
        global.am=parseInt(req.body.quantity)
    global.t = 100*parseInt(req.body.quantity);
        global.vall=true;
     }
    // let am=parseInt(req.body.quantity)+parseInt(req.session.user.wallet)
    //     let t = 100*parseInt(req.body.quantity);
// global.orderno=global.orderno+1;

// console.log(global.orderno);

    // let am=parseInt(req.body.quantity)+parseInt(req.session.user.wallet)
    // let t = 100*parseInt(req.body.quantity);
    // bchelpers.generateRazorPay(global.t)

    // var options = {
    //     "key": "rzp_test_xbkkCY21TwzcJn", // Enter the Key ID generated from the Dashboard
    //     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     "currency": "INR",
    //     "name": "Acme Corp",
    //     "description": "Test Transaction",
    //     "image": "https://example.com/your_logo",
    //     "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //     "handler": function (response){
    //         alert(response.razorpay_payment_id);
    //         alert(response.razorpay_order_id);
    //         alert(response.razorpay_signature);
    //         verifyPayment(response);
    //     }, 
    //      "prefill": {
    //         "name": "Gaurav Kumar",
    //         "email": "gaurav.kumar@example.com",
    //         "contact": "9000090000"
    //     },
    //     "notes": {
    //         "address": "Razorpay Corporate Office"
    //     },
    //     "theme": {
    //         "color": "#3399cc"
    //     }
    //           };
    //           var razorpayObject=new Razorpay(options);
    //           razorpayObject.open();
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 10000,      // Charging Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("success h j")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
    // console.log(req.body.quantity); 
    bchelpers.updateProduct(req.session.user._id,global.am)
    // res.redirect('/mainpage/buycrypto');
    

// console.log('reached here');
// let c=validateChainIntegrity();
// if(c){
//     console.log('block valid');
// }
// else{
//     console.log('invalid');
// }
// let am=parseInt(req.body.quantity)
// bchelpers.updateProduct(req.session.user._id,am)
// console.log('nyka');
    logCoin.addNewBlock(
            new Block(1, new Date(), {
                sender: "BLOCKCHAINWALLET",
                recipient: req.session.user.name ,
                quantity: req.body.quantity
            })
        );
       
        let nn= logcoin.validateChainIntegrity()
        if(nn){
            console.log('Block Valid');
        }
        // if(req.session.user.wallet!='NaN'){
        //     let am=parseInt(req.body.quantity)
        //     console.log('lolo');
        // }
        // else{
        //     let am=parseInt(req.body.quantity)
        //     console.log('lolaa');
        // }
    //    console.log('loko');
            // console.log(parseInt(req.body.quantity));
            // console.log(parseInt(req.session.user.wallet));
            // console.log(am);
            // console.log('jn');
        // bchelpers.updateProduct(req.session.user._id,req.body.quantity)
            // bchelpers.addBusiness(logcoin)
        //    console.log(logcoin)
        console.log(JSON.stringify(logCoin, null, 5))



        //hi stripe code here
        // var stripe = require('stripe')('sk_test_51NHlAXSAfXyrG5MX9ahZ6c6PDbPmhO4fGPK2nxZh4bb3VM933EIQALAANtF51e038CRIAtbuNzUQACyzGNY6nniW004GuyHIN8')


 
// View Engine Setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
 
// app.get('/', function(req, res){
//     res.render('Home', {
//        key: Publishable_Key
//     })
// })
 
// app.post('/payment', function(req, res){
 
//     // Moreover you can take more details from user
//     // like Address, Name, etc from form
//     stripe.customers.create({
//         email: req.body.stripeEmail,
//         source: req.body.stripeToken,
//         name: 'Gourav Hammad',
//         address: {
//             line1: 'TC 9/4 Old MES colony',
//             postal_code: '452331',
//             city: 'Indore',
//             state: 'Madhya Pradesh',
//             country: 'India',
//         }
//     })
//     .then((customer) => {
 
//         return stripe.charges.create({
//             amount: 2500,     // Charging Rs 25
//             description: 'Web Development Product',
//             currency: 'INR',
//             customer: customer.id
//         });
//     })
//     .then((charge) => {
//         res.send("Success")  // If no error occurs
//     })
//     .catch((err) => {
//         res.send(err)       // If some error occurs
//     });
// })
 
// app.listen(port, function(error){
//     if(error) throw error
//     console.log("Server created Successfully")
// })
  //stripe end      
})

// const button = document.querySelector("button")
// button.addEventListener("click",()=>{
//     console.log('checkout')
// })

module.exports = router;