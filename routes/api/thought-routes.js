// require express
const router = require("express").Router;

// declare each of the routes
const {
   getAllThoughts,
   getThoughtById,
   createThought,
   removeThought,
   addReaction,
   removeReaction,
} = require("../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/user/:id
router.route("/:userId").post(addThought);

// /api/thoughtId
router
   .route("/:thoughtId")
   .get(getThoughtById)
   .put(createThought)
   .delete(removeThought);

// api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reaction").post(addReaction).delete(removeReaction);

module.exports = router;
