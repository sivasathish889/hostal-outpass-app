const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Hostal_outpass");
    console.log("Db connected");
  } catch (error) {
    console.log("Db error")
  }
};

module.exports = db;
