const express = require('express');
const passport = require('passport');
const db = require('../models');

const router = express.Router();
const frontURL = process.env.NODE_ENV === 'production' ? 'http://mollog.co.kr' : 'http://localhost:3000';

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect : `${frontURL}`,
}), (req, res) => {
    res.redirect(`${frontURL}`);
});

module.exports = router;