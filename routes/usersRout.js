const express   = require('express');
const router = express.Router();
const {registerUser,loginUser,getPreferences,updatePreferences} = require('../controllers/usersController');
const authenticationMiddleware = require('../middelware/authenticationMiddleware');
router.use(express.json());

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/preferences', [authenticationMiddleware], getPreferences);
router.put('/preferences', [authenticationMiddleware], updatePreferences);

module.exports = router;
