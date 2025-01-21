const studentModel = require("../../Model/Schema/studentSchema");
const { comparePassword } = require("../../middleware/bcrypt");

const studentLoginController = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;
    await studentModel.find({ RegisterNumber: registerNumber }).then((user) => {
      if (user.length > 0) {
        if (comparePassword(password, user[0]?.Password)) {
          return res
            .status(200)
            .json({ message: "Login Successfull", success: true });
        } else {
          return res
            .status(404)
            .json({ message: "Incorrect Password", success: false });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Register Number Not found", success: false });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = studentLoginController;
