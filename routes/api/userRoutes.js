const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/userController');


  router.route('/')
  .get(getUsers)
  .post(createUser);

  router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// router.route('/:userId/friends/:friendId')
// .get("this is where addNewFriend would go")
// .delete("this is where removeFriend would go");

module.exports = router;