const passport = require('passport');
const KakaoStrategy  = require('passport-kakao').Strategy;
//const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        clientSecret : '',
        callbackURL : '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
            try {
                const exUser = await db.User.findOne({
                    where : {
                        userId : profile.id, 
                    }
                });
                if (exUser) {
                    done(null, exUser)
                } else {
                    console.log('profile!!', profile)
                    const newUser = await db.User.create({
                        nickname : profile.displayName,
                        userId : profile.id,
                    });
                    console.log('newUser!!', newUser)
                    return done(null, newUser)
                }
            } catch (error) {
                console.error(error);
                return done(error)
            }
        }
    ))
};