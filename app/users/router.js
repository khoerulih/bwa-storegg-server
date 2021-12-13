var express = require('express');
var router = express.Router();
const { viewSignin, actionSignIn, actionSignOut } = require('./controller');

router.get('/', viewSignin);
router.post('/', actionSignIn);
router.get('/logout', actionSignOut);
module.exports = router;
