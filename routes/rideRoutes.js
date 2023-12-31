const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
const Ride = require('../modals/rideModal');
const stripe = require('stripe')('sk_test_51LUxClSJlCCtgp7YLmJz2p0K8J9z6li0KwTxpurWDe4MwI4a2DeW9eQbA0GWR1UOh0OIwYH7K4Ohjwf6cgW4quQe00NAZuwgy5',{
    apiVersion: '2023-10-16'
});

router.post('/bookride', async (req,res)   =>{
    const {token,amount,currentRider} = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
          });
        const payment = await stripe.paymentIntents.create({
            amount: amount * 1000,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        },{
            idempotencyKey: uuidv4()
        })
        if(payment){
            res.send('Payment Success');
        }else{
            res.send('Payment Failed');
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.stack
        })
    }
});

module.exports = router;