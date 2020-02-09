const express = require('express');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect : 'http://localhost:3000/',
}), (req, res) => {
    res.redirect('http://localhost:3000/');
});

module.exports = router;