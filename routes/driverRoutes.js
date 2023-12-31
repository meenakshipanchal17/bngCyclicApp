const express = require("express");
const Driver = require("../modals/driverModal");
const router = express.Router();

router.post("/register", (req, res) => {
  const {     DriverName,
    DriverEmail,
    DriverPhone,
    DriverLicenceNumber,
    DriverPassword,
    DriverConfirmPassword,
    DriverGender,
     } = req.body;
    
  const newDriver = new Driver({
    DriverName,
    DriverEmail,
    DriverPhone,
    DriverLicenceNumber,
    DriverPassword,
    DriverConfirmPassword,
    DriverGender,
  });
  try {
    newDriver.save();
    res.status(200).json({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});



router.post('/login', async (req,res) => {
  const {DriverEmail,
    DriverPhone,
    DriverPassword,} = req.body;
  try {
      const driver = await Driver.find({DriverEmail,
        DriverPhone,
    DriverPassword,});
      if(driver.length > 0){
         const currentDriver = {
          DriverName : driver[0].DriverName,
          DriverEmail : driver[0].DriverEmail,
          DriverPhone : driver[0].DriverPhone,
          DriverLicenceNumber : driver[0].DriverLicenceNumber,
          DriverPassword : driver[0].DriverPassword,
          DriverGender: driver[0].DriverGender,
           _id : driver[0]._id
         }
         res.status(200).send(currentDriver);
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

router.post('/getdriverbyid',async (req,res) => {
  const driverId = req.body.driverId;
  try {
       const driver = await Driver.findOne({_id:driverId});
       res.send(driver);
  } catch (error) {
       res.json({message : error});
  }
});

router.post('/updatedriver',async (req,res) => {
  const updatedDriver = req.body.updatedDriver;
  try {
       const driver = await Driver.findOne({_id:updatedDriver._id});
       driver.DriverName = updatedDriver.DriverName;
       driver.DriverEmail = updatedDriver.DriverEmail;
       driver.DriverPhone = updatedDriver.DriverPhone;
       driver.DriverLicenceNumber = updatedDriver.DriverLicenceNumber;
       driver.DriverGender = updatedDriver.DriverGender;
       driver.DriverPassword = updatedDriver.DriverPassword;
       await driver.save();
       res.status(200).send('Driver Updated Successfully');
  } catch (error) {
       res.status(400).json({message : error});
  }
});

router.post('/deletedriver',async (req,res) => {
  const driverId = req.body.driverId;
  try {
       await Driver.findOneAndDelete({_id:driverId});
       res.status(200).send('Driver Deleted Successfully');
  } catch (error) {
       res.status(404).json({message : error});
  }
});
router.post('/admindeletedriver',async (req,res) => {
  const driverId = req.body.driverId;
  try {
       await Driver.findOneAndDelete({_id:driverId});
       res.status(200).send('Driver Deleted Successfully');
  } catch (error) {
       res.status(404).json({message : error});
  }
});
router.get('/getAllDrivers', async (req,res) => {
  try {
   const drivers = await Driver.find({});
  res.status(200).send(drivers);
  } catch (error) {
   res.status(404).json({message : error.stack});
  }
});

router.post('/adddriver',async (req,res) => {
  const {driver} = req.body;
    try {
       const newdriver = new Driver({
        DriverName : driver.DriverName,
            DriverEmail : driver.DriverEmail,
       
          DriverPhone : driver.DriverPhone,
          DriverLicenceNumber : driver.DriverLicenceNumber,
          DriverPassword : driver.DriverPassword,
          DriverGender : driver.DriverGender,
            
         })
         await newdriver.save();
         res.status(201).send('New Rider Added');
    } catch (error) {
         res.json({message : error});
    }
});



module.exports = router;
