const { generateJwtToken } = require("../../middleware/jsonWebToken")
const studentSchema = require ("../../Model/Schema/studentSchema")
const mailSender = require("../../middleware/mailSender")

const studentForgetPassword = async(req,res)=>{
    const {registerNumber} = req.body
    if(registerNumber!=null){
      await studentSchema.find({RegisterNumber:registerNumber})
      .then(async(user)=>{
        if(user.length > 0){
          let Email = user[0]?.Email
          let otp = Math.floor(Math.random() * 10000);
          let subject = "Hostal Outpass OTP";
          let text = `Forget Password.. <h1> Your OTP is ${otp}. </h1>`;
          await mailSender(Email,subject,text)
          let payload = {
            registerNumber,
            otp
          }
          let Token = generateJwtToken({ payload });
          let sendingEmailFormat = Email.split('@')[0].slice(0,4)
          return res
          .status(200)
          .json({ message: `Otp send ${sendingEmailFormat}*****@gmail.com`, Token, success: true });
        }
        else{
          return res
                  .status(400)
                  .json({message :"Regsiter Number Not Found", success : false})
        }
        
      })
    }
    else{
      return res
                .status(400)
                .json({message :"Invalid Regsiter Number", success : false})
    }
  }

module.exports =  studentForgetPassword;