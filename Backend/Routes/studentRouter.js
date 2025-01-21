const express = require("express");
const routes = express.Router();
const requestModel = require("../Model/Schema/newRequestSchema")
const {
  generateHashPassword,
  comparePassword,
} = require("../middleware/bcrypt");
const {
  generateJwtToken,
  verifyJwtToken,
} = require("../middleware/jsonWebToken");
const {
  studentRegisterController,
  verifyOtpController,
} = require("../Controller/studentController/studentRegister");
const studentLoginController = require("../Controller/studentController/studentLoginController");
const newRequestController = require("../Controller/studentController/newRequestController");
const preRequestController = require("../Controller/studentController/preRequestController");
const studentForgetPassword = require("../Controller/studentController/studentForgetPassword")
const studentSchema = require("../Model/Schema/studentSchema");
const mailSender = require("../middleware/mailSender")


routes.post("/student/register", studentRegisterController);
routes.post("/student/register/verify", verifyOtpController);
routes.post("/student/login", studentLoginController);
routes.post("/student/newRequest", newRequestController);
routes.get("/student/preRequests", preRequestController)
routes.post("/student/forgetPassword",studentForgetPassword)

routes.post("/student/forgetPassword/verify",(req,res)=>{
  const {backendOtp, otp} = req.body
  const verifyOtp = verifyJwtToken(backendOtp).payload.otp

  if(Number(otp)===Number(verifyOtp)){
    return res
            .status(200)
            .json({message : "OTP successfully verified", success : true})
  }
  else{
    return res
            .status(400)
            .json({message : "Wrong OTP", success : false})
  }

})
module.exports = routes;
