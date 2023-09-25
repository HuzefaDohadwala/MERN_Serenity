const express = require('express');
const { signup, login, verifyToken, getUser, refreshAccessToken } = require('../controllers/user-controller'); // Import the new middleware

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login); 


router.post('/refresh-token', refreshAccessToken); 
// router.get('/refresh', refreshToken, verifyToken, getUser);

router.get('/user', verifyToken, getUser);


module.exports = router;
