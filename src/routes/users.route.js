const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await userModel.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await userModel.find({ _id: id });
    if (user.length < 0) res.status(404).json({ message: "User Not Found Ya" });
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError")
      res.status(404).json({ message: "User Not Found" });
    else
      res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

router.post("/", async (req, res, next) => {
  const newUser = new userModel(req.body);

  try {
    const newData = await newUser.save();
    res.status(201).json({
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await userModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    if (error.name === "CastError")
      res.status(404).json({ message: "User Not Found" });
    else
      res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await userModel.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    if (error.name === "CastError")
      res.status(404).json({ message: "User Not Found" });
    else
      res.status(400).json({ message: "Internal Server Error", error: error });
  }
});

module.exports = router;
