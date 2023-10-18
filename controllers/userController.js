//create user
const User = require("../models/User");
//get users to display make they're working

//create one user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.json(getAllUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get single user
const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({
      _id: req.params.userId,
    })
    .populate('friends')
    .populate('thoughts')

    if (!singleUser) {
      return res.status(404).json({ message: "No user with that ID" });
    }
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//update single user
const updateSingleUser = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "No user with that ID" });
    }
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

const deleteSingleUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({
      _id: req.params.userId,
    });
    if (!deleteUser) {
      return res.status(404).json({ message: "No user with that ID" });
    }
    res.status(200).json({
      message: `User of id ${req.params.userId} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const updateUserFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    if (!updateUserFriend) {
      return res.status(404).json({ message: "No User with that ID" });
    }
    res.status(200).json(updateUserFriend);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const removeUserFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!removeUserFriend) {
      return res.status(404).json({ message: "No User with that ID" });
    }
    res
      .status(200)
      .json({
        message: `Friend of id ${req.params.friendId} deleted successfully from ${req.params.userId}`,
      });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};
module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  removeFriend,
};
