const express = require("express");
const wardenModel = require("../Model/Schema/wardenModel");
const newRequestModel = require("../Model/Schema/newRequestModel");
const routes = express.Router();

routes.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    await wardenModel
      .find({ userName: userName, password: password })
      .then((user) => {
        if (user.length > 0) {
          return res.json({ message: "Login Successfull", success: true });
        } else {
          return res.json({ message: "UnAuthorized", success: false });
        }
      });
    res.json({ Message: "ok" });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.put("/passAccept/:id", async (req, res) => {
  const passId = req.params.id;
  try {
    await newRequestModel
      .findByIdAndUpdate(passId, { status: "2" }, { new: true })
      .then(() => {
        return res.json({ message: "Pass Accepted", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.put("/passReject/:id", async (req, res) => {
  const passId = req.params.id;
  try {
    await newRequestModel
      .findByIdAndUpdate(passId, { status: "3" }, { new: true })
      .then(() => {
        return res.json({ message: "Pass Rejected", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.get("/pendingPasses", async (req, res) => {
  try {
    await newRequestModel.find({ status: "1" }).then((data) => {
      return res.json({ message: "fetching SuccessFull", data, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});
module.exports = routes;
