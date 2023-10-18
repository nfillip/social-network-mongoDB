const router = require('express').Router();
const {createUser, getUsers, getSingleUser, updateSingleUser, deleteSingleUser, addFriend} = require('../../controllers/userController');

//http:locahost:3001/api/users
router.route('/').get(getUsers).post(createUser);

//http://localhost:3001/api/users/{userId}
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend);

module.exports = router;