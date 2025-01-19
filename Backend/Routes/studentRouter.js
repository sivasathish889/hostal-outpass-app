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
const preRequestController = require("../Controller/studentController/preRequestController")


routes.post("/student/register", studentRegisterController);
routes.post("/student/register/verify", verifyOtpController);
routes.post("/student/login", studentLoginController);
routes.post("/student/newRequest", newRequestController);
routes.get("/student/preRequests", preRequestController)
module.exports = routes;
