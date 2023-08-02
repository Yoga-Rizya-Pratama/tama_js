const express = require("express");
const userModel = require("../../models/example/user.model");
const client = require("../../utils/redis.util");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  const cache = await client.GET("data");

  if (cache !== null) {
    return res.status(200).json({
      msg: "from redis cache",
      data: JSON.parse(cache),
    });
  } else {
    try {
      const data = await userModel.find();
      await client.SETEX("data", 3600, JSON.stringify(data));
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
});

router.get("/users/:id", async (req, res, next) => {
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

router.post("/users", async (req, res, next) => {
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

router.patch("/users/:id", async (req, res, next) => {
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

router.delete("/users/:id", async (req, res, next) => {
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
