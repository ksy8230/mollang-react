const passport = require('passport');
const db = require('../models');
const local = require('./local');
const kakao = require('./kakao');

module.exports = () => {
    // step 2
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser( async (id, done) => {
        try {
            const user = await db.User.findOne({ 
                where : { id },
            });
            // 서버가 id 값으로 찾아온 유저 정보는 req.user 에 저장
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
    local();
    kakao();
};