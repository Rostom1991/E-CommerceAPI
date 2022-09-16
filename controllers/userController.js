const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// Create New User
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.create({ username, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Users Not Found" });
  }
};

// Get One User
const getOneUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No Such User" });
  }
  res.status(200).json(user);
};

//Delete a User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }
  const user = await userModel.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "No Such User" });
  }
  res.status(200).json(user);
};

//Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }
  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(400).json({ error: "No Such User" });
  }
  res.status(200).json(user);
};

module.exports = { createUser, getUsers, getOneUser, deleteUser, updateUser };
