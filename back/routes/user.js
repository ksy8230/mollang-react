const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/user
    try {
        const exUser = await db.User.findOne({
            where : {
                userId : req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            nickname : req.body.nickname,
            userId : req.body.userId,
            password : hashedPassword,
        });
        console.log('newUser', newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/', (req, res) => { // GET /api/user 
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.')
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});

router.post('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
        console.log(err, user, info)
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.json(filteredUser);
        });
    })(req, res, next);
});

router.post('/login/kakao', (req, res, next) => { 

});

module.exports = router;