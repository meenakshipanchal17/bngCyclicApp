const express = require('express');
const Rider = require('../modals/riderModal');
const Riders = require('../data/rider-data');
const router = express.Router();


router.post('/register',(req,res) => {
     const {riderName,riderEmail, riderPhone, riderGender, riderPassword} = req.body;
     const riderImage = Riders[0].image;
     const newRider = new Rider({riderName,riderEmail, riderPhone, riderGender, riderPassword, riderImage});
     try {
        newRider.save();
        res.status(200).json({
            success : true,
            message : 'Register Success'
        });
     } catch (error) {
        res.status(400).json({
             message : error
        });
     }
});

router.post('/login', async (req,res) => {
  const {riderEmail, riderPhone, riderPassword} = req.body;
  try {
      const rider = await Rider.find({riderEmail, riderPhone, riderPassword});
      if(rider.length > 0){
         const currentRider = {
           riderName : rider[0].riderName,
           riderEmail : rider[0].riderEmail,
           riderPhone : rider[0].riderPhone,
           riderGender : rider[0].riderGender,
           _id : rider[0]._id
         }
         res.status(200).send(currentRider);
      }else{
        res.status(400).json({
           message : 'Login Failed'
        })
      }
  } catch (error) {
     res.status(404).json({
        message : 'Something Went Wrong'
     })
  }
});


router.post('/getriderbyid',async (req,res) => {
   const riderId = req.body.riderId;
   try {
        const rider = await Rider.findOne({_id:riderId});
        res.send(rider);
   } catch (error) {
        res.json({message : error});
   }
 });
 
 router.post('/updatedrider',async (req,res) => {
   const updatedRider = req.body.updatedRider;
   try {
        const rider = await Rider.findOne({_id:updatedRider._id});
        rider.riderName = updatedRider.riderName;
        rider.riderEmail = updatedRider.riderEmail;
        rider.riderPhone = updatedRider.riderPhone;
        rider.riderGender = updatedRider.riderGender;
        rider.riderPassword = updatedRider.riderPassword;
        rider.riderImage = updatedRider.riderImage;
        await rider.save();
        res.status(200).send('Rider Updated Successfully');
   } catch (error) {
        res.status(400).json({message : error});
   }
 });
 
 router.post('/deletedrider',async (req,res) => {
   const riderId = req.body.riderId;
   try {
        await Rider.findOneAndDelete({_id:riderId});
        res.status(200).send('Rider Deleted Successfully');
   } catch (error) {
        res.status(404).json({message : error});
   }
 });
 

router.get('/getAllRiders', async (req,res) => {
   try {
    const riders = await Rider.find({});
   res.status(200).send(riders);
   } catch (error) {
    res.status(404).json({message : error.stack});
   }
});
 
router.post('/admindeletedrider',async (req,res) => {
     const riderId = req.body.riderId;
     try {
          await Rider.findOneAndDelete({_id:riderId});
          res.status(200).send('Rider Deleted Successfully');
     } catch (error) {
          res.status(404).json({message : error});
     }
   });
   

router.post('/addrider',async (req,res) => {
     const {rider} = req.body;
       try {
          const newrider = new Rider({
               riderName : rider.riderName,
               riderEmail : rider.riderEmail,
          
             riderPhone : rider.riderPhone,
             riderGender : rider.riderGender,
             riderPassword : rider.riderPassword,
               
            })
            await newrider.save();
            res.status(201).send('New Rider Added');
       } catch (error) {
            res.json({message : error});
       }
});

module.exports = router;