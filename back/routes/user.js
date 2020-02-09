const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/user 
    try {
        const exUser = await db.User.findOne({
            where : {
                userId : req.body.id,
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
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/', (req, res) => { // GET /api/user 

});

module.exports = router;