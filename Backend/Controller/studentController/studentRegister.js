const {generateHashPassword} = require("../../middleware/bcrypt")
const {generateJwtToken, verifyJwtToken} = require("../../middleware/jsonWebToken")
const studentModel = require("../../Model/Schema/studentSchema")
const mailSender = require("../../middleware/mailSender")

const studentRegisterController = async(req,res)=>{
    try {
     let  {name, registerNumber, department, email, year, phoneNumber, parentNumber, district, password, confirmPassword } = req.body
     if(password === confirmPassword){
         await studentModel.find({RegisterNumber : registerNumber })
         .then(async(user)=>{
            if(user.length > 0){
                return res 
                        .status(401)
                        .json({message : "Already Regsitered", success : false })
            } else {
                let hashingPassword = generateHashPassword(password)
                let otp = Math.floor(Math.random() * 10000)
                 let payload = {
                     name,
                     registerNumber,
                     department,
                     email,
                     year,
                     phoneNumber,
                     parentNumber,
                     district,
                     hashingPassword,
                     otp
                 }
                 let Token = generateJwtToken({payload})
                 let subject  = "Hostal Outpass OTP"
                 let text = `<h1> Your OTP is ${otp}. This is expired in 5 Minutes </h1>`
                // await mailSender(email, subject, text)
                //  cookie maximum age 5 minutes
                 res.cookie("token", Token,{maxAge: 1000 * 60 * 5, httpOnly: true})
                 return res
                         .status(200)
                         .json({message : "OTP send", Token, success : true})
            }
         })
     } else {
         return res
                 .status(401)
                 .json({message : "Password Does Not Matched", success : false })
     }
  
    } catch (error) {
         return res
                 .status(500)
                 .json({message : error.message, success : false})
    }
 }


 const verifyOtpController = async (req,res)=>{
        try {
         const { otp } = req.body
         let tokens = req.cookies.token
         if(tokens){
             const userData = verifyJwtToken(tokens).payload
             if(otp === userData.otp){
                 await studentModel.create({
                     name : userData.name,
                     RegisterNumber : userData.registerNumber,
                     Department : userData.department,
                     year : userData.year,
                     PhoneNumber : userData.phoneNumber,
                     ParentNumber : userData.parentNumber,
                     District : userData.district,
                     Password : userData.hashingPassword,
                     Email : userData.email
                 })
                 return res
                         .status(200)
                         .json({message : "Register Successfully..", success : true})
             }
             else{
                 return res
                         .status(401)
                         .json({message : "Incorrect OTP", success : false })
             }
         }
         else{
             return res 
                     .status(401)
                     .json({message: "OTP expired"})
         }
         
        } catch (error) {
         return res
                 .status(500)
                 .json({message : error.message})
        }
     
     }


module.exports = {studentRegisterController, verifyOtpController}