//create user
const User = require("../models/User");
const Thought = require("../models/Thought")
//get users to display make they're working

//create one user
//http:locahost:3001/api/users
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
//http:locahost:3001/api/users
const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.json(getAllUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get single user
//http://localhost:3001/api/users/{userId}
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
//http://localhost:3001/api/users/{userId}
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

//delete single user
//http://localhost:3001/api/users/{userId}
const deleteSingleUser = async (req, res) => {
  try {

    //delete the user thoughts
    const findUser = await User.find({_id: req.params.userId});
    if (!findUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    const userUsername = findUser[0].username;
    const deleteAllUserThoughts = await Thought.deleteMany({username: userUsername})
    
    //delete the user
    const deleteUser = await User.findOneAndDelete({
      _id: req.params.userId,
    });
      res.status(200).json({
      message: `User of id ${req.params.userId} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//add a friend to a user
//http://localhost:3001/api/users/{userId}
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

//remove a friend from user
//http://localhost:3001/api/users/{userId}
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

//export to routes/api/userRoutes.js
module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  removeFriend,
};
