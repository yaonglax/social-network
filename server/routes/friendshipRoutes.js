const express = require('express')
const FriendsController = require('../controllers/FriendsController')

const router = express.Router();

router.post('/sendRequest', FriendsController.sendFriendRequest)
router.get('/fetchStatus', FriendsController.checkFriends)
module.exports = router;