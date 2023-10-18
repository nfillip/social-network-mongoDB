//require models
const User = require("../models/User");
const Thought = require("../models/Thought")


//create one user
//http://locahost:3001/api/thoughts
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const updateUserFriend = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
    res.status(200).json(newThought);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//get all thoughts
//http://locahost:3001/api/thoughts
const getAllThoughts = async (req,res) => {
    try {
        const allThoughts = await Thought.find();
        res.status(200).json(allThoughts)
    }catch (err){
        res.status(500).json(err);
        console.log(err);
    }
 }

 //get single thought by id
 //http://localhost:3001/api/thoughts/{thoughtId}
 const getSingleThought = async (req, res) => {
  try {
    const singleThought = await Thought.findOne({
      _id: req.params.thoughtId,
    })
    if (!singleThought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }
    res.status(200).json(singleThought);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

// //update single thought
//http://localhost:3001/api/thoughts/{thoughtId}
const updateSingleThought = async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );
    if (!updateThought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }
    res.status(200).json(updateThought);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//delete a single thought
//http://localhost:3001/api/thoughts/{thoughtId}
const deleteSingleThought = async (req, res) => {
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!deleteThought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }
    res.status(200).json({
      message: `Thought of id ${req.params.thoughtId} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//create a reaction
//http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
const createReaction = async (req, res) => {
  try {
    const updateThoughtReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { new: true }
    );
    if (!updateThoughtReaction) {
      return res.status(404).json({ message: "No Thought with that ID" });
    }
    res.status(200).json(updateThoughtReaction);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//delete a reaction
//http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
const removeReaction = async (req, res) => {
  try {
    const {thoughtId, reactionId} = req.params
    const removeThoughtReaction = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: {reactionId: {$eq: reactionId } }}},
      { new: true }
    );
    if (!removeThoughtReaction) {
      return res.status(404).json({ message: "No Thought with that ID" });
    }
    res
      .status(200)
      .json({
        message: `Reaction of id ${reactionId} deleted successfully from Thought of id ${thoughtId}`,
      });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

//exports to api/thoughtRoutes.js
module.exports = {
  createThought,
  getAllThoughts,
  getSingleThought,
  updateSingleThought,
  deleteSingleThought,
  createReaction,
  removeReaction

};
