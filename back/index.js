const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const tagAPIRouter = require('./routes/tag');

const app = express();
db.sequelize.sync();

app.use(morgan('dev'));
app.use(express.json()); // req.body 데이터 받기 위함
app.use(express.urlencoded({ extended : true }));
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/tag', tagAPIRouter);

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(8080, () => {
    console.log('server is running on 8080')
});