const router = require("express").Router();
const {
getAllThoughts,
createThought,
getSingleThought,
updateSingleThought,
deleteSingleThought,
createReaction,
removeReaction
} = require("../../controllers/thoughtController");

//http://locahost:3001/api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

//http://localhost:3001/api/thoughts/{thoughtId}
router
  .route("/:thoughtId")
  .get(getSingleThought).put(updateSingleThought).delete(deleteSingleThought);

//http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction)

//http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction)

module.exports = router;
