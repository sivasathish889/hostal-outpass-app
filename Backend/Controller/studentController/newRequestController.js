const newRequestModel = require("../../Model/Schema/newRequestSchema");

const newRequestController = async (req, res) => {
  const { roomNo, destination, purpose, inDateTime, outDateTime, userId } =
    req.body;
    console.log(destination,roomNo,purpose,outDateTime,inDateTime,userId)
  try {
    if (
      destination ||
      roomNo ||
      purpose ||
      outDateTime ||
      inDateTime ||
      userId
    ) {
      // await newRequestModel.create({
      //   RegisterNumber: RegisterNumber,
      //   name: name,
      //   year: year,
      //   Department: department,
      //   PhoneNumber: phoneNumber,
      //   ParentNumber: parentNumber,
      //   destination: destination,
      //   InDateTime: inDateTime,
      //   OutDateTime: outDateTime,
      //   Purpose: purpose,
      //   RoomNo: roomNo,
      //   User: "6772c298a2695d8f0f090d9b",
      // });
      // return res
      //   .status(200)
      //   .json({ message: "Request Created", success: false });
    } else {
      return res
        .status(500)
        .json({ message: "Invalid Creditionals", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = newRequestController;
