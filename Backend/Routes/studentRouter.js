const express = require("express");
const routes = express.Router();
const requestModel = require("../Model/Schema/newRequestSchema");
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
const {
  studentForgetPassword,
  studentVerifyOtp,
  studentChangePassword,
} = require("../Controller/studentController/studentForgetPassword");
const studentSchema = require("../Model/Schema/studentSchema");
const mailSender = require("../middleware/mailSender");

routes.post("/student/register", studentRegisterController);
routes.post("/student/register/verify", verifyOtpController);
routes.post("/student/login", studentLoginController);
routes.post("/student/forgetPassword", studentForgetPassword);
routes.post("/student/forgetPassword/verify", studentVerifyOtp);
routes.post("/student/changePassword", studentChangePassword);
routes.post("/student/newRequest", newRequestController);
routes.get("/student/preRequests", preRequestController);


module.exports = routes;
