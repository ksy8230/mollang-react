const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const hpp = require('hpp');
const helmet = require('helmet');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const tagAPIRouter = require('./routes/tag');
const authAPIRouter = require('./routes/auth');
const calendarsAPIRouter = require('./routes/calendars');
const calendarAPIRouter = require('./routes/calendar');
const prod = process.env.NODE_ENV === 'production';

dotenv.config();
const app = express();

db.sequelize.sync();
passportConfig();

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin : 'http://mollog.co.kr', // 프론트 요청 이외의 것은 거른다
        credentials : true,
    }));
} else {
    // 백엔드 서버로 요청 들어오는 기록들을 보여줌
    app.use(morgan('dev'));
    // Access-Control-Allow-Origin 에러 처리
    app.use(cors({
        origin : true,
        credentials : true,
    }));
}

app.use('/', express.static('uploads'));
app.use(express.json()); // req.body 데이터 받기 위함
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({ 
    resave : false, 
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
        domain : prod && '.mollog.co.kr',
    },
    name : 'mollangsck'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/auth', authAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/tag', tagAPIRouter);
app.use('/api/calendars', calendarsAPIRouter);
app.use('/api/calendar', calendarAPIRouter);

app.get('/', (req, res) => {
    res.send('백엔드 정상 동작')
});

app.listen(prod ? process.env.PORT : 8080, () => {
    console.log(`server is running on ${process.env.PORT}`)
});