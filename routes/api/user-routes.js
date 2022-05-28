const router = require("express").Router();
const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   addFriend,
   deleteFriend,
} = require("../../controllers/user-controller");

// /api/user
router.route("/").get(getAllUsers).post(createUser);

// /api/user/:userId
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/user
router.route("/");

// /api/user/:userId/friends/:friendId
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;
