const express = require("express");
const router = express.Router();
const  Forms  = require("../models/printform");
const auth = require("../middleware/auth");
router.get("/getAll", auth,async (req, res) => {
  const usersList = await Forms.find();
  res.send(usersList);
});




router.post('/data',async(req,res)=>{
  const printdata = new Forms({
    "name": req.body.name,
    "agentname": req.body.agentname,
    "customername" : req.body.customername,
    "beneficiary":req.body.beneficiary,
    "agentlocation":req.body.agentlocation,
    "amount":req.body.amount,
    "recieptnumber":req.body.recieptnumber,
    "phonenumber":req.body.phonenumber,
    "tax":req.body.tax
  });
  try {
    const newprintdata = await printdata
      .save();
      
    return res.status(201).json({
      success: true,
      message: 'new print data added',
      printdata: newprintdata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  }

});
  module.exports = router;