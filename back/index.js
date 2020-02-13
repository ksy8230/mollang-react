const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const tagAPIRouter = require('./routes/tag');
const authAPIRouter = require('./routes/auth');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use('/', express.static('uploads'));
app.use(cors({
    origin: true,
    credentials: true,
}));
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

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(8080, () => {
    console.log('server is running on 8080')
});