const requestModel = require("../../Model/Schema/newRequestSchema")

const preRequestController = async(req,res)=>{
    await requestModel.find({User : "6772c298a2695d8f0f090d9b", status : 1})
    .then((data)=>{
        return res
                .status(200)
                .json({message : "Users", data, success : true})
    })
    .catch((error)=>{
        return res
                .status(401)
                .json({message : error.message, success : false})
    })
}


module.exports = preRequestController;