const newRequestModel = require("../../Model/Schema/newRequestModel");
const studentModel = require("../../Model/Schema/studentModel");

const newRequestController = async (req, res) => {
  const { roomNo, destination, purpose, inDateTime, outDateTime, userId } =
    req.body;
  try {
    if (
      destination ||
      roomNo ||
      purpose ||
      (outDateTime && inDateTime) ||
      userId
    ) {
      await studentModel.find({ _id: userId }).then((user) => {
        newRequestModel.create({
          RegisterNumber: user[0].RegisterNumber,
          name: user[0].name,
          year: user[0].year,
          Department: user[0].Department,
          PhoneNumber: user[0].PhoneNumber,
          ParentNumber: user[0].ParentNumber,
          Distination: destination,
          InDateTime: inDateTime,
          OutDateTime: outDateTime,
          Purpose: purpose,
          RoomNo: roomNo,
          User: userId,
        });
      });
      return res
        .status(200)
        .json({ message: "Request Created", success: true });
    } else {
      return res
        .status(500)
        .json({ message: "Invalid Creditionals", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

const pendingRequestsController = (req, res) => {
  let { userId } = req.params;
  newRequestModel
    .find({ User: userId, status:1 })
    .then((pass) => {
      return res.status(200).json({ pass, success: true });
    })
    .catch((error) =>{
    return res.status(500).json({ message: "Server Error", success: false });

    });
};

const editingRequestController = async (req, res) => {
  try {
    const { roomNo, destination, purpose, inDateTime, outDateTime, passId } =
      req.body;
    await newRequestModel
      .findByIdAndUpdate(
        passId,
        {
          RoomNo: roomNo,
          Distination: destination,
          Purpose: purpose,
          InDateTime: inDateTime,
          OutDateTime: outDateTime,
        },
        { new: true }
      )
      .catch((error) => {
        return res.status(500).json({ message: "server Error", success: false });

      });
    return res
      .status(200)
      .json({ message: "Update SuccessFully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

const deletingPassController = async (req, res) => {
  await newRequestModel.findByIdAndDelete(req.params.passId);
  return res.status(200).json({ message: "Pass Deleted", success: true });
};

const preRequestController = async (req, res) => {
  const userId = req.params.userId;
  await newRequestModel
    .find({ User: userId,  $or: [{ status: "3"}, {status: "2" }] })
    .then((data) => {
      return res.status(200).json({ message: "Users", data, success: true });
    })
    .catch((error) => {
      return res.status(401).json({ message: error.message, success: false });
    });
};


module.exports = {
  newRequestController,
  preRequestController,
  pendingRequestsController,
  editingRequestController,
  deletingPassController,
};
